<script lang="ts">
	import { storeToast, type TToastStatus } from '$lib/store/state';
	import { quintOut } from 'svelte/easing';
  import { scale } from 'svelte/transition';

	const toastClassMap: Record<TToastStatus, string> = {
		warning: 'text-orange-500',
		error: 'text-red-500',
		success: 'text-green-500'
	};

	const store = storeToast();
</script>

{#if store.lengthToast}
	<div class="fixed flex flex-col bottom-10 right-10 gap-4">
		{#each store.getToast as toast (toast.id)}
			<li transition:scale={{ duration: 500, delay: 500, opacity: 0.5, start: 0.5, easing: quintOut }} class={toast.status ? toastClassMap[toast.status] : ''}>
				<span class="toaster__inner-text font-inter font-medium">
					{toast.text}
				</span>
			</li>
		{/each}
	</div>
{/if}
<!---->
<!-- <style scoped lang="scss"> -->
<!-- .toast-enter-from, -->
<!-- .toast-leave-to { -->
<!--   transform: translateX(100%); -->
<!--   opacity: 0; -->
<!-- } -->
<!---->
<!-- .toast-enter-active, -->
<!-- .toast-leave-active { -->
<!--   transition: 0.25s ease all; -->
<!-- } -->
<!---->
<!-- .toaster { -->
<!--   &__wrapper { -->
<!--     position: fixed; -->
<!--     bottom: 3%; -->
<!--     right: 5%; -->
<!---->
<!--     z-index: 100; -->
<!---->
<!--     display: flex; -->
<!--     flex-direction: column; -->
<!--     gap: 1rem; -->
<!--   } -->
<!---->
<!--   &__inner { -->
<!--     --color: black; -->
<!--     display: flex; -->
<!--     align-items: center; -->
<!--     gap: 1rem; -->
<!--     margin-bottom: 5px; -->
<!---->
<!--     border-radius: 0.3rem; -->
<!---->
<!--     border: 1px solid transparent; -->
<!---->
<!--     background-color: white; -->
<!---->
<!--     padding: 1rem 1.6rem; -->
<!---->
<!--     border-color: var(--color); -->
<!--     color: var(--color); -->
<!--     svg { -->
<!--       fill: var(--color); -->
<!--       stroke: var(--color); -->
<!--     } -->
<!---->
<!--     &.success { -->
<!--       --color: green; -->
<!--     } -->
<!---->
<!--     &.warning { -->
<!--       --color: orange; -->
<!--     } -->
<!---->
<!--     &.error { -->
<!--       --color: red; -->
<!--     } -->
<!---->
<!--     &-icon { -->
<!--       width: 1.8rem; -->
<!--       aspect-ratio: 1/1; -->
<!--     } -->
<!---->
<!--     &-text { -->
<!--       font-size: 1rem; -->
<!--       font-weight: 400; -->
<!--     } -->
<!--   } -->
<!-- } -->
<!-- </style> -->
