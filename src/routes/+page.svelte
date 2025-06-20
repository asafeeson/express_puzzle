<script lang="ts">
	import Button from '../lib/components/Button.svelte';

	import type { PageData } from './$types';

	const { data }: { data: PageData } = $props();
</script>

<div class="grid grid-rows-[5fr_1fr_1fr] place-content-between h-dvh px-6 pb-[10%]">
	<div class="grid place-content-center bg-secondary rounded-b-4xl overflow-hidden p-4 gap-6">
		<div class="overflow-hidden rounded-2xl aspect-square">
			<img src="/main_page.png" alt="" class="h-full w-auto object-fill" />
		</div>
		<p class="text-center">Собери элементы пазла</p>
	</div>
	<h1 class="text-2xl max-w-2/3 mx-auto text-center self-center">Собирай пазлы и зарабатывай</h1>
	<div class="self-end">
		<Button url="game/first" name="играть"></Button>
	</div>
</div>
