<script lang="ts">
	interface Props {
		checked?: boolean;
		onchange?: (checked: boolean) => void;
		disabled?: boolean;
	}

	let { checked = $bindable(false), onchange, disabled = false }: Props = $props();

	function handleChange() {
		if (!disabled) {
			checked = !checked;
			onchange?.(checked);
		}
	}
</script>

<button
	type="button"
	role="switch"
	aria-checked={checked}
	aria-label="Toggle switch"
	{disabled}
	onclick={handleChange}
	class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 {checked
		? 'bg-purple-600'
		: 'bg-gray-300'}"
>
	<span
		class="inline-block size-4 transform rounded-full bg-white shadow-lg transition-transform duration-200 {checked
			? 'translate-x-6'
			: 'translate-x-1'}"
	></span>
</button>
