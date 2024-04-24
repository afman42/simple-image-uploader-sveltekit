<script lang="ts">
	import Portal from 'svelte-portal';
	import { Header, Toaster } from '$lib';
	import '../style.css';
	import { tick } from 'svelte';
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';

	const completedDocument = writable(true);
	async function isReady() {
		await tick();
		$completedDocument = false;
	}
	setContext('completedDocument', completedDocument);
	isReady();
</script>

<svelte:head>
	<title>Simple Image Uploader</title>
</svelte:head>

<main class="min-h-screen bg-[#F9FAFB] dark:bg-[#121826]">
	<Header />
	<slot />
</main>

<Portal target="body">
	<Toaster />
</Portal>
