<script lang="ts">
	import Portal from 'svelte-portal';
	import { Header, Toaster } from '$lib';
	import '../style.css';
	import { tick } from 'svelte';

	let completedDocument = false;
	async function isReady() {
		await tick();
		completedDocument = true;
	}
	isReady();
</script>

<svelte:head>
	<title>Simple Image Uploader</title>
</svelte:head>

<main class="min-h-screen bg-[#F9FAFB] dark:bg-[#121826]">
	<Header />
	{#if completedDocument}
		<slot />
	{:else}
		<div class="flex justify-center items-center" style="margin-top:10%;">Loading...</div>
	{/if}
</main>

<Portal target="body">
	<Toaster />
</Portal>
