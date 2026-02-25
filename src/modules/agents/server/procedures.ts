import { db } from "@/db";
import { agents } from "@/db/schema";
import { createTRPCRouter, baseProcedure, protectedProcedure } from "@/trpc/init";
import { agentInsertSchema } from "../schemas";
import z from "zod";
import { eq } from "drizzle-orm";

export const agentsRouter = createTRPCRouter({
  //TODO: Change `getMany` to use `ProtectedProcedure`
  getOne: baseProcedure.input(z.object({id:z.string()})).query(async ({input})=>{
    const [existingAgent] = await db.select().from(agents).where(eq(agents.id,input.id));
    return existingAgent;
  })
  ,
  getMany: protectedProcedure.query(async () => {
  const data = await db.select().from(agents);
  return data;
  }),
  create :protectedProcedure
  .input(agentInsertSchema)
  .mutation(async({input ,ctx})=>{
    const {name,instructions} = input;
    const {auth} = ctx;
    const [createdAgent] = await db.insert(agents)
    .values({...input,userId:auth.session.userId})
    .returning();
    return createdAgent;
  })

});
