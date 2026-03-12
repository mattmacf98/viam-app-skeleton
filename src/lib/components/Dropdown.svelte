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
	let listRef = $state<HTMLUListElement | null>(null);

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
		triggerRef?.focus();
	}

	function handleTriggerKeydown(event: KeyboardEvent) {
		if (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			open = true;
			requestAnimationFrame(() => {
				const first = listRef?.querySelector<HTMLLIElement>('[role="option"]');
				first?.focus();
			});
		} else if (event.key === 'Escape') {
			open = false;
		}
	}

	function handleOptionKeydown(event: KeyboardEvent, option: DropdownOption) {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			select(option);
		} else if (event.key === 'ArrowDown') {
			event.preventDefault();
			const next = (event.target as HTMLElement).nextElementSibling as HTMLElement | null;
			next?.focus();
		} else if (event.key === 'ArrowUp') {
			event.preventDefault();
			const prev = (event.target as HTMLElement).previousElementSibling as HTMLElement | null;
			prev?.focus();
		} else if (event.key === 'Escape') {
			open = false;
			triggerRef?.focus();
		}
	}

	function handleWindowClick(event: MouseEvent) {
		const target = event.target as Node;
		if (triggerRef && !triggerRef.contains(target) && listRef && !listRef.contains(target)) {
			open = false;
		}
	}
</script>

<svelte:window onclick={handleWindowClick} />

<div class="relative inline-block w-full">
	<button
		bind:this={triggerRef}
		type="button"
		class="flex w-full cursor-pointer items-center justify-between rounded-lg border border-gray-300 bg-white px-4 py-2 text-left transition-colors hover:border-purple-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none"
		aria-haspopup="listbox"
		aria-expanded={open}
		onclick={toggle}
		onkeydown={handleTriggerKeydown}
	>
		<span class={value ? 'text-gray-900' : 'text-gray-500'}>{selectedLabel}</span>
		<svg
			class="h-4 w-4 text-gray-400 transition-transform {open ? 'rotate-180' : ''}"
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
			bind:this={listRef}
			role="listbox"
			class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg border border-gray-200 bg-white py-1 shadow-lg"
		>
			{#each options as option (option.value)}
				<li
					role="option"
					aria-selected={value === option.value}
					tabindex="0"
					class="cursor-pointer px-4 py-2 text-gray-700 transition-colors hover:bg-purple-50 hover:text-purple-900 focus:bg-purple-50 focus:text-purple-900 focus:outline-none {value ===
					option.value
						? 'bg-purple-100 font-medium text-purple-900'
						: ''}"
					onclick={() => select(option)}
					onkeydown={(e) => handleOptionKeydown(e, option)}
				>
					{option.label}
				</li>
			{/each}
		</ul>
	{/if}
</div>
