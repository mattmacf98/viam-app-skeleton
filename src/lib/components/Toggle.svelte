<script lang="ts">
	interface Props {
		checked?: boolean;
		disabled?: boolean;
		label?: string;
		onchange?: (checked: boolean) => void;
	}

	let {
		checked = $bindable(false),
		disabled = false,
		label = 'Toggle',
		onchange
	}: Props = $props();

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
	aria-label={label}
	onclick={handleChange}
	{disabled}
	class="relative inline-flex h-8 w-14 items-center rounded-full transition-colors duration-200 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 {checked
		? 'bg-purple-600'
		: 'bg-gray-300'}"
>
	<span
		class="inline-block h-6 w-6 transform rounded-full bg-white shadow-lg transition-transform duration-200 {checked
			? 'translate-x-7'
			: 'translate-x-1'}"
	></span>
</button>
