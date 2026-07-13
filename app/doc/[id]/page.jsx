'use client'
import { useParams } from "next/navigation";
import Document from "@/components/Document.tsx";

const DocPage = () => {
    const { id } = useParams();
  return (
    <div className="flex flex-col flex-1 max-w-5xl mx-auto min-h-screen">
      <Document id={id} />
    </div>
  );
}

export default DocPage