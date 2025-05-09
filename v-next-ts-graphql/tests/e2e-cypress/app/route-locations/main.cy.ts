/*

/locations
tik-tik pagination
click location
see tile
go back
tik-tik pagination
click location
see tile
go back
input Abadango in Name
apply
see abadango name in results
clear form
input dimension=d&type=c&name=f in form
apply
see tiles with
	f in name
	d in dimension
	c in type

new test\new tab
go to /locations?name=Abadango
see abadango name in results

new test\new tab
go to /locations?dimension=d&type=c&name=f
check form
check tiles


*/

describe('Main functionality', () => {
	it(`checks a user expected behavior`, () => {
		cy.visit('http://localhost:3000/');

		
	})
})
