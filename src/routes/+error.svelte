<script lang="ts">
	import { page } from '$app/stores';
</script>

<div class="flex justify-center items-center min-h-screen flex-col">
	<h1 class="dark:text-white">{$page.status}: {$page.error.message}</h1>
	<a href="/" class="dark:text-white underline">Back</a>
</div>
