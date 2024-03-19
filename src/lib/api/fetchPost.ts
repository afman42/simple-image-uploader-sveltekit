import { storeState, storeToast } from "$lib/store/state";

export const fetchPost = async (formData: FormData) => {
	return await fetch('/api/upload', {
			method: 'POST',
			body: formData
		})
			.then(async (res) => {
				if (res.ok) {
          storeToast().successToast({ text: "Successfully create"})
          storeState().update(n => n = false)
          return await res.json();
        }
			})
			.catch((er) => {
        storeState().update(n => n = false)
        storeToast().errorToast({ text: "Error: Something went wrong"})
				console.log(er);
			});
}
