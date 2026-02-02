<script lang="ts">
	import { Counter, Slider } from '$lib';

	let sliderValue = $state(50);
</script>

<div class="flex min-h-screen flex-col items-center justify-center gap-6">
	<h1 class="text-3xl font-bold">My Counter</h1>
	<Counter />
	<div class="w-80">
		<Slider bind:value={sliderValue} />
	</div>
</div>
