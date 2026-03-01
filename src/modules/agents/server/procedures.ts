import { db } from "@/db";
import { agents } from "@/db/schema";
import {
  createTRPCRouter,
  baseProcedure,
  protectedProcedure,
} from "@/trpc/init";
import { agentDeleteSchema, agentInsertSchema, agentUpdateSchema } from '../schemas';
import z from "zod";
import { and, count, desc, eq, getTableColumns, ilike, sql } from "drizzle-orm";
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  MAX_PAGE_SIZE,
  MIN_PAGE_SIZE,
} from "@/constants";
import { TRPCError } from "@trpc/server";

export const agentsRouter = createTRPCRouter({
  //TODO: Change `getMany` to use `ProtectedProcedure`
  getOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const [existingAgent] = await db
        .select({
          meetingCount:sql<number>`5`,
          ...getTableColumns(agents)
        })
        .from(agents)
        .where(
          and(eq(agents.id, input.id), eq(agents.userId, ctx.auth.user.id)),
        );
      if (!existingAgent)
        throw new TRPCError({ code: "NOT_FOUND", message: "Agent not found" });
      return existingAgent;
    }),
  getMany: protectedProcedure
    .input(
      z.object({
        page: z.number().default(DEFAULT_PAGE),
        pageSize: z
          .number()
          .min(MIN_PAGE_SIZE)
          .max(MAX_PAGE_SIZE)
          .default(DEFAULT_PAGE_SIZE),
        search: z.string().nullish(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { search, pageSize, page } = input;
      const data = await db
        .select({
          meetingCount: sql<number>`5`,
          ...getTableColumns(agents),
        })
        .from(agents)
        .where(
          and(
            eq(agents.userId, ctx.auth.user.id),
            search ? ilike(agents.name, `%${search}%`) : undefined,
          ),
        )
        .orderBy(desc(agents.createdAt), desc(agents.id))
        .limit(pageSize)
        .offset((page - 1) * pageSize);

      const [total] = await db
        .select({ count: count() })
        .from(agents)
        .where(
          and(
            eq(agents.userId, ctx.auth.user.id),
            search ? ilike(agents.name, `${search}`) : undefined,
          ),
        );
      const totalPages = Math.ceil(total.count / pageSize);

      return {
        items: data,
        total: total.count,
        totalPages: totalPages,
      };
    }),
  create: protectedProcedure
    .input(agentInsertSchema)
    .mutation(async ({ input, ctx }) => {
      const { auth } = ctx;
      const [createdAgent] = await db
        .insert(agents)
        .values({ ...input, userId: auth.session.userId })
        .returning();
      return createdAgent;
    }),
    remove: protectedProcedure.input(agentDeleteSchema).mutation(async({input ,ctx})=>{
      const {id} =input;
      const userId = ctx.auth.user.id;

      const deletedAgent = await db
      .delete(agents)
      .where(and(eq(agents.id , id),eq(agents.userId,userId)))
      .returning()
      if(deletedAgent.length ===0) throw new TRPCError({ code: "NOT_FOUND" , message:"Agent not found"});
    return deletedAgent;
    }),
    update: protectedProcedure.input(agentUpdateSchema).mutation(async({input,ctx})=>{
      const {id,instructions,name} = input;
      const userId = ctx.auth.user.id;
      const updatedAgent = await db
      .update(agents)
      .set({instructions:instructions , name:name}).
      where(and(eq(agents.id, id), eq(agents.userId, userId))) 
      .returning();
      if(updatedAgent.length===0) throw new TRPCError({
        code: "NOT_FOUND",
        message: "Agent not found",
      });
      return updatedAgent;
    })
});
