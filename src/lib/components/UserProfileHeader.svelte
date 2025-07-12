<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		username = 'User@Name',
		email = 'Почта@маил.ру',
		date = 'дд.мм.гггг'
	}: { username?: string; email?: string; date?: string } = $props();
</script>

<div class="flex flex-col justify-center items-center bg-secondary rounded-b-2xl w-fit h-fit gap-3 px-8 py-4 layer-shadow min-w-3xs">
	<div class="flex flex-col justify-start items-center">
		<enhanced:img
			src="/static/avatar.png?h=100&format=webp&quality=100&lossless=true"
			alt="User Avatar Placeholder Picture"
			width="100"
			height="100"
		/>
		<span class="font-black">{username}</span>
	</div>
	<div class="flex flex-col gap-2 items-center text-sm">
		<span>{email}</span>
		<span>Зарегистрирован {date}</span>
	</div>
</div>

<style>
	@layer components {
		.layer-shadow {
			box-shadow:
				-9px 7px 4.9px rgba(0, 0, 0, 0.05),
				inset -2px -3px 1.2px rgba(255, 255, 255, 0.25);
		}
	}
</style>
