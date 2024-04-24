import { state, toasts } from '$lib/store/state';

export const fetchPost = async (formData: FormData) => {
	try {
		state.update((n) => (n = false));
		toasts.info('Loading... upload', 1000);
		const res = await fetch('/api/upload', {
			method: 'POST',
			body: formData,
			signal: AbortSignal.timeout(2000)
		});
		if (res.ok) {
			state.update((n) => (n = false));
			toasts.success('Successfully upload', 1000);
			return await res.json();
		} else {
			let jsonParse = JSON.parse(await res.text());
			if (jsonParse.status == 422) {
				jsonParse.data.name._errors.forEach((v: string) => {
					toasts.error(v, 2000);
				});
			}
			state.update((n) => (n = true));
			throw res;
		}
	} catch (error) {
		console.error(error);
	}
};
