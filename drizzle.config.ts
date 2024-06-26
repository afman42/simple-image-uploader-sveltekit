import type { Config } from 'drizzle-kit';

export default {
	schema: './src/lib/server/index.ts',
	out: './drizzle',
	driver: 'better-sqlite', // 'pg' | 'mysql2' | 'better-sqlite' | 'libsql' | 'turso'
  dbCredentials: {
    url: "./src/lib/server/sqlite.db"
  }
} satisfies Config;
