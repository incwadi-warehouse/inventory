describe('Test Home', () => {
  it('Show home', () => {
    cy.visit('/')
    cy.get('input[type=search]')
  })
})
