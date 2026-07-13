"use client"

import { useEffect, useState } from "react";
import Docbtn from "@/components/Docbtn";
import { useCollection } from "react-firebase-hooks/firestore";
import { MenuIcon } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { db } from "@/firebase";
import SidebarOptions from "./SidebarOptions";
import {
  collectionGroup,
  DocumentData,
  query,
  where,
} from "firebase/firestore";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";


interface RoomDocument extends DocumentData {
  createdAt: string;
  role: "owner" | "editor";
  roomId: string;
  userId: string;
}

const Sidebar = () => {
  const { user } = useUser();
  const [groupedData, setGroupedData] = useState<{ owner: RoomDocument[], editor: RoomDocument[] }>({owner:[],editor:[],})

  const [data, loading, error] = useCollection(
    user &&
      query(
        collectionGroup(db, "rooms"),
        where("userId", "==", user.emailAddresses[0].toString()),
      ),
  );

  useEffect(() => {
    if (!data) return;
    const grouped = data.docs.reduce<{
      owner: RoomDocument[];
      editor: RoomDocument[];
    }>((acc, curr) => {
      const roomData = curr.data() as RoomDocument; 
      if (roomData.role === "owner") {
        acc.owner.push({ id: curr.id, ...roomData });
      } else  {
        acc.editor.push({ id: curr.id, ...roomData });
      }
      return acc;

    }, { owner: [], editor: [] });

    setGroupedData(grouped);
  }, [data]);

  const menuOptions = (
    <>
      <Docbtn />

      <div className="max-w-36 flex flex-col ">
        <h2 className="text-gray-500 my-3">MY Documents </h2>
        {groupedData.owner.length == 0 ? (
          <p className="border p-1 px-2 rounded">No Docs found</p>
        ) : (
          <>
            {groupedData.owner.map((doc) => (
              <SidebarOptions
                href={`/doc/${doc.id}`}
                key={doc.id}
                id={doc.id}
              />
            ))}
          </>
        )}

        <h2 className="text-gray-500 my-3 ">Shared with Me </h2>
        {groupedData.editor.length == 0 ? (
          <p className="border p-1 px-2 rounded">No Docs found</p>
        ) : (
          <>
            {groupedData.editor.map((doc) => (
              <SidebarOptions
                href={`/doc/${doc.id}`}
                key={doc.id}
                id={doc.id}
              />
            ))}
          </>
        )}
      </div>
    </>
  );

  return (
    <div className="p-2 md:p-5 relative">
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger>
            <MenuIcon className="p-1" size={28} />
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
              <div>{menuOptions}</div>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>

      <div className="hidden md:inline">{menuOptions}</div>
    </div>
  );
};

export default Sidebar;
