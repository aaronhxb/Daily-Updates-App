import { z } from "zod";

import { createTRPCRouter, publicProcedure  } from "../trpc";
import { db } from "~/server/db";

export const updateRouter = createTRPCRouter({
    getAll: publicProcedure
        .input(z.object({ userId: z.string() }))
        .query(async ({ input }) => {
            return db.update.findMany({
                where: { userId: input.userId },
                orderBy: { createdAt: "desc" },
        });
    }),
    create: publicProcedure
        .input(z.object({ userId: z.string(), text: z.string() }))
        .mutation(async ({ ctx, input }) => {
            return ctx.db.update.create({
            data: {
            userId: input.userId,
            text: input.text
            },
        });
    })
})