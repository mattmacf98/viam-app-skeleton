<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		onclick?: () => void;
		children: Snippet;
	}

	let { onclick, children }: Props = $props();
</script>

<button
	class="cursor-pointer rounded-lg bg-gradient-to-br from-purple-500 to-purple-700 px-6 py-3 text-white font-semibold shadow-lg shadow-purple-500/50 transition-all duration-200 hover:shadow-xl hover:shadow-purple-500/60 hover:-translate-y-0.5 active:translate-y-0 active:shadow-inner active:shadow-purple-900/50"
	{onclick}
>
	{@render children()}
</button>
