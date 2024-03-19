<script lang="ts">
	import LogoSvg from './AssetLogoSvg.svelte';
	import MoonFillSvg from '$lib/assets/Moon_fill.svg';
	import SunFillSvg from '$lib/assets/Sun_fill.svg';
	import { browser } from '$app/environment';

	let state = (browser && window.localStorage.getItem('theme')) || 'light';
	function sItem(e: Event): void {
		e.preventDefault();
		if (state == 'dark') {
			state = 'light';
			document.documentElement.classList.remove('dark');
			browser && window.localStorage.setItem('theme', state);
		} else {
			state = 'dark';
			document.documentElement.classList.add('dark');
			browser && window.localStorage.setItem('theme', state);
		}
	}
</script>

<div class="flex justify-between py-4 px-8 dark:bg-[#121826]">
	<svelte:component this={LogoSvg} textWhite={state == 'dark' ? '#fff' : 'black'} />
	<!-- <img src={LogoSvg} alt="logo" class="dark:text-[#fff]" /> -->
	<button on:click={sItem}>
		<img
			src={state == 'dark' ? SunFillSvg : MoonFillSvg}
			alt="svg"
			class:text-white={state == 'dark'}
			class:bg-[#4D5562]={state == 'dark'}
			class:bg-white={state != 'dark'}
			class="drop-shadow-md h-8 w-8 rounded-lg"
		/>
	</button>
</div>
<hr class="opacity-50" />
