<script lang="ts">
	import ArrowUpSvg from '$lib/assets/exit.svg';
	import { fetchPost, state } from '$lib';
	import { goto, afterNavigate } from '$app/navigation';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	const completedDocument = getContext('completedDocument') as Writable<boolean>;
	let dragCss = false;
	let inputFile: HTMLInputElement | null = null;
	afterNavigate(() => {
		$state = true;
	});
	const preventAndDragDrop = (e: DragEvent) => {
		e.preventDefault();
		e.stopPropagation();
	};
	const droppedFiles = async (e: DragEvent) => {
		e.preventDefault();
		const fileList = e.dataTransfer?.files as FileList;
		if (!fileList.length) return;
		const formData = new FormData();
		formData.append('name', fileList[0], fileList[0].name);
		const res = await fetchPost(formData);
		if (res) {
			goto('/' + res.path);
		}
	};
	const submitHandler = async (e: SubmitEvent) => {
		e.preventDefault();
		inputFile?.addEventListener('change', async (e: any) => {
			let fileList = e.target.files as FileList;
			if (!fileList.length) return;
			const formData = new FormData();
			formData.append('name', fileList[0], fileList[0].name);
			let res = await fetchPost(formData);
			if (res) {
				goto('/' + res.path);
			}
		});
	};
</script>

{#if $state}
	<div
		class:hover:cursor-not-allowed={$completedDocument}
		class:border-red-500={dragCss}
		aria-grabbed={dragCss}
		class="dark:bg-[#212936] border dark:border-gray-500 border-blue-500 border-dashed drop-shadow-md bg-white h-72 w-2/4 mx-auto flex justify-center items-center rounded-md"
		on:drag={(e) => preventAndDragDrop(e)}
		on:dragstart={(e) => preventAndDragDrop(e)}
		on:dragend={(e) => {
			preventAndDragDrop(e);
			dragCss = false;
		}}
		on:dragover={(e) => {
			preventAndDragDrop(e);
			dragCss = true;
		}}
		on:dragenter={(e) => {
			preventAndDragDrop(e);
			dragCss = true;
		}}
		on:dragleave={(e) => {
			preventAndDragDrop(e);
			dragCss = false;
		}}
		on:drop={(e) => {
			preventAndDragDrop(e);
			dragCss = false;
			if ($completedDocument) return;
			droppedFiles(e);
		}}
		style="margin-top: 10%;"
	>
		<div class="flex justify-center items-center flex-col rounded-md">
			<img src={ArrowUpSvg} alt="arrow_up" class="h-8 w-8 mb-4" />
			<span class="font-medium font-inter flex-row flex text-sm mb-2 dark:text-white"
				>Drag span
				{#if !$completedDocument}
					<form class="ml-2" method="POST" on:submit={submitHandler} enctype="multipart/form-data">
						<input
							type="file"
							accept="image/png, image/gif, image/jpeg, image/jpg"
							hidden
							bind:this={inputFile}
						/><button
							type="submit"
							on:click={(_) => inputFile?.click()}
							class="text-blue-500 dark:text-[#3662E3] text-sm dark:font-semibold font-inter"
							>browse files</button
						>
					</form>
				{/if}
			</span>
			<span class="text-xs font-light font-inter dark:text-[#F9FAFBCC]"
				>JPG, PNG or GIF - Max file size 2MB</span
			>
		</div>
	</div>
{:else}
	<div
		class="drop-shadow-md bg-white dark:bg-[#212936] h-44 w-2/4 mx-auto flex justify-center items-center rounded-md"
		style="margin-top: 10%;"
	>
		<div class="flex justify-center w-full mx-20 items-center flex-col space-y-4">
			<span class="font-bold font-inter text-base dark:text-white"
				>Uploading, <span class="font-medium font-inter text-base dark:text-[#4D5562]"
					>Please wait..</span
				></span
			>
			<div class="h-2 rounded-lg w-full bg-[#E5E7EB] overflow-hidden">
				<div class="animate-progress w-full h-full bg-[#3662E3] origin-left-right"></div>
			</div>
		</div>
	</div>
{/if}
