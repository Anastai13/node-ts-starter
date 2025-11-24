import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const categoriesRouter = Router();

// Создать категорию
categoriesRouter.post("/", async (req, res) => {
  const { name } = req.body;

  try {
    const category = await prisma.category.create({
      data: { name },
    });
    res.json(category);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to create category" });
  }
});

// Получить все категории
categoriesRouter.get("/", async (req, res) => {
  try {
    const categories = await prisma.category.findMany({
      include: { todos: true },
    });
    res.json(categories);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to load categories" });
  }
});

// Обновить категорию по ID
categoriesRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const updated = await prisma.category.update({
      where: { id: Number(id) },
      data: { name },
    });

    res.json(updated);
  } catch (error) {
    res.status(404).json({ error: "Category not found" });
  }
});

// Удаление категории
categoriesRouter.delete("/:id", async (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isFinite(id)) {
    return res.status(400).json({ error: "Invalid id" });
  }

  try {
    await prisma.category.delete({
      where: { id },
    });

    res.status(204).send();
  } catch (e) {
    res.status(404).json({ error: "Not Found" });
  }
});

export default categoriesRouter;