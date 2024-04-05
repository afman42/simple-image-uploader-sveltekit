import { error, text } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import fs from 'node:fs';
import { readImage } from '$lib/server';
import path from "node:path"

export const GET: RequestHandler = async (event) => {
	const file = event.url.searchParams.get('file') ?? '';
	const name = await readImage(file);
	if (!name) {
		throw error(404, 'Not Found');
	}
  	const pathJoin = path.join(process.cwd(),'src','bucket','img',`${name[0].id}.${name[0].type}`)
	const data = fs.readFileSync(pathJoin);
	return new Response(data);
};

export const fallback: RequestHandler = async ({ request }) => {
	return text(`I caught your ${request.method} request!`);
};
