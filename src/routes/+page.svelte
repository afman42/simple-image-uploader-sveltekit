<script lang="ts">
	import ArrowUpSvg from '$lib/assets/exit.svg';
	import { Loader, fetchPost } from '$lib';
	let toggle = true;
	let dragCss = false;
	let inputFile: HTMLInputElement | null = null;
	const preventAndDragDrop = (e: DragEvent) => {
		e.preventDefault();
		e.stopPropagation();
	};
	const droppedFiles = async (e: DragEvent) => {
		e.preventDefault();
		const formData = new FormData();
		const fileList = e.dataTransfer?.files as FileList;
		formData.append('name', fileList[0], fileList[0].name);
		if (!fileList.length) return;
		await fetchPost(formData);
	};
	const submitHandler = async (e: SubmitEvent) => {
		e.preventDefault();
		const formData = new FormData();
		const fileList = inputFile?.files as FileList;
		formData.append('name', fileList[0], fileList[0].name);
		if (!fileList.length) return;
		await fetchPost(formData);
	};
</script>

{#if toggle}
	<div
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
			droppedFiles(e);
		}}
		style="margin-top: 10%;"
	>
		<div class="flex justify-center items-center flex-col rounded-md">
			<img src={ArrowUpSvg} alt="arrow_up" class="h-8 w-8 mb-4" />
			<span class="font-medium font-inter flex-row flex text-sm mb-2 dark:text-white"
				>Drag & drop a file or <form
					class="ml-2"
					method="POST"
					on:submit={submitHandler}
					enctype="multipart/form-data"
				>
					<input type="file" hidden bind:this={inputFile} /><button
						type="submit"
						on:click={(_) => inputFile?.click()}
						class="text-blue-500 dark:text-[#3662E3] text-sm dark:font-semibold font-inter"
						>browse files</button
					>
				</form>
			</span>
			<span class="text-xs font-light font-inter dark:text-[#F9FAFBCC]"
				>JPG, PNG or GIF - Max file size 2MB</span
			>
		</div>
	</div>
{:else}
	<Loader />
{/if}
