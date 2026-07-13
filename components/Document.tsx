"use client";
import { useTransition, useEffect, useState } from "react";
import { Input } from "./ui/input";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { db } from "@/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { Button } from "@/components/ui/button";

const Document = ({ id }: { id: string }) => {
  const [data, loading, error] = useDocumentData(doc(db, "documents", id));
  const [input, setInput] = useState("");
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (data) {
      setInput(data.title);
    }
  }, [data]);
  const handleUpdateTitle = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.trim() === "" || input.trim() === data?.title) return;

    startTransition(async () => {
      await updateDoc(doc(db, "documents", id), { title: input });
    });
  };
  return (
    <div className="p-5 ">
      <form
        className="w-full flex  justify-between space-x-4 "
        onSubmit={handleUpdateTitle}
      >
        <Input
          className="flex-1"
          value={input}
          placeholder=""
          onChange={(e) => setInput(e.target.value)}
        />

        <Button disabled={isPending} type="submit">
          {isPending ? <p>Updating</p> : <p>Update</p>}
        </Button>

      </form>

      <div>
        {/* manage users */}
        {/*  Avatara */}
      </div>
      {/* collabrative Editor */}
    </div>
  );
};

export default Document;
