// 获取 Prisma Client
function getPrisma(env: Env) {
  const client = new PrismaClient({
    datasources: {
      db: {
        url: env.DATABASE_URL,
      },
    },
  });
  return client.$extends(withAccelerate());
}