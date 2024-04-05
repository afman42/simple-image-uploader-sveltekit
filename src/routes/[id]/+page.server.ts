import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	if (params.id) {
		let type = params.id.endsWith('1')
			? '.jpeg'
			: params.id.endsWith('2')
				? '.jpg'
				: params.id.endsWith('3')
					? '.png'
					: '.gif';
		return {
			id: params.id,
			type
		};
	}
	error(404, 'Not found');
};
