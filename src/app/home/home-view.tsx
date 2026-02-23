"use client"

import { Button } from "@/components/ui/button";
import { useSession , signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export const HomeView = ()=>{
     const router = useRouter();
     const { data: session } = useSession();
     if (!session) {
       return <p>Loading...</p>;
     }
     return (
       <div className="">
          Home Page
       </div>
     );
}