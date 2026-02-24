"use client"

import { useSession } from "@/lib/auth-client";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const HomeView = ()=>{
  const trpc =useTRPC();
  const {data} = useQuery(trpc.hello.queryOptions({text:"Antonio"}))
     const { data: session } = useSession();
     if (!session) {
       return <p>Loading...</p>;
     }
     return (
       <div className="">
          {data?.greeting}
       </div>
     );
}