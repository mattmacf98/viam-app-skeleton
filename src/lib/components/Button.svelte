<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		onclick?: () => void;
		children: Snippet;
	}

	let { onclick, children }: Props = $props();
</script>

<button
	class="cursor-pointer rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
	{onclick}
>
	{@render children()}
</button>

