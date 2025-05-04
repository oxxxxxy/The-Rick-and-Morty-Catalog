import { test, expect, Page, Locator } from '@playwright/test';




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


	await page.waitForFunction(
		() => {
			const tiles = [...document.querySelector('div.result-board').children];
			
			if(
				tiles.every(e => [...e.classList].includes('tile-box'))
			){
				return true;
			}
		},
		{ timeout: 5000 }
	);

	const getTile = async (page: Page, tileType: string, r): Locator | undefined => {
		let tile: Locator | undefined = undefined;
	console.log('getTile')

		for(const loc of await page.locator('div.tile-box').all()){
			console.log('adf')
			if(!tile){
				const bool = await loc.evaluate((e, tileType) => {
						if(e.getAttributeNames().includes(tileType)){
							return true;
						}
					},
					tileType
				)
console.log(bool, 'bool')	
				if(bool){
					tile = loc
				}
			}
		}

		console.log('end of getTile')
		// r(tile);
		return tile;
	}

	let timesOfFoundTilesInRandom = 0;


	// const charTile = await new Promise(r => {getTile(page, 'data-character-tile', r)});
	const charTile = await getTile(page, 'data-character-tile');

	if(charTile){
		timesOfFoundTilesInRandom++;
		
		// await charTile.locator('div.tile-img-box').click();

	}

	console.log(charTile)

	if(timesOfFoundTilesInRandom < 3){
		throw new Error(`timesOfFoundTilesInRandom < 3. very bad scenario. i guess we have changes in NineRandomTiles component which break test. Execute it again, until 2 times.`)
	}

});
