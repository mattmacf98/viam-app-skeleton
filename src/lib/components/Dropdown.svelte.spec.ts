import { page } from 'vitest/browser';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Dropdown from './Dropdown.svelte';

const options = [
	{ label: 'Option A', value: 'a' },
	{ label: 'Option B', value: 'b' },
	{ label: 'Option C', value: 'c' }
];

describe('Dropdown', () => {
	it('should render with placeholder text', async () => {
		render(Dropdown, { options, placeholder: 'Choose one' });

		const trigger = page.getByRole('combobox');
		await expect.element(trigger).toBeInTheDocument();
		await expect.element(trigger).toHaveTextContent('Choose one');
	});

	it('should open and show options on click', async () => {
		render(Dropdown, { options });

		const trigger = page.getByRole('combobox');
		await trigger.click();

		const listbox = page.getByRole('listbox');
		await expect.element(listbox).toBeInTheDocument();

		const items = page.getByRole('option');
		await expect.elements(items).toHaveLength(3);
	});

	it('should select an option on click', async () => {
		render(Dropdown, { options });

		const trigger = page.getByRole('combobox');
		await trigger.click();

		const optionB = page.getByText('Option B');
		await optionB.click();

		await expect.element(trigger).toHaveTextContent('Option B');
	});

	it('should display the selected option label when value is set', async () => {
		render(Dropdown, { options, value: 'b' });

		const trigger = page.getByRole('combobox');
		await expect.element(trigger).toHaveTextContent('Option B');
	});

	it('should close when clicking the trigger again', async () => {
		render(Dropdown, { options });

		const trigger = page.getByRole('combobox');
		await trigger.click();

		await expect.element(page.getByRole('listbox')).toBeInTheDocument();

		await trigger.click();

		await expect.element(page.getByRole('listbox')).not.toBeInTheDocument();
	});

	it('should set aria-expanded correctly', async () => {
		render(Dropdown, { options });

		const trigger = page.getByRole('combobox');
		await expect.element(trigger).toHaveAttribute('aria-expanded', 'false');

		await trigger.click();
		await expect.element(trigger).toHaveAttribute('aria-expanded', 'true');
	});
});
