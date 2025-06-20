<script lang="ts">
	import type { PageData } from '../../routes/$types';
	interface Props {
		name: string;
		url: string;
	}
	const { name, url }: Props = $props();
</script>

<a
	href={url}
	title={name}
	aria-label={name}
	class="w-full h-16 bg-button grid place-content-center rounded-4xl uppercase font-bold text-2xl"
>
	{name}
</a>
