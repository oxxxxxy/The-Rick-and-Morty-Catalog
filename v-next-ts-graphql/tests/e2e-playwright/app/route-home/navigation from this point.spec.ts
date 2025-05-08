import { test, expect, Page, Locator } from '@playwright/test';




test(`navigation from localhost:port/`, async ({page}) => {
	await page.goto('localhost:3000'); 


	await page.getByTitle('Search characters').click()

	expect(
		await page.waitForURL(/00\/characters$/, {timeout: 2000})
	).toBe(undefined);


	const returnHome = async (page: Page) => {
		await page.getByTitle('Home').click();

		expect(
			await page.waitForURL(/3000\/$/, {timeout: 2000})
		).toBe(undefined);

		await page.waitForFunction(
			() => {
				const tiles = [...document.querySelector('div.result-board').children];
				
				if(
					tiles.every(e => [...e.classList].includes('tile-box'))
				){
					return true;
				}
			},
			null,
			{ timeout: 5000 }
		);
	}

	await returnHome(page);


	const getTile = async (page: Page, tileType: string): Promise<Locator | undefined> => {
		for(const loc of await page.locator('div.tile-box').all()){
			const bool = await loc.evaluate((e, tileType) => {
					if(e.getAttributeNames().includes(tileType)){
						return true;
					}
				},
				tileType
			)

			if(bool){
				return loc;
			}
		}
	};

	const getItemId = async (item: string, html: string): Promise<string> => {
		const match = html.replaceAll(/\s+/g, ' ').match(new RegExp(`href(\s+|)=(\s+|)"/${item}/([0-9]+)"`));

		if(!match || typeof match[3] !== 'string'){
			throw new Error(`typescript plug`);
		}

		return match[3];
	}


	let timesOfFoundTilesInRandom = 0;


	const characterTile = await getTile(page, 'data-character-tile');
	

	if(characterTile){
		timesOfFoundTilesInRandom++;

		const item = 'characters';

		const html = await characterTile.locator('div.tile-img-box').innerHTML();
		const id = await getItemId(item, html);
		
		await characterTile.locator('div.tile-img-box')
			.locator('img.tile-img-item').click(
				{
					position:{x: 10, y: 10},
				}
			);


		expect(
			await page.waitForURL(new RegExp(`3000/${item}/${id}$`, 'g'), {timeout: 2000})
		).toBe(undefined);

		await returnHome(page);
	}

	
	const locationTile = await getTile(page, 'data-location-tile');
	
	if(locationTile){
		timesOfFoundTilesInRandom++;

		const item = 'locations';

		const html = await locationTile.innerHTML();
		const id = await getItemId(item, html);
		
		await locationTile.locator('a.tile-info-box').click();


		expect(
			await page.waitForURL(new RegExp(`3000/${item}/${id}$`), {timeout: 2000})
		).toBe(undefined);

		await returnHome(page);
	}
	

	const episodeTile = await getTile(page, 'data-episode-tile');
	
	if(episodeTile){
		timesOfFoundTilesInRandom++;

		const item = 'episodes';

		const html = await episodeTile.innerHTML();
		const id = await getItemId(item, html);
		
		await episodeTile.locator('a.tile-info-box').click();


		expect(
			await page.waitForURL(new RegExp(`3000/${item}/${id}$`), {timeout: 2000})
		).toBe(undefined);

		await returnHome(page);
	}


	if(timesOfFoundTilesInRandom < 2){
		throw new Error(`timesOfFoundTilesInRandom < 2. very bad scenario. i guess we have changes in NineRandomTiles component which break test. Execute it again, until 2 times.`)
	}

});
