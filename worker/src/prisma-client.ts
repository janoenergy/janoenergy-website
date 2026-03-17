// 获取 Prisma Client
function getPrisma(env: Env) {
  // 设置环境变量供 Prisma 使用
  process.env.DATABASE_URL = env.DATABASE_URL;
  const client = new PrismaClient();
  return client.$extends(withAccelerate());
}