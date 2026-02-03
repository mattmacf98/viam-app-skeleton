<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		open: boolean;
		onClose?: () => void;
		title?: string;
		children: Snippet;
		size?: 'sm' | 'md' | 'lg' | 'xl';
		showCloseButton?: boolean;
	}

	let {
		open = $bindable(),
		onClose,
		title,
		children,
		size = 'md',
		showCloseButton = true
	}: Props = $props();

	const sizeClasses = {
		sm: 'max-w-sm',
		md: 'max-w-md',
		lg: 'max-w-lg',
		xl: 'max-w-xl'
	};

	function handleBackdropClick(event: MouseEvent) {
		if (event.target === event.currentTarget) {
			handleClose();
		}
	}

	function handleBackdropKeydown(event: KeyboardEvent) {
		if (event.key === 'Enter' && event.target === event.currentTarget) {
			handleClose();
		}
	}

	function handleClose() {
		open = false;
		onClose?.();
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape' && open) {
			handleClose();
		}
	}
</script>

<svelte:window onkeydown={handleKeydown} />

{#if open}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
		onclick={handleBackdropClick}
		onkeydown={handleBackdropKeydown}
		role="dialog"
		aria-modal="true"
		aria-labelledby={title ? 'modal-title' : undefined}
		tabindex="-1"
	>
		<div class="relative w-full {sizeClasses[size]} animate-fade-in rounded-xl bg-white shadow-2xl">
			{#if title || showCloseButton}
				<div class="flex items-center justify-between border-b border-gray-200 p-6">
					{#if title}
						<h2 id="modal-title" class="text-2xl font-bold text-gray-800">{title}</h2>
					{:else}
						<div></div>
					{/if}
					{#if showCloseButton}
						<button
							type="button"
							onclick={handleClose}
							class="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
							aria-label="Close modal"
						>
							<svg
								class="h-6 w-6"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M6 18L18 6M6 6l12 12"
								></path>
							</svg>
						</button>
					{/if}
				</div>
			{/if}

			<div class="p-6">
				{@render children()}
			</div>
		</div>
	</div>
{/if}

<style>
	@keyframes fade-in {
		from {
			opacity: 0;
			transform: scale(0.95);
		}
		to {
			opacity: 1;
			transform: scale(1);
		}
	}

	.animate-fade-in {
		animation: fade-in 0.2s ease-out;
	}
</style>
