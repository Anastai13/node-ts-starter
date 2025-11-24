// src/services/todos.service.ts
import { prisma } from '../db/prisma';
export type Todo = { id: number; title: string; done: boolean };
export async function listTodos(): Promise<Todo[]> {
 const rows = await prisma.todo.findMany({ orderBy: { id: 'asc' } });
 return rows.map((row: { id: number; title: string; done: boolean }) => ({
    id: row.id,
    title: row.title,
    done: row.done
  }));
}
export async function createTodo(title: string):
Promise<Todo> {
 const row = await prisma.todo.create({ data: { title } });
 return { id: row.id, title: row.title, done: row.done };
}
export async function toggleTodo(id: number): Promise<Todo | null> {
 const found = await prisma.todo.findUnique({ where: { id } });
 if (!found) return null;
 const updated = await prisma.todo.update({
 where: { id },
 data: { done: !found.done },
 });
 return { id: updated.id, title: updated.title, done: updated.done };
}
export async function removeTodo(id: number):
Promise<boolean> {
 try {
 await prisma.todo.delete({ where: { id } });
 return true;
 } catch {
 return false;
 }
}