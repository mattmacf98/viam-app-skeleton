import { page } from 'vitest/browser';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Dropdown from './Dropdown.svelte';

const options = [
	{ label: 'Apple', value: 'apple' },
	{ label: 'Banana', value: 'banana' },
	{ label: 'Cherry', value: 'cherry' }
];

describe('Dropdown', () => {
	it('should render with placeholder text', async () => {
		render(Dropdown, { options, placeholder: 'Pick a fruit' });

		const button = page.getByRole('button');
		await expect.element(button).toHaveTextContent('Pick a fruit');
	});

	it('should open and show options when clicked', async () => {
		render(Dropdown, { options });

		const button = page.getByRole('button');
		await button.click();

		const listbox = page.getByRole('listbox');
		await expect.element(listbox).toBeInTheDocument();

		const items = page.getByRole('option');
		await expect.element(items.nth(0)).toHaveTextContent('Apple');
		await expect.element(items.nth(1)).toHaveTextContent('Banana');
		await expect.element(items.nth(2)).toHaveTextContent('Cherry');
	});

	it('should select an option when clicked', async () => {
		render(Dropdown, { options });

		const button = page.getByRole('button');
		await button.click();

		const appleOption = page.getByText('Apple');
		await appleOption.click();

		await expect.element(button).toHaveTextContent('Apple');
	});

	it('should close the dropdown after selection', async () => {
		render(Dropdown, { options });

		const button = page.getByRole('button');
		await button.click();

		const bananaOption = page.getByText('Banana');
		await bananaOption.click();

		const listbox = page.getByRole('listbox');
		await expect.element(listbox).not.toBeInTheDocument();
	});

	it('should display selected value label when value prop is set', async () => {
		render(Dropdown, { options, value: 'cherry' });

		const button = page.getByRole('button');
		await expect.element(button).toHaveTextContent('Cherry');
	});

	it('should have correct aria attributes', async () => {
		render(Dropdown, { options });

		const button = page.getByRole('button');
		await expect.element(button).toHaveAttribute('aria-haspopup', 'listbox');
		await expect.element(button).toHaveAttribute('aria-expanded', 'false');

		await button.click();
		await expect.element(button).toHaveAttribute('aria-expanded', 'true');
	});
});
