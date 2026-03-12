// 获取项目列表
app.get('/api/projects', async (c) => {
  try {
    const prisma = getPrisma(c.env);
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return c.json(projects);
  } catch (error: any) {
    console.error('Projects error:', error);
    return c.json({ 
      error: 'Database error', 
      message: error?.message || 'Unknown error',
      code: error?.code || 'UNKNOWN'
    }, 500);
  }
});
