<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { createCounterContext } from '$lib/context/counter.svelte';

	let { children } = $props();

	createCounterContext();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
{@render children()}
