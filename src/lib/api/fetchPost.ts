import { state } from '$lib/store/state';

export const fetchPost = async (formData: FormData) => {
	state.update((n) => (n = false));
	const res = await fetch('/api/upload', {
		method: 'POST',
		body: formData
	});
	if (res.ok) {
		state.update((n) => (n = false));
		// successToast({ text: 'Successfully create' });
		return await res.json();
	} else {
		let jsonParse = JSON.parse(await res.text());
		if (jsonParse.status == 422) {
			jsonParse.data.name._errors.forEach((v: any) => {
				console.log(v);
				// errorToast({ text: 'Error: Something went wrong' });
			});
		}
		state.update((n) => (n = true));
		throw res;
	}
};
