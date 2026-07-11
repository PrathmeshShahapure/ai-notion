"use client"
import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { createNewDocumnet } from "@/actions/actions";
const Docbtn = () => {
 
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    const handleNewDoc = () => { 
        startTransition(async () => { 
            const { docId} = await createNewDocumnet();
            router.push(`/doc/${docId}`)
        })
    }
  return (
    <div>
      <Button
        disabled={isPending}
        onClick={handleNewDoc}
        className="disabled:cursor-not-allowed w-full block p-1 px-2  rounded hover:cursor-pointer text-base h-10"
      >
        {isPending ? <h2> Creating </h2> : <h2>New Document</h2>}
      </Button>
    </div>
  );
}

export default Docbtn