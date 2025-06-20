<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import type { PageData } from './$types';

	const { data }: { data: PageData } = $props();
</script>

<div class="flex flex-col h-dvh px-6 pb-[10%] gap-6">
	<div
		class="flex flex-col justify-center items-center bg-secondary rounded-b-4xl gap-6 w-full py-10"
	>
		<div class="overflow-hidden rounded-full w-[92px] aspect-square gap-4 bg-[#D9D9D9]">
			<img src="/user_icon.svg" alt="" class="h-full w-auto object-fill" />
		</div>
		<div class="flex flex-col gap-2 items-center">
			<span class="font-extrabold text-2xl">Name user</span>
			<span class="text-sm">Почта@mail.ru</span>
			<span class="text-sm">Зарегистрирован дд.мм.гггг</span>
		</div>
	</div>
	<div class="flex flex-col justify-center items-center h-full gap-4">
		<h1 class="font-black text-2xl">Нажми и крути</h1>
		<div class="flex w-full justify-center items-center">
			<button
				type="button"
				class="p-0 bg-transparent border-none outline-none"
				onclick={() => {
					const img = event.currentTarget.querySelector('img') as HTMLImageElement;
					img.style.transform = 'rotate(360deg)';
					setTimeout(() => {
						img.style.transform = '';
					}, 700);
				}}
			>
				<img src="/fortune_wheel.svg" alt="" class="transition-transform duration-700"/>
			</button>
		</div>
	</div>
	<div class="flex justify-between items-end">
		<Button url="#" name="КРУТИТЬ"></Button>
	</div>
</div>
