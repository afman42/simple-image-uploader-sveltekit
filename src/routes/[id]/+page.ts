import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { toasts } from '$lib';

export const load: PageLoad = async ({ params, fetch }) => {
	if (params.id) {
		let type = params.id.endsWith('1')
			? '.jpeg'
			: params.id.endsWith('2')
				? '.jpg'
				: params.id.endsWith('3')
					? '.png'
					: '.gif';
		toasts.info('Uploading..', 2000);
		const res = await fetch('/api/readFile?file=' + params.id, {
			method: 'GET',
			signal: AbortSignal.timeout(2000)
		});
		if (res.ok) {
			return {
				id: params.id,
				type,
				nameFile: URL.createObjectURL(await res.blob())
			};
		} else {
			toasts.error('Something went wrong', 2000);
			throw res;
		}
	}
	error(404, 'Not found');
};
