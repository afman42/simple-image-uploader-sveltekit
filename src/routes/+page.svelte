<script lang="ts">
	import ArrowUpSvg from '$lib/assets/exit.svg';
	import { Loader } from '$lib';
	//import LinkSvg from '$lib/assets/Link.svg';
	//import DownloadSvg from '$lib/assets/download.svg';
	let toggle = true;
</script>

{#if toggle}
	<div
		class="dark:bg-[#212936] border dark:border-gray-500 border-blue-500 border-dashed drop-shadow-md bg-white h-72 w-2/4 mx-auto flex justify-center items-center rounded-md"
		style="margin-top: 10%;"
	>
		<div class="flex justify-center items-center flex-col rounded-md">
			<img src={ArrowUpSvg} alt="arrow_up" class="h-8 w-8 mb-4" />
			<span class="font-medium font-inter text-sm mb-2 dark:text-white"
				>Drag & drop a file or <button
					class="text-blue-500 dark:text-[#3662E3] text-sm dark:font-semibold font-inter"
					>browse files</button
				></span
			>
			<span class="text-xs font-light font-inter dark:text-[#F9FAFBCC]"
				>JPG, PNG or GIF - Max file size 2MB</span
			>
		</div>
	</div>
{:else}
	<Loader />
{/if}

<!-- <div -->
<!-- 	class="drop-shadow-md dark:bg-[#212936] bg-white h-72 w-2/4 rounded-md mx-auto flex justify-center items-center" -->
<!-- 	style="margin-top: 10%;" -->
<!-- > -->
<!-- 	<img -->
<!-- 		src="https://www.radarbogor.id/files/2018/05/hipwee-Salak-2-750x422.jpg" -->
<!-- 		alt="img" -->
<!-- 		class="w-full h-full p-2" -->
<!-- 	/> -->
<!-- </div> -->
<!---->
<!-- <div class="flex justify-center items-center space-x-2 mt-2"> -->
<!-- 	<button -->
<!-- 		class="bg-[#3662E3] font-inter drop-shadow-md text-sm font-medium px-4 py-2 rounded-md flex items-center text-white" -->
<!-- 		><img src={LinkSvg} class="mr-2" alt="linkSvg" /> Share</button -->
<!-- 	> -->
<!-- 	<button -->
<!-- 		class="bg-[#3662E3] font-inter drop-shadow-md text-sm font-medium px-4 py-2 rounded-md flex items-center text-white" -->
<!-- 		><img src={DownloadSvg} class="mr-2" alt="linkSvg" /> Download</button -->
<!-- 	> -->
<!-- </div> -->
