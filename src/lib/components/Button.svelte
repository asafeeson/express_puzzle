<script lang="ts">
	interface Props {
		name: string;
		url: string;
	}
	const { name, url }: Props = $props();
</script>

<a href={url} title={name} aria-label={name} class="ddd-button">
	{name}
</a>

<style>
	.ddd-button {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		padding: 20px 70px;
		gap: 10px;
		width: 328px;
		height: 87px;
		background: #ff9a3c;
		box-shadow:
			0px 4px 15px rgba(0, 0, 0, 0.15),
			inset 0px -4px 4px rgba(0, 0, 0, 0.3),
			inset 0px 4px 4px rgba(255, 255, 255, 0.35);
		border-radius: 35px;

		font-family: 'Baloo Cyrilic', sans-serif;
		font-style: normal;
		font-weight: 900;
		font-size: 30px;
		line-height: 47px;
		text-align: center;
		text-transform: uppercase;
		color: #FFFFFF;
		text-shadow: -1px 1px 1.6px rgba(0, 0, 0, 0.25), 1px 2px 4.5px rgba(0, 0, 0, 0.25);
		
	}
</style>
