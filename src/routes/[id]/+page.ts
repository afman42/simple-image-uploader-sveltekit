import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { toasts } from '$lib';

export const load: PageLoad = async ({ params, fetch }) => {
	toasts.info('Uploading..', 2000);
	let type = params.id.endsWith('1')
		? '.jpeg'
		: params.id.endsWith('2')
			? '.jpg'
			: params.id.endsWith('3')
				? '.png'
				: '.gif';
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
		const response = JSON.parse(await res.text())
		console.log({ status: res.status, message: response.message});
		error(404, 'Not found');
	}
};