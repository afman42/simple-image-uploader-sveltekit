import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { readImage } from '$lib/server';

export const load: PageServerLoad = async ({ params }) => {
	const image = await readImage(params.id);

	if (image) {
		return image;
	}

	error(404, 'Not found');
};
