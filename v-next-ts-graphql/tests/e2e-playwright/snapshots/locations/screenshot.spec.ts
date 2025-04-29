import { test, expect } from '@playwright/test';



test.describe('locations-snapshot', () => {
	test('home-full-screenshot', async ({ page }) => { 
		await page.goto('localhost:3000/locations'); 
	
		await expect(page).toHaveScreenshot('screenshot.png');
	}); 
	
	test('locations-header-screenshot', async ({ page }) => { 
		await page.goto('localhost:3000/'); 
	
		await expect(page.locator('header')).toHaveScreenshot('header-screenshot.png');
	}); 

	//NineRandomTiles component can't be snapshoted.
});
