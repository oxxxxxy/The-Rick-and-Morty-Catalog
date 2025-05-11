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

const sumStringChars = (str: string): number => { 
  const buf = Buffer.from(str); 
  
  let sum = 0; 
  for (let i = 0; i < buf.length; i++) { 
    sum += buf[i]; 
  } 

  return sum; 
} 


describe('Main functionality', () => {
	it(`checks a user expected behavior`, () => {
		cy.visit('http://localhost:3000/');

		cy.get('[title="Search locations"]').click();

		cy.url({timeout: 2000}).should('to.match', /00\/locations$/);

		cy.get('div.d-flex.pagination').should('have.length', 1);
		
		cy.get('div.d-flex.pagination').children().eq(1).click();
		
		cy.url({timeout: 2000}).should('to.match', /00\/locations\?p=2$/);
		
		cy.get('div.d-flex.pagination').children().then(children => {
			const domChildren = children.toArray();

			let index = 0;
			
			for(let i = 0; i < domChildren.length; i++){
				if(domChildren[i].textContent === '4'){
					index = i;
				}
			}

			cy.get('div.d-flex.pagination').children().eq(index).click();
		
			cy.url({timeout: 2000}).should('to.match', /00\/locations\?p=4$/);
		});


		cy.get('div.main--font-size.color--b6b6b6.d-flex.ai-center.fd-column[style="margin-top: 25px;"]')
		.invoke('html').then(html => {
			const resultsInHTMLOfLocations_pEqual4_before = html;

			cy.get('div.tile-box').eq(0).children().then(children => {
				const domChildren = children.toArray();

				const match = domChildren[0].getAttribute('href').match(/tions\/([0-9]+)/);

				if(!match){
					throw new Error('!match');
				}

				const id = match[1];
			
				cy.get('div.tile-box').eq(0).click(40, 40)

				cy.url({timeout: 2000}).should('to.match', new RegExp(`00/locations/${id}`));
				
			})


			cy.go('back');

			cy.url({timeout: 2000}).should('to.match', /00\/locations\?p=4$/);

			cy.get('div.main--font-size.color--b6b6b6.d-flex.ai-center.fd-column[style="margin-top: 25px;"]')
			.invoke('html').then(html => {
				const resultsInHTMLOfLocations_pEqual4_after = html;

				expect(
					sumStringChars(resultsInHTMLOfLocations_pEqual4_before)
				).to.equal(
					sumStringChars(resultsInHTMLOfLocations_pEqual4_after)
				);

			})
		})


		
	})
})
