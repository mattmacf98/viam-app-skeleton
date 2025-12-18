<script lang="ts">
	import { getCounterContext } from '$lib/context/counter.svelte';
	import Button from './Button.svelte';

	const counter = getCounterContext();
</script>

<div class="flex items-center gap-4">
	<Button onclick={counter.decrement}>-</Button>
	<span class="text-2xl font-bold">{counter.count}</span>
	<Button onclick={counter.increment}>+</Button>
</div>
