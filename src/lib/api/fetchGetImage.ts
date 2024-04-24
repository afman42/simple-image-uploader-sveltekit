import { toasts } from '$lib/store/state';

export const fetchGetImage = async (id: string) => {
	try {
		const res = await fetch('/api/readFile?file=' + id, {
			method: 'GET',
			signal: AbortSignal.timeout(2000)
		});
		if (res.ok) {
			return await res.blob();
		} else {
			toasts.error('Something went wrong', 2000);
			throw res;
		}
	} catch (error) {
		console.error(error);
	}
};
