import { json, fail } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import path from 'node:path';
import fs from 'node:fs/promises';
import nFs from 'node:fs';
import { z } from 'zod';
import { createImage } from '$lib/server';

export const POST: RequestHandler = async (event) => {
	try {
		const MAX_FILE_SIZE = 2048000;
		const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
		const data = await event.request.formData();
		const filename = `${crypto.randomUUID()}.${(data.get('name') as Blob).type.split('/')[1]}`;
		const filePath = path.join(process.cwd(), 'static', 'img', filename);
		const filePathFilename = path.join('img', filename);
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
		if (!resError.success && data.get('name')) {
			nFs.unlink(filePath, (err) => console.log(err));
			const formatted = resError.error.format();
			return json(formatted);
		}

		await createImage(filePathFilename);
		return json({ path: filePathFilename });
	} catch (err) {
		throw fail(500, { err: err });
	}
};
