"use client";

import { useUser } from "@clerk/nextjs";
import { useRoom } from "@liveblocks/react";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { doc, getFirestore } from "firebase/firestore";
import { db } from "@/firebase";

function useOwner() {
  const { user } = useUser();
  const room = useRoom();
  const [document] = useDocumentData(doc(db, "documents", room.id));

  if (!user || !document) return false;

  return document.userId === user?.id;
}

export default useOwner;
