import { createTodo, listTodos, toggleTodo, removeTodo }
from '../src/services/todos.service';
import { prisma } from '../src/db/prisma';
beforeAll(async () => {
 await prisma.$connect();
});
beforeEach(async () => {
 await prisma.todo.deleteMany(); // чистим таблицу перед каждым тестом
});
afterAll(async () => {
 await prisma.$disconnect();
});
describe('todos service (prisma)', () => {
 test('create and list', async () => {
 const t = await createTodo('learn ts');
 expect(t.id).toBeGreaterThan(0);
 const all = await listTodos();
 expect(all.some((x) => x.id === t.id && x.title === 'learn ts' && x.done === false)).toBe(true);
 });
 test('toggle', async () => {
 const t = await createTodo('toggle me');
 const toggled = await toggleTodo(t.id);
 expect(toggled?.done).toBe(true);
 });
 test('remove', async () => {
 const t = await createTodo('remove me');
 const ok = await removeTodo(t.id);
 expect(ok).toBe(true);
 });
});