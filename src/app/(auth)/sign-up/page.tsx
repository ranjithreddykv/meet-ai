import { SignUpView } from "@/auth/ui/views/SignUpView";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function page() {
  const session = await auth.api.getSession({
      headers:await headers()
    });
    if(!!session){
      redirect("/")
    }
  return <SignUpView />;
}
