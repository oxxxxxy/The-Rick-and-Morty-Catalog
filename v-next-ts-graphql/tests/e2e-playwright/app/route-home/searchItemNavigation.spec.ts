import { test, expect } from '@playwright/test';



test(`navigation via searchItemNavigation`, async ({page}) => {
	await page.goto('localhost:3000'); 

	await page.getByTitle('Search characters').click()

	expect(
		await page.waitForURL(/00\/characters$/, {timeout: 1000})
	).toBe(undefined);

	expect(
		await page.getByTitle('Search characters')
		.evaluate(e => {
			if([...e.classList].includes('selected-select-list-option')){
				return 1
			}
		})
	).toBe(1);


	await page.getByTitle('Search locations').click()
	
	expect(
		await page.waitForURL(/00\/locations$/, {timeout: 1000})
	).toBe(undefined);

	expect(
		await page.getByTitle('Search locations')
		.evaluate(e => {
			if([...e.classList].includes('selected-select-list-option')){
				return 1
			}
		})
	).toBe(1);


	await page.getByTitle('Search episodes').click()
	
	expect(
		await page.waitForURL(/00\/episodes$/, {timeout: 1000})
	).toBe(undefined);

	expect(
		await page.getByTitle('Search episodes')
		.evaluate(e => {
			if([...e.classList].includes('selected-select-list-option')){
				return 1
			}
		})
	).toBe(1);

})
