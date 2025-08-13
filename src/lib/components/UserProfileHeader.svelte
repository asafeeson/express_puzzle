<script lang="ts">
	import avatarPNG from '$lib/assets/avatar.png';

	let {
		username = 'User@Name',
		email = 'Почта@маил.ру',
		date = 'дд.мм.гггг'
	}: { username?: string; email?: string; date?: string } = $props();
</script>

<div
	class="flex flex-col justify-center items-center bg-secondary rounded-b-2xl w-fit h-fit gap-3 px-8 py-4 layer-shadow min-w-3xs"
>
	<div class="flex flex-col justify-start items-center">
		<img
			src={avatarPNG}
			alt="User Avatar Placeholder"
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
