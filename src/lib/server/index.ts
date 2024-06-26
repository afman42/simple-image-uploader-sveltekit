import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import { text, sqliteTable } from 'drizzle-orm/sqlite-core';
import { eq } from 'drizzle-orm';

export const images = sqliteTable('images', {
	id: text('id').primaryKey().notNull(),
	type: text('type').notNull()
});

export type Image = typeof images.$inferSelect;
export type NewImage = typeof images.$inferInsert;

const sqlite = new Database('./src/lib/server/sqlite.db');
const db = drizzle(sqlite);

export const createImage = async (id: string, type: string) => {
	return await db.insert(images).values({ id, type }).returning();
};

export const readImage = async (id: string) => {
	return await db
		.select({ id: images.id, type: images.type })
		.from(images)
		.where(eq(images.id, id))
		.limit(1);
};
