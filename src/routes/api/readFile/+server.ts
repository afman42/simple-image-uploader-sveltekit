import { error, text } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import fs from 'node:fs';
import { readImage } from '$lib/server';
import path from 'node:path';

export const GET: RequestHandler = async (event) => {
	const file = event.url.searchParams.get('file') ?? '';
	if (file == '') {
		throw error(404, 'Params not found');
	}
	const name = await readImage(file);
	if (name[0] === undefined) {
		throw error(500,'Not found');
	}
	const pathJoin = path.join(
		process.cwd(),
		'src',
		'bucket',
		'img',
		`${name[0].id}.${name[0].type}`
	);
	const data = fs.readFileSync(pathJoin);
	return new Response(data);
};

export const fallback: RequestHandler = async ({ request }) => {
	return text(`I caught your ${request.method} request!`);
};
