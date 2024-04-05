import { toasts } from '$lib/store/state';

export const fetchGetImage = async (id: string) => {
	toasts.info('Loading... Image', 1000);
	const res = await fetch('/api/readFile?file='+id, {
		method: 'GET',
	});
	if (res.ok) {
		return await res.blob();
	} else {
    	toasts.error("Something went wrong", 2000)
		throw res;
	}
};
