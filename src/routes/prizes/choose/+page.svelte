<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import type { PageData } from './$types';

	const { data }: { data: PageData } = $props();
</script>

<div class="flex flex-col h-dvh px-6 pb-[10%]">
	<div
		class="flex flex-col justify-center items-center bg-secondary rounded-b-4xl overflow-hidden gap-6 min-h-[471px] w-full"
	>
		<div class="overflow-hidden rounded-full w-[92px] aspect-square gap-4 bg-[#D9D9D9]">
			<img src="/user_icon.svg" alt="" class="h-full w-auto object-fill" />
		</div>
		<div class="space-y-4">
			<span>Name user</span>
			<span>Почта@mail.ru</span>
			<span>Зарегистрирован дд.мм.гггг</span>
		</div>
	</div>
	<div class="flex flex-col justify-center items-center h-full gap-4">
		<h1 class="font-black text-2xl">Поздравляем!</h1>
		<p class="text-center">Вы выиграли! Чтобы забрать приз, войдите или зарегистрируйтесь</p>
	</div>
	<div class="flex h-full justify-between items-center">
		<Button url="/prizes/choose" name="забрать приз"></Button>
	</div>
</div>
