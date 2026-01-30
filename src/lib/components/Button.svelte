<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		onclick?: () => void;
		children: Snippet;
	}

	let { onclick, children }: Props = $props();
</script>

<button
	class="button-3d cursor-pointer rounded-lg px-6 py-3 text-white font-semibold transition-all duration-200"
	{onclick}
>
	{@render children()}
</button>

<style>
	.button-3d {
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		box-shadow:
			0 4px 6px rgba(0, 0, 0, 0.1),
			0 1px 3px rgba(0, 0, 0, 0.08),
			inset 0 -2px 0 rgba(0, 0, 0, 0.2);
		position: relative;
		transform: translateY(0);
	}

	.button-3d:hover {
		background: linear-gradient(135deg, #7c8ff0 0%, #8b5ab8 100%);
		box-shadow:
			0 6px 12px rgba(0, 0, 0, 0.15),
			0 2px 4px rgba(0, 0, 0, 0.1),
			inset 0 -2px 0 rgba(0, 0, 0, 0.2);
		transform: translateY(-2px);
	}

	.button-3d:active {
		background: linear-gradient(135deg, #5a6fd8 0%, #65408e 100%);
		box-shadow:
			0 2px 4px rgba(0, 0, 0, 0.1),
			inset 0 2px 4px rgba(0, 0, 0, 0.2);
		transform: translateY(1px);
	}
</style>
