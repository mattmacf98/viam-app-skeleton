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
	let triggerRef = $state<HTMLButtonElement | null>(null);
	let listboxRef = $state<HTMLUListElement | null>(null);
	let activeIndex = $state(-1);

	const selectedOption = $derived(options.find((opt) => opt.value === value));

	function toggle() {
		open = !open;
		if (open) {
			activeIndex = options.findIndex((opt) => opt.value === value);
		}
	}

	function select(option: DropdownOption) {
		value = option.value;
		open = false;
		onchange?.(value);
		triggerRef?.focus();
	}

	function handleTriggerKeydown(event: KeyboardEvent) {
		switch (event.key) {
			case 'ArrowDown':
			case 'ArrowUp':
				event.preventDefault();
				if (!open) {
					open = true;
					activeIndex = event.key === 'ArrowDown' ? 0 : options.length - 1;
				}
				break;
			case 'Enter':
			case ' ':
				event.preventDefault();
				toggle();
				break;
			case 'Escape':
				if (open) {
					event.preventDefault();
					open = false;
					triggerRef?.focus();
				}
				break;
		}
	}

	function handleListKeydown(event: KeyboardEvent) {
		switch (event.key) {
			case 'ArrowDown':
				event.preventDefault();
				activeIndex = (activeIndex + 1) % options.length;
				break;
			case 'ArrowUp':
				event.preventDefault();
				activeIndex = (activeIndex - 1 + options.length) % options.length;
				break;
			case 'Enter':
			case ' ':
				event.preventDefault();
				if (activeIndex >= 0 && activeIndex < options.length) {
					select(options[activeIndex]!);
				}
				break;
			case 'Escape':
				event.preventDefault();
				open = false;
				triggerRef?.focus();
				break;
			case 'Home':
				event.preventDefault();
				activeIndex = 0;
				break;
			case 'End':
				event.preventDefault();
				activeIndex = options.length - 1;
				break;
		}
	}

	function handleWindowClick(event: MouseEvent) {
		const target = event.target as Node;
		if (!triggerRef?.contains(target) && !listboxRef?.contains(target)) {
			open = false;
		}
	}
</script>

<svelte:window onclick={handleWindowClick} />

<div class="relative w-full">
	<button
		bind:this={triggerRef}
		type="button"
		class="flex w-full cursor-pointer items-center justify-between rounded-lg border border-gray-300 bg-white px-4 py-2 text-left transition-colors hover:border-purple-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none {open
			? 'border-purple-500 ring-2 ring-purple-500/20'
			: ''}"
		role="combobox"
		aria-expanded={open}
		aria-haspopup="listbox"
		aria-controls="dropdown-listbox"
		onclick={toggle}
		onkeydown={handleTriggerKeydown}
	>
		<span class={selectedOption ? 'text-gray-900' : 'text-gray-400'}>
			{selectedOption ? selectedOption.label : placeholder}
		</span>
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
			bind:this={listboxRef}
			id="dropdown-listbox"
			role="listbox"
			class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg border border-gray-200 bg-white py-1 shadow-lg"
			onkeydown={handleListKeydown}
			tabindex="-1"
		>
			{#each options as option, index}
				<li
					role="option"
					aria-selected={option.value === value}
					class="cursor-pointer px-4 py-2 text-sm transition-colors {option.value === value
						? 'bg-purple-50 font-medium text-purple-700'
						: 'text-gray-700'} {index === activeIndex ? 'bg-purple-100' : 'hover:bg-gray-50'}"
					onclick={() => select(option)}
					onmouseenter={() => (activeIndex = index)}
				>
					{option.label}
				</li>
			{/each}
		</ul>
	{/if}
</div>
