import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    await prisma.todo.createMany({
        data: [
            { title: 'Вторая задача' },
            { title: 'Третья задача' },
        ],
       // skipDuplicates: true,
    });
}

main()
    .then(() => console.log("Seed completed"))
    .catch((e) => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });