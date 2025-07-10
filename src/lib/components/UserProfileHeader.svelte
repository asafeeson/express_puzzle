<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		username = 'User@Name',
		email = 'Почта@маил.ру',
		date = 'дд.мм.гггг'
	}: { username?: string; email?: string; date?: string } = $props();
</script>

<div class="flex flex-col justify-center items-center bg-secondary rounded-b-4xl gap-6 w-full">
	<img src="/avatar.png" alt="" class="h-auto w-auto" />
	<div class="flex flex-col gap-2 items-center">
		<span class="font-black text-2xl">{username}</span>
		<span>{email}</span>
		<span>Зарегистрирован {date}</span>
	</div>
</div>
