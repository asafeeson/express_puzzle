<script lang="ts">
	import Button from '../lib/components/Button.svelte';

	import type { PageData } from './$types';

	const { data }: { data: PageData } = $props();
</script>

<div class="grid grid-rows-[5fr_1fr_1fr] h-dvh px-6 pb-[10%]">
	<div class="grid place-content-center rounded-b-4xl overflow-hidden p-4 gap-6">
		<div class="overflow-hidden rounded-2xl aspect-square">
			<video autoplay loop muted playsinline>
				<source src="/pengu.mp4" type="video/mp4" />
				Ваш браузер не поддерживает видео.
			</video>
		</div>
	</div>
	<h1 class="text-2xl max-w-2/3 mx-auto text-center self-center">Собирай пазлы и зарабатывай</h1>
	<div class="self-end">
		<Button url="game/first" name="играть"></Button>
	</div>
</div>
