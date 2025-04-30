import { test, expect } from '@playwright/test';



test.describe('home-snapshot', () => {
	test('full-screenshot', async ({ page }) => { 
		await page.goto('localhost:3000/'); 
	
		await expect(page).toHaveScreenshot('screenshot.png');
	}); 
	
	test('header', async ({ page }) => { 
		await page.goto('localhost:3000/'); 
	
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

	test('poster', async ({ page }) => { 
		await page.goto('localhost:3000/'); 
	
		await expect(page.locator('div.poster--bg')).toHaveScreenshot('poster.png');
	});

	test('search routes navigation', async ({ page }) => { 
		await page.goto('localhost:3000/'); 

		let searchRoutesNav;
		for(const l of await page
				.locator('div.d-flex.ai-center.jc-center.fd-column.color--b6b6b6.main--font-size')
				.all()
		){
			if(
				await l.locator('div').locator(`div.search--width.d-flex.ai-center.jc-center.fd-if-d-row-if-m-column`).count()
			){
				searchRoutesNav = l;
			}
		}

		if(!searchRoutesNav){
			throw new Error('!searchRoutesNav');
		}

		await expect(searchRoutesNav).toHaveScreenshot('search routes navigation.png');
	});
	
	//NineRandomTiles component can't be snapshoted.
});
