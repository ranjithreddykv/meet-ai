import Image from "next/image";
import {Button} from "@/components/ui/button";
export default function Home() {
  return (
    <div className="text-4xl font-bold text-green-500">
      Hello world
      <Button variant={"outline"}>Hello</Button>
    </div>
  );
}
