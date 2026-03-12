<script lang="ts">
	export interface DropdownOption {
		label: string;
		value: string;
	}

	interface Props {
		options: DropdownOption[];
		value?: string;
		placeholder?: string;
		onchange?: (value: string) => void;
	}

	let {
		options,
		value = $bindable(''),
		placeholder = 'Select an option',
		onchange
	}: Props = $props();

	let open = $state(false);
	let dropdownRef = $state<HTMLDivElement | null>(null);

	const selectedLabel = $derived(
		options.find((option) => option.value === value)?.label ?? placeholder
	);

	function toggle() {
		open = !open;
	}

	function select(option: DropdownOption) {
		value = option.value;
		open = false;
		onchange?.(option.value);
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			open = false;
		}

		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			toggle();
		}

		if (event.key === 'ArrowDown' && open) {
			event.preventDefault();
			const currentIndex = options.findIndex((opt) => opt.value === value);
			const nextIndex = (currentIndex + 1) % options.length;
			select(options[nextIndex]!);
		}

		if (event.key === 'ArrowUp' && open) {
			event.preventDefault();
			const currentIndex = options.findIndex((opt) => opt.value === value);
			const nextIndex = currentIndex <= 0 ? options.length - 1 : currentIndex - 1;
			select(options[nextIndex]!);
		}
	}

	function handleClickOutside(event: MouseEvent) {
		if (dropdownRef && !dropdownRef.contains(event.target as Node)) {
			open = false;
		}
	}
</script>

<svelte:window onclick={handleClickOutside} />

<div bind:this={dropdownRef} class="relative inline-block w-full">
	<button
		type="button"
		class="flex w-full cursor-pointer items-center justify-between rounded-lg border border-gray-300 bg-white px-4 py-2 text-left shadow-sm transition-all duration-200 hover:border-purple-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none {open
			? 'border-purple-500 ring-2 ring-purple-500/20'
			: ''}"
		onclick={toggle}
		onkeydown={handleKeydown}
		aria-haspopup="listbox"
		aria-expanded={open}
	>
		<span class={value ? 'text-gray-900' : 'text-gray-500'}>{selectedLabel}</span>
		<svg
			class="h-5 w-5 text-gray-400 transition-transform duration-200 {open ? 'rotate-180' : ''}"
			fill="none"
			stroke="currentColor"
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-5 5-5-5"
			></path>
		</svg>
	</button>

	{#if open}
		<ul
			class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg border border-gray-200 bg-white py-1 shadow-lg"
			role="listbox"
		>
			{#each options as option (option.value)}
				<li
					role="option"
					aria-selected={option.value === value}
					class="cursor-pointer px-4 py-2 text-gray-700 transition-colors duration-150 hover:bg-purple-50 hover:text-purple-700 {option.value ===
					value
						? 'bg-purple-50 font-medium text-purple-700'
						: ''}"
					onclick={() => select(option)}
					onkeydown={(e) => {
						if (e.key === 'Enter') select(option);
					}}
				>
					{option.label}
				</li>
			{/each}
		</ul>
	{/if}
</div>
