<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		title?: string;
		description?: string;
		children?: Snippet;
		class?: string;
	}

	let { title, description, children, class: className = '' }: Props = $props();

	let cardRef = $state<HTMLDivElement | null>(null);
	let rotateX = $state(0);
	let rotateY = $state(0);
	let isHovering = $state(false);

	function handleMouseMove(event: MouseEvent) {
		if (!cardRef) return;

		const rect = cardRef.getBoundingClientRect();
		const x = event.clientX - rect.left;
		const y = event.clientY - rect.top;

		const centerX = rect.width / 2;
		const centerY = rect.height / 2;

		const percentX = (x - centerX) / centerX;
		const percentY = (y - centerY) / centerY;

		rotateY = percentX * 10;
		rotateX = -percentY * 10;
	}

	function handleMouseEnter() {
		isHovering = true;
	}

	function handleMouseLeave() {
		isHovering = false;
		rotateX = 0;
		rotateY = 0;
	}
</script>

<div
	bind:this={cardRef}
	role="article"
	onmousemove={handleMouseMove}
	onmouseenter={handleMouseEnter}
	onmouseleave={handleMouseLeave}
	class="group relative rounded-xl bg-gradient-to-br from-white to-gray-100 p-6 shadow-lg transition-all duration-300 {className}"
	style="
		transform: perspective(1000px) rotateX({rotateX}deg) rotateY({rotateY}deg) {isHovering
		? 'translateZ(20px) scale(1.02)'
		: 'translateZ(0px) scale(1)'};
		transform-style: preserve-3d;
	"
>
	<div
		class="absolute inset-0 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
		style="transform: translateZ(1px);"
	></div>

	<div class="relative" style="transform: translateZ(50px);">
		{#if title}
			<h3 class="mb-2 text-xl font-bold text-gray-800">{title}</h3>
		{/if}
		{#if description}
			<p class="text-gray-600">{description}</p>
		{/if}
		{#if children}
			{@render children()}
		{/if}
	</div>

	<div
		class="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
		style="
			background: radial-gradient(
				600px circle at {isHovering ? 'var(--mouse-x, 50%)' : '50%'} {isHovering
			? 'var(--mouse-y, 50%)'
			: '50%'},
				rgba(255, 255, 255, 0.4),
				transparent 40%
			);
		"
	></div>
</div>
