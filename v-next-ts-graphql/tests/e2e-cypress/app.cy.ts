describe('Navigation', () => {
  it('should navigate to the about page', () => {
    cy.visit('http://localhost:3000/')
 
    cy.get('a[href*="locations"]').click()
 
    cy.url().should('include', '/locations')
  })
})
