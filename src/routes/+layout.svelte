<script lang="ts">
	import { page } from '$app/state';
	import PageTransition from '$lib/components/PageTransition.svelte';
	import { fade } from 'svelte/transition';
	import '../app.css';
	import TextStyle3D from '$lib/components/TextStyle3D.svelte';
	let { children } = $props();
</script>

{#key page.url}
	<main
		transition:fade={{ delay: 250, duration: 300 }}
		class="sm:hidden max-w-md mx-auto w-full h-dvh flex flex-col justify-center items-center"
	>
		{@render children()}
	</main>
{/key}
<main
	class="hidden sm:flex max-w-xl mx-auto h-full w-full sm:flex-col sm:justify-center sm:items-center sm:gap-6"
>
	<h1>Играй с Телефона</h1>
	<div class="flex">
		<img src="/desktop.png" alt="" />
		<h2 class="self-end shrink">Сканируй QR код</h2>
	</div>
</main>

<style>
	h1,
	h2 {
		font-family: 'Baloo Cyrillic';
		font-style: normal;
		font-weight: 400;
		color: #ff6f00;
		line-height: 93%;
		text-align: center;
		text-shadow: 1px 2px 4.5px rgba(0, 0, 0, 0.25);
	}
	h1 {
		font-size: 96px;
	}
	h2 {
		font-size: 64px;
	}
</style>
