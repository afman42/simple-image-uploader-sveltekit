import { writable, get } from 'svelte/store';
type IToast = {
	text: string;
	status: TToastStatus;
	id: number;
};
type ToastPayload = { timeout?: number; text: string };
export type TToastStatus = 'success' | 'warning' | 'error';

export const state = writable<boolean>(true);

export const storeToast = () => {
	const stateToasts = writable<IToast[]>([]);
	const defaultTimeout = 2000;
	const createToast = (text: string, status: TToastStatus): IToast => ({
		text,
		status,
		id: Math.random() * 1000
	});

	function updateToast(payload: ToastPayload, status: TToastStatus) {
		const { text, timeout } = payload;

		const toast = createToast(text, status);

		//@ts-ignore
		stateToasts.update((n) => n.push(toast));

		setTimeout(() => {
			stateToasts.update((n) => {
				n = n.filter((t: IToast) => t.id !== toast.id);
				return n;
			});
		}, timeout ?? defaultTimeout);
	}
	return {
		toasts: stateToasts,
		lengthToast: get(stateToasts).length,
		getToast: get(stateToasts),
		successToast(payload: ToastPayload) {
			updateToast(payload, 'success');
		},

		warningToast(payload: ToastPayload) {
			updateToast(payload, 'warning');
		},

		errorToast(payload: ToastPayload) {
			updateToast(payload, 'error');
		}
	};
};
