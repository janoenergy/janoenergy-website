import { Hono } from 'hono';

const app = new Hono();

app.get('/', (c) => c.text('OK'));

app.get('/api/projects', async (c) => {
  return c.json([
    { id: 1, title: 'Test Project', capacity: '100MW' }
  ]);
});

export default app;
