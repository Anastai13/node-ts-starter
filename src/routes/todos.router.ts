import { Router } from 'express';
import { createTodo, listTodos, removeTodo, toggleTodo }
from '../services/todos.service';
const router = Router();
router.get('/', async (_req, res, next) => {
 try {
 res.json(await listTodos());
 } catch (e) {
 next(e);
 }
});
router.post('/', async (req, res, next) => {
 try {
 const { title } = req.body ?? {};
 if (typeof title !== 'string' || !title.trim()) {
 return res.status(400).json({ error: 'title is required' });
 }
 const todo = await createTodo(title.trim());
 res.status(201).json(todo);
 } catch (e) {
 next(e);
 }
});
router.post('/:id/toggle', async (req, res, next) => {
 try {
 const id = Number(req.params.id);
 if (!Number.isFinite(id)) return
res.status(400).json({ error: 'invalid id' });
 const todo = await toggleTodo(id);
 if (!todo) return res.status(404).json({ error: 'not found' });
 res.json(todo);
 } catch (e) {
 next(e);
 }
});
router.delete('/:id', async (req, res, next) => {
 try {
 const id = Number(req.params.id);
 if (!Number.isFinite(id)) return
res.status(400).json({ error: 'invalid id' });
 const ok = await removeTodo(id);
 if (!ok) return res.status(404).json({ error: 'not found' });
 res.status(204).send();
 } catch (e) {
 next(e);
 }
});
export default router;