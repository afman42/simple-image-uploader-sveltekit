<script lang="ts">
	import LinkSvg from '$lib/assets/Link.svg';
	import DownloadSvg from '$lib/assets/download.svg';
	import type { PageData } from './$types';
	import { fetchGetImage } from '$lib';
	import { onMount } from 'svelte';
	import { toasts } from '$lib';
	export let data: PageData;

	let nameFile: null | string = null;
	async function fetchImage(id: string) {
		const res = await fetchGetImage(id);
		nameFile = URL.createObjectURL(res);
	}
	onMount(() => {
		fetchImage(data?.id);
	});
	function ShareLink(e: Event) {
		e.preventDefault();
		toasts.success('success clipboard',2000);
		navigator.clipboard.writeText(window.location + '');
	}
	function DownloadFile(e: Event) {
		e.preventDefault();
		toasts.info('Downloading',2000);
		var link = document.createElement('a');
		link.setAttribute('download', data?.id + data?.type);
		link.href = nameFile as string;
		document.body.appendChild(link);
		link.click();
		link.remove();
	}
</script>

<div
	class="drop-shadow-md dark:bg-[#212936] bg-white h-72 w-2/4 rounded-md mx-auto flex justify-center items-center"
	style="margin-top: 10%;"
>
	<img src={nameFile} alt="img" class="w-full h-full p-2" />
</div>

<div class="flex justify-center items-center space-x-2 mt-2">
	<button
		on:click={ShareLink}
		class="bg-[#3662E3] font-inter drop-shadow-md text-sm font-medium px-4 py-2 rounded-md flex items-center text-white"
		><img src={LinkSvg} class="mr-2" alt="linkSvg" /> Share</button
	>
	<button
		on:click={DownloadFile}
		class="bg-[#3662E3] font-inter drop-shadow-md text-sm font-medium px-4 py-2 rounded-md flex items-center text-white"
		><img src={DownloadSvg} class="mr-2" alt="linkSvg" /> Download</button
	>
</div>
