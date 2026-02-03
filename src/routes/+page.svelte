<script lang="ts">
	import { Button, Card, Counter, Modal, Slider } from '$lib';

	let sliderValue = $state(50);
	let isBasicModalOpen = $state(false);
	let isFormModalOpen = $state(false);
	let isLargeModalOpen = $state(false);
</script>

<div class="flex min-h-screen flex-col items-center justify-center gap-8 p-8">
	<h1 class="text-4xl font-bold">Viam App Skeleton</h1>

	<div class="grid w-full max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
		<Card
			title="Interactive Counter"
			description="A simple counter component demonstrating state management with Svelte 5 runes."
		>
			<div class="mt-4">
				<Counter />
			</div>
		</Card>

		<Card
			title="Smooth Slider"
			description="An interactive slider component with smooth animations and responsive design."
		>
			<div class="mt-4 w-full">
				<Slider bind:value={sliderValue} />
				<p class="mt-2 text-center text-sm text-gray-600">Value: {sliderValue}</p>
			</div>
		</Card>

		<Card
			title="3D Card Effects"
			description="Hover over this card to see the 3D transformation effects in action!"
		/>

		<Card
			title="Built with SvelteKit"
			description="This skeleton uses SvelteKit 2 with Svelte 5's new runes syntax for modern reactive programming."
		/>

		<Card
			title="Tailwind CSS 4"
			description="Styled with the latest Tailwind CSS 4, configured via Vite plugin for optimal performance."
		/>

		<Card
			title="TypeScript Support"
			description="Full TypeScript support throughout the project for type-safe development."
		/>

		<Card
			title="Basic Modal"
			description="Click the button to open a simple modal dialog with smooth animations."
		>
			<div class="mt-4">
				<Button onclick={() => (isBasicModalOpen = true)}>Open Basic Modal</Button>
			</div>
		</Card>

		<Card
			title="Form Modal"
			description="A modal with a form example, demonstrating practical use cases."
		>
			<div class="mt-4">
				<Button onclick={() => (isFormModalOpen = true)}>Open Form Modal</Button>
			</div>
		</Card>

		<Card
			title="Large Modal"
			description="A larger modal with more content to show different size options."
		>
			<div class="mt-4">
				<Button onclick={() => (isLargeModalOpen = true)}>Open Large Modal</Button>
			</div>
		</Card>
	</div>
</div>

<Modal bind:open={isBasicModalOpen} title="Welcome!" size="md">
	<div class="space-y-4">
		<p class="text-gray-700">
			This is a basic modal component built with Svelte 5 and Tailwind CSS 4. It features:
		</p>
		<ul class="list-disc space-y-2 pl-5 text-gray-700">
			<li>Smooth fade-in animation</li>
			<li>Backdrop blur effect</li>
			<li>Keyboard support (ESC to close)</li>
			<li>Click outside to close</li>
			<li>Accessible ARIA attributes</li>
		</ul>
		<div class="flex justify-end gap-3 pt-4">
			<Button onclick={() => (isBasicModalOpen = false)}>Close</Button>
		</div>
	</div>
</Modal>

<Modal bind:open={isFormModalOpen} title="Contact Form" size="md">
	<form class="space-y-4" onsubmit={(e) => e.preventDefault()}>
		<div>
			<label for="name" class="mb-1 block text-sm font-medium text-gray-700">Name</label>
			<input
				type="text"
				id="name"
				class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none"
				placeholder="Enter your name"
			/>
		</div>
		<div>
			<label for="email" class="mb-1 block text-sm font-medium text-gray-700">Email</label>
			<input
				type="email"
				id="email"
				class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none"
				placeholder="Enter your email"
			/>
		</div>
		<div>
			<label for="message" class="mb-1 block text-sm font-medium text-gray-700">Message</label>
			<textarea
				id="message"
				rows="4"
				class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none"
				placeholder="Enter your message"
			></textarea>
		</div>
		<div class="flex justify-end gap-3 pt-4">
			<button
				type="button"
				onclick={() => (isFormModalOpen = false)}
				class="rounded-lg border border-gray-300 px-4 py-2 font-medium text-gray-700 transition-colors hover:bg-gray-50"
			>
				Cancel
			</button>
			<Button onclick={() => (isFormModalOpen = false)}>Submit</Button>
		</div>
	</form>
</Modal>

<Modal bind:open={isLargeModalOpen} title="Large Modal with More Content" size="xl">
	<div class="space-y-4">
		<p class="text-gray-700">
			This modal demonstrates the larger size option, perfect for displaying more complex content.
		</p>
		<h4 class="pt-2 text-lg font-semibold text-gray-800">Features</h4>
		<div class="grid grid-cols-2 gap-4">
			<div class="rounded-lg bg-purple-50 p-4">
				<h5 class="mb-2 font-semibold text-purple-900">Responsive</h5>
				<p class="text-sm text-purple-700">
					Automatically adapts to different screen sizes with proper padding.
				</p>
			</div>
			<div class="rounded-lg bg-blue-50 p-4">
				<h5 class="mb-2 font-semibold text-blue-900">Accessible</h5>
				<p class="text-sm text-blue-700">Built with ARIA attributes and keyboard navigation.</p>
			</div>
			<div class="rounded-lg bg-green-50 p-4">
				<h5 class="mb-2 font-semibold text-green-900">Customizable</h5>
				<p class="text-sm text-green-700">Multiple size options and flexible content slots.</p>
			</div>
			<div class="rounded-lg bg-orange-50 p-4">
				<h5 class="mb-2 font-semibold text-orange-900">Modern</h5>
				<p class="text-sm text-orange-700">Built with Svelte 5 runes and Tailwind CSS 4.</p>
			</div>
		</div>
		<div class="flex justify-end gap-3 pt-4">
			<Button onclick={() => (isLargeModalOpen = false)}>Got it!</Button>
		</div>
	</div>
</Modal>
