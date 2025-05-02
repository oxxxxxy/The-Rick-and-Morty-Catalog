import { test, expect } from '@playwright/test';




test(`navigation from localhost:port/`, async ({page}) => {
	await page.goto('localhost:3000'); 


	await page.getByTitle('Search characters').click()

	expect(
		await page.waitForURL(/00\/characters$/, {timeout: 2000})
	).toBe(undefined);

	
	await page.getByTitle('Home').click();

	expect(
		await page.waitForURL(/3000\/$/, {timeout: 2000})
	).toBe(undefined);



});
