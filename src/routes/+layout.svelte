<script lang="ts">
	import Portal from 'svelte-portal';
	import { Header, Toaster } from '$lib';
	import '../style.css';
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
