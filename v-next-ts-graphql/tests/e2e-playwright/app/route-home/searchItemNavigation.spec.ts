import { test, expect } from '@playwright/test';



test(`navigation via searchItemNavigation`, async ({page}) => {
	await page.goto('localhost:3000'); 

	await page.getByTitle('Search characters').click()

	await page.waitForURL('**/characters');
	
	expect(!!(page.url()).match(/3000\/characters$/)).toBe(true);

	expect(
		await page.getByTitle('Search characters')
		.evaluate(e => {
			if([...e.classList].includes('selected-select-list-option')){
				return 1
			}
		})
	).toBe(1);


	await page.getByTitle('Search locations').click()
	
	await page.waitForURL('**/locations');

	expect(!!(page.url()).match(/3000\/locations$/)).toBe(true);

	expect(
		await page.getByTitle('Search locations')
		.evaluate(e => {
			if([...e.classList].includes('selected-select-list-option')){
				return 1
			}
		})
	).toBe(1);


	await page.getByTitle('Search episodes').click()
	
	await page.waitForURL('**/episodes');

	expect(!!(page.url()).match(/3000\/episodes$/)).toBe(true);

	expect(
		await page.getByTitle('Search episodes')
		.evaluate(e => {
			if([...e.classList].includes('selected-select-list-option')){
				return 1
			}
		})
	).toBe(1);

})
