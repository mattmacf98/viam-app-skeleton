<script lang="ts">
	interface Props {
		value?: number;
		min?: number;
		max?: number;
		step?: number;
		onchange?: (value: number) => void;
	}

	let { value = $bindable(50), min = 0, max = 100, step = 1, onchange }: Props = $props();

	function handleInput(event: Event) {
		const target = event.target as HTMLInputElement;
		value = Number(target.value);
		onchange?.(value);
	}
</script>

<div class="flex w-full flex-col gap-2">
	<div class="flex items-center justify-between">
		<span class="text-sm font-medium text-gray-700">Value: {value}</span>
		<span class="text-xs text-gray-500">{min} - {max}</span>
	</div>
	<input
		type="range"
		{min}
		{max}
		{step}
		{value}
		oninput={handleInput}
		class="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 accent-purple-600 hover:accent-purple-700"
	/>
</div>
