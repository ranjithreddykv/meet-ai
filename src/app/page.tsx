"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signUp, useSession,signOut } from "@/lib/auth-client";
import { toast } from "sonner";

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {data:session} = useSession();
  const BASE_URL = "http://localhost:3000";
  async function handleSubmit(e: React.ChangeEvent<HTMLFormElement>) {
    try {
      e.preventDefault();
      const res = await signUp.email({ name, email, password });
      //if (res.error) throw new Error("Error occoure while signup");
      toast.success("User signup successful");
      console.log(res.data);
    } catch (error) {
      toast.error(error instanceof Error ? error.message:"Error occoured while signing up")
      console.log(error);
    }
  
  }
  if(session){
    return (
      <div className="flex flex-col p-4 gap-y-4">
        <p>Logged in as {session.user.name}</p>
        <Button onClick={()=> signOut()}>Logout</Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col justify-center items-center max-w-xl">
      <form action="" onSubmit={handleSubmit} className="flex flex-col items-center justify-center  w-full space-y-2 p-5  ">
        <Input
          
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          placeholder="email"
          type={"email"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="password"
          type={"password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant={"outline"}>Login</Button>
      </form>
    </div>
  );
}
