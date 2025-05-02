import { test, expect } from '@playwright/test';




test.describe(`checking of following of external links`, () => {
	test('rickandmortyapi status', async ({page}) => {
		await page.goto('localhost:3000'); 

		expect(
			await page.waitForURL(/3000\/$/, {timeout: 2000})
		).toBe(undefined);

	
		let rickAndMortyApiStatusClicks = 0;
		const rickAndMortyApiPopup = page.waitForEvent('popup');
	
		for(const l of await page.getByTitle("check RickAndMortyApi status").all()){
			if(await l.isVisible()){
				await l.click();
				rickAndMortyApiStatusClicks++;
			}
		}
	
		expect(rickAndMortyApiStatusClicks).toBe(1);
	
		const popup = await rickAndMortyApiPopup;

		expect(
			await popup.waitForURL(/status\.rickandmortyapi\.com/, {timeout: 5000})
		).toBe(undefined);

	});


	test('github repo from header', async ({page}) => {
		await page.goto('localhost:3000'); 

		expect(
			await page.waitForURL(/3000\/$/, {timeout: 2000})
		).toBe(undefined);


		await page.getByTitle('GitHub').click();

		expect(
			await page.waitForURL('https://github.com/oxxxxxy/The-Rick-and-Morty-Catalog/tree/main/v-next-ts-graphql', {timeout: 5000})
		).toBe(undefined);

	});


	test('rickandmortyapi from poster', async ({page}) => {
		await page.goto('localhost:3000'); 

		expect(
			await page.waitForURL(/3000\/$/, {timeout: 2000})
		).toBe(undefined);

	
		const popupPromise = page.waitForEvent('popup');
		await page.getByText('https://rickandmortyapi.com').click();
		const popup = await popupPromise;

		expect(
			await popup.waitForURL('https://rickandmortyapi.com', {timeout: 5000})
		).toBe(undefined);

	});


	test('github repo from poster', async ({page}) => {
		await page.goto('localhost:3000'); 

		expect(
			await page.waitForURL(/3000\/$/, {timeout: 2000})
		).toBe(undefined);

	
		const popupPromise = page.waitForEvent('popup');
		await page.getByText('Next.js-TS-GraphQL').click();
		const popup = await popupPromise;

		expect(
			await popup.waitForURL('https://github.com/oxxxxxy/The-Rick-and-Morty-Catalog/tree/main/v-next-ts-graphql', {timeout: 5000})
		).toBe(undefined);

	});
	
	
	
	
	
	
	

});
