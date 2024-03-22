import { json, fail, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import path from 'node:path';
import fs from 'node:fs/promises';
import nFs from 'node:fs';
import { z } from 'zod';
import { createImage } from '$lib/server';

export const POST: RequestHandler = async (event) => {
	const MAX_FILE_SIZE = 2048000;
	const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
	const data = await event.request.formData();
	const typeImage = `${(data.get('name') as Blob).type.split('/')[1]}`;
	const name = `${crypto.randomUUID()}`;
	const filename = `${name}.${typeImage}`;
	const filePath = path.join(process.cwd(), 'static', 'img', filename);
	const fileSchema = z.object({
		name: z
			.any()
			.refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 2MB.`)
			.refine(
				(file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
				'Only .jpg, .jpeg, .png and .webp formats are supported.'
			)
	});

	await fs.writeFile(filePath, Buffer.from(await (data.get('name') as Blob).arrayBuffer()));
	const resError = fileSchema.safeParse({ name: data.get('name') });
	if (!resError.success) {
		nFs.unlink(filePath, (err) => console.log(err));
		const formatted = resError.error.format();
		throw error(422, { data: formatted, status: 422 } as any);
	}

	await createImage(name, typeImage);
	return json({ path: name });
};
