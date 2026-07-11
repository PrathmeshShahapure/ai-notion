"use server";

import { adminDB } from "@/firebase-admin";
import { auth } from "@clerk/nextjs/server";
import { title } from "process";

export const createNewDocumnet = async () => {
  auth.protect();
  const { sessionClaims } = await auth();
  const documentCollectionRef = adminDB.collection("documents");
  const docRef = await documentCollectionRef.add({ title: "New Doc" });
  await adminDB
    .collection("users")
    .doc(sessionClaims?.email!)
    .collection("rooms")
    .doc(docRef.id)
      .set({
          userId: sessionClaims?.email!,
          role: "owner",
          createdAt: new Date(),
         roomId:docRef.id,
      });
    
    return {docId:docRef.id}
};
