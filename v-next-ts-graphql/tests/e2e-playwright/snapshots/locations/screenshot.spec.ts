import { test, expect } from '@playwright/test';



test.describe('locations-snapshot', () => {

	const params = '?type=Planet'

	test('full page screenshot without params and with params', async ({ page }) => { 
		await page.goto('localhost:3000/locations'); 
	
		await expect(page).toHaveScreenshot('full page without params.png');
		
		await page.goto('localhost:3000/locations' + params); 
		
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
			const div = l.locator(`div.search--width.d-flex.jc-space-between.fd-column`)
			if(
				await div.count()
				&& await div.getByTitle('locations').count()
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
			const div = l.locator(`div.search--width.d-flex.jc-space-between.fd-column`)
			if(
				await div.count()
				&& await div.getByTitle('locations').count()
			){
				locationsFilter = l;
			}
		}

		if(!locationsFilter){
			throw new Error('!locationsFilter');
		}

		await expect(locationsFilter).toHaveScreenshot('locations filter with params.png');
	});

	test('locations results without params before and after', async ({ page }) => { 
		await page.goto('localhost:3000/locations'); 

		let locationsFilter;
		for(const l of await page
				.locator('div.margin-10.w-100.d-flex.jc-center')
				.all()
		){
			const div = l.locator(`div.search--width.d-flex.jc-space-between.fd-column`)
			if(
				await div.count()
				&& await div.getByTitle('locations').count()
			){
				locationsFilter = l;
			}
		}

		if(!locationsFilter){
			throw new Error('!locationsFilter');
		}

		await expect(locationsFilter).toHaveScreenshot('locations filter with params.png');
	});
	
});
