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

		const trigger = page.getByRole('button');
		await expect.element(trigger).toHaveTextContent('Pick a fruit');
	});

	it('should open the listbox when the trigger is clicked', async () => {
		render(Dropdown, { options });

		const trigger = page.getByRole('button');
		await trigger.click();

		const listbox = page.getByRole('listbox');
		await expect.element(listbox).toBeInTheDocument();
	});

	it('should display all options when open', async () => {
		render(Dropdown, { options });

		const trigger = page.getByRole('button');
		await trigger.click();

		const items = page.getByRole('option');
		await expect.element(items.nth(0)).toHaveTextContent('Apple');
		await expect.element(items.nth(1)).toHaveTextContent('Banana');
		await expect.element(items.nth(2)).toHaveTextContent('Cherry');
	});

	it('should select an option and close the dropdown', async () => {
		render(Dropdown, { options });

		const trigger = page.getByRole('button');
		await trigger.click();

		const items = page.getByRole('option');
		await items.nth(1).click();

		await expect.element(trigger).toHaveTextContent('Banana');
		await expect.element(page.getByRole('listbox')).not.toBeInTheDocument();
	});

	it('should show the selected label when value is provided', async () => {
		render(Dropdown, { options, value: 'cherry' });

		const trigger = page.getByRole('button');
		await expect.element(trigger).toHaveTextContent('Cherry');
	});

	it('should close when Escape is pressed on the trigger', async () => {
		render(Dropdown, { options });

		const trigger = page.getByRole('button');
		await trigger.click();

		await expect.element(page.getByRole('listbox')).toBeInTheDocument();

		await trigger.press('Escape');
		await expect.element(page.getByRole('listbox')).not.toBeInTheDocument();
	});
});
