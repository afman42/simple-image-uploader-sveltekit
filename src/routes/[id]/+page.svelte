<script lang="ts">
	import LinkSvg from '$lib/assets/Link.svg';
	import DownloadSvg from '$lib/assets/download.svg';
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<div
	class="drop-shadow-md dark:bg-[#212936] bg-white h-72 w-2/4 rounded-md mx-auto flex justify-center items-center"
	style="margin-top: 10%;"
>
	<img src={data.id} alt="img" class="w-full h-full p-2" />
</div>

<div class="flex justify-center items-center space-x-2 mt-2">
	<button
		class="bg-[#3662E3] font-inter drop-shadow-md text-sm font-medium px-4 py-2 rounded-md flex items-center text-white"
		><img src={LinkSvg} class="mr-2" alt="linkSvg" /> Share</button
	>
	<button
		class="bg-[#3662E3] font-inter drop-shadow-md text-sm font-medium px-4 py-2 rounded-md flex items-center text-white"
		><img src={DownloadSvg} class="mr-2" alt="linkSvg" /> Download</button
	>
</div>
