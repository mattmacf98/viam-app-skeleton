<script lang="ts">
	import { Card, Counter, Slider } from '$lib';

	let sliderValue = $state(50);
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
	</div>
</div>
