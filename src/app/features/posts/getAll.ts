"use server";
import { prisma } from "@/lib/prisma";
import { actionClient } from "@/lib/safe-action";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import z from "zod";

export const Allposts = async () => {
  return await prisma.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const Onepost = async (id: string) => {
  return await prisma.post.findUnique({
    where: {
      id: id,
    },
  });
};

const idSchema = z.object({
  id: z.string(),
});

export const Deletepost = actionClient
  .inputSchema(idSchema)
  .action(async ({ parsedInput: { id } }) => {
    await prisma.post.delete({
      where: {
        id,
      },
    });
    revalidatePath("/posts");
    redirect("/posts");
  });

const formSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(5).max(32),
  description: z.string().min(20).max(500),
  status: z.enum(["IN_PROGRESS", "DONE"]),
});

export const createEdit = actionClient
  .inputSchema(formSchema)
  .action(async ({ parsedInput: { status, id, title, description } }) => {
    try {
      if (id) {
        await prisma.post.update({
          data: {
            title,
            des: description,
            status,
          },
          where: {
            id: id,
          },
        });
        revalidatePath("/posts");
      } else {
        await prisma.post.create({
          data: {
            title,
            des: description,
            status,
          },
        });
        revalidatePath("/posts");
      }

      return {
        success: true,
      };
    } catch (error) {
      console.log(error);
    }
  });
