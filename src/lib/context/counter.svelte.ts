import { getContext, setContext } from 'svelte';

const COUNTER_KEY = Symbol('counter');

export interface CounterContext {
	count: number;
	increment: () => void;
	decrement: () => void;
}

export function createCounterContext(initial = 0): CounterContext {
	let count = $state(initial);

	const ctx: CounterContext = {
		get count() {
			return count;
		},
		increment: () => count++,
		decrement: () => count--
	};

	setContext(COUNTER_KEY, ctx);
	return ctx;
}

export function getCounterContext(): CounterContext {
	return getContext<CounterContext>(COUNTER_KEY);
}
