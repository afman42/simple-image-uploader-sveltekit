<script lang="ts">
	import LinkSvg from '$lib/assets/Link.svg';
	import DownloadSvg from '$lib/assets/download.svg';
	import type { PageData } from './$types';
	export let data: PageData;
	function ShareLink(e: Event) {
		e.preventDefault();
		navigator.clipboard.writeText(window.location + '');
	}
	function DownloadFile(e: Event) {
		e.preventDefault();
		var link = document.createElement('a');
		link.setAttribute('download', data?.id + '.' + data?.type);
		link.href = '/img/' + data?.id + '.' + data?.type;
		document.body.appendChild(link);
		link.click();
		link.remove();
	}
</script>

<div
	class="drop-shadow-md dark:bg-[#212936] bg-white h-72 w-2/4 rounded-md mx-auto flex justify-center items-center"
	style="margin-top: 10%;"
>
	<img src={'/img/' + data?.id + '.' + data?.type} alt="img" class="w-full h-full p-2" />
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
