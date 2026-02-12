<script lang="ts">
	interface Props {
		label?: string;
		options: { value: string; label: string }[];
		value?: string;
		onchange?: (value: string) => void;
		placeholder?: string;
		class?: string;
		id?: string;
	}

	let {
		label,
		options,
		value = $bindable(''),
		onchange,
		placeholder = 'Select an option',
		class: className = '',
		id = `dropdown-${Math.random().toString(36).substring(2, 9)}`
	}: Props = $props();

	let isOpen = $state(false);
	let dropdownRef = $state<HTMLDivElement | null>(null);

	const selectedOption = $derived(
		options.find((opt) => opt.value === value) || { label: placeholder, value: '' }
	);

	function toggleDropdown() {
		isOpen = !isOpen;
	}

	function selectOption(optionValue: string) {
		value = optionValue;
		isOpen = false;
		onchange?.(optionValue);
	}

	function handleClickOutside(event: MouseEvent) {
		if (dropdownRef && !dropdownRef.contains(event.target as Node)) {
			isOpen = false;
		}
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			isOpen = false;
		}
	}

	$effect(() => {
		if (isOpen) {
			document.addEventListener('click', handleClickOutside);
			document.addEventListener('keydown', handleKeydown);

			return () => {
				document.removeEventListener('click', handleClickOutside);
				document.removeEventListener('keydown', handleKeydown);
			};
		}
	});
</script>

<div bind:this={dropdownRef} class="relative w-full {className}">
	{#if label}
		<label for={id} class="mb-1 block text-sm font-medium text-gray-700">{label}</label>
	{/if}

	<button
		{id}
		type="button"
		onclick={toggleDropdown}
		class="flex w-full items-center justify-between rounded-lg border border-gray-300 bg-white px-4 py-2 text-left transition-all duration-200 hover:border-purple-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none"
		aria-haspopup="listbox"
		aria-expanded={isOpen}
	>
		<span class={value ? 'text-gray-900' : 'text-gray-500'}>
			{selectedOption.label}
		</span>
		<svg
			class="h-5 w-5 transform text-gray-400 transition-transform duration-200 {isOpen
				? 'rotate-180'
				: ''}"
			fill="none"
			stroke="currentColor"
			viewBox="0 0 24 24"
		>
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
		</svg>
	</button>

	{#if isOpen}
		<div
			class="absolute z-10 mt-1 w-full animate-fadeIn rounded-lg border border-gray-200 bg-white shadow-lg"
			role="listbox"
		>
			<ul class="max-h-60 overflow-auto rounded-lg py-1">
				{#each options as option (option.value)}
					<li>
						<button
							type="button"
							onclick={() => selectOption(option.value)}
							class="block w-full px-4 py-2 text-left transition-colors duration-150 hover:bg-purple-50 hover:text-purple-900 {option.value ===
							value
								? 'bg-purple-100 font-medium text-purple-900'
								: 'text-gray-700'}"
							role="option"
							aria-selected={option.value === value}
						>
							{option.label}
						</button>
					</li>
				{/each}
			</ul>
		</div>
	{/if}
</div>

<style>
	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateY(-8px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.animate-fadeIn {
		animation: fadeIn 0.15s ease-out;
	}
</style>
