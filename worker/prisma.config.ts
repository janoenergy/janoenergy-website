import path from 'node:path'
import { defineConfig } from 'prisma/config'

export default defineConfig({
  earlyAccess: true,
  schema: path.join('prisma', 'schema.prisma'),
  migrate: {
    async adapter() {
      const { PrismaPg } = await import('@prisma/adapter-pg')
      const { Pool } = await import('pg')
      const connectionString = process.env.DIRECT_DATABASE_URL
      if (!connectionString) {
        throw new Error('DIRECT_DATABASE_URL environment variable is required')
      }
      const pool = new Pool({ connectionString })
      return new PrismaPg(pool)
    },
  },
})
