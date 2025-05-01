import { test, expect } from '@playwright/test';



test.describe('locations-snapshot', () => {

	const params = '?type=Planet'

	test('full page screenshot without params and with params', async ({ page }) => { 
		await page.goto('localhost:3000/locations'); 
	
		await expect(page).toHaveScreenshot('full page without params before.png');
		
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
		
		await expect(page).toHaveScreenshot('full page without params after.png');
	

		await page.goto('localhost:3000/locations' + params); 
		
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
		
		await expect(page).toHaveScreenshot('full page with params.png');
	}); 
	
	test('header', async ({ page }) => { 
		await page.goto('localhost:3000/locations'); 
	
		await expect(page.locator('header')).toHaveScreenshot('header-screenshot.png');


		await page.waitForFunction(
			() => {
				if(
					document.querySelector('span.server-status-icon')
						.classList.contains('server-status-icon_OK')
				){
					return true;
				}
			},
			{ timeout: 5000 }
		);

		await expect(page.locator('header')).toHaveScreenshot('header-after-loading.png');
	}); 

	test('search routes navigation', async ({ page }) => { 
		await page.goto('localhost:3000/locations'); 

		let searchRoutesNav;
		for(const l of await page
				.locator('div.d-flex.jc-center.margin-10.w-100')
				.all()
		){
			if(
				await l.locator(`div.search--width.d-flex.ai-center.jc-center.fd-if-d-row-if-m-column`).count()
			){
				searchRoutesNav = l;
			}
		}

		if(!searchRoutesNav){
			throw new Error('!searchRoutesNav');
		}

		await expect(searchRoutesNav).toHaveScreenshot('search routes navigation.png');
	});

	test('locations filter without params', async ({ page }) => { 
		await page.goto('localhost:3000/locations'); 

		let locationsFilter;
		for(const l of await page
				.locator('div.margin-10.w-100.d-flex.jc-center')
				.all()
		){
			if(
				await l.getByTitle('locations').count()
			){
				locationsFilter = l;
			}
		}

		if(!locationsFilter){
			throw new Error('!locationsFilter');
		}

		await expect(locationsFilter).toHaveScreenshot('locations filter without params.png');
	});
	
	test('locations filter with params', async ({ page }) => { 
		await page.goto('localhost:3000/locations' + params); 

		let locationsFilter;
		for(const l of await page
				.locator('div.margin-10.w-100.d-flex.jc-center')
				.all()
		){
			if(
				await l.getByTitle('locations').count()
			){
				locationsFilter = l;
			}
		}

		if(!locationsFilter){
			throw new Error('!locationsFilter');
		}

		await expect(locationsFilter).toHaveScreenshot('locations filter with params.png');
	});

	test('locations results without params before and after and with params', async ({ page }) => { 
		await page.goto('localhost:3000/locations'); 

		let locationsResults;
		for(const l of await page
				.locator('div.main--font-size.color--b6b6b6.d-flex.ai-center.fd-column')
				.all()
		){
			const div = l.locator(`div.result-board`)
			if(
				await div.count()
				&& (await div.innerText() === 'Loading...')
			){
				locationsResults = l;
			}
		}

		if(!locationsResults){
			throw new Error('!locationsResults');
		}

		await expect(locationsResults).toHaveScreenshot('locations results without params before.png');

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
		
		await expect(locationsResults).toHaveScreenshot('locations results without params after.png');
		
		await page.goto('localhost:3000/locations' + params); 
		
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
		
		await expect(locationsResults).toHaveScreenshot('locations results with params.png');

	});
	
});
