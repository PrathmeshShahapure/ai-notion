import Image from "next/image";
import { Button } from "@/components/ui/button";
export default function Home() {
  return (
    <div className="flex flex-col  items-center justify-center  font-mono dark:bg-black">
      <main className=" w-full ">
        <h1>AI Productivity app </h1>
        <Button> Click me</Button>
      </main>
    </div>
  );
}
