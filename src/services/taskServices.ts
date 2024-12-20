import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllTasks = async () => {
  return await prisma.task.findMany();
};

export const createTask = async (
  title: string,
  color: string,
  completed: boolean
) => {
  return await prisma.task.create({
    data: { title, color, completed },
  });
};

export const updateTask = async (
  id: number,
  title: string,
  color: string,
  completed: boolean
) => {
  return await prisma.task.update({
    where: { id },
    data: { title, color, completed },
  });
};

export const deleteTask = async (id: number) => {
  return await prisma.task.delete({
    where: { id },
  });
};
