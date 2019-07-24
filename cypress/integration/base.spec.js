describe('Testing the text filtering', () => {
  it('Sorts, adds to cart, checks out', () => {
    // Create a function stub to confirm that the alert pops up
    const stub = cy.stub()

    cy.on('window:alert', stub)
      .visit('/')
      .get('div.shelf-item').should('have.length', 16)
      .get('span').contains('M').click()
      .get('div.shelf-item').should('have.length', 1)
      .get('div').contains('Add to cart').click()
      .get('p.sub-price__val').should('contain', '$ 29.45')
      .get('div').contains('Checkout')
      .click().then(() => expect(stub.getCall(0)).to.be.calledWith('Checkout - Subtotal: $ 29.45'))
  })

  it('Does all of the above, but with a fixture!', () => {
    // Mock our products call
    cy.fixture('products').as('products')
    cy.server().route('/products.json', '@products')
    // Rest of the code is the same as above except with new result
    const stub = cy.stub()

    cy.on('window:alert', stub)
      .visit('/')
      .get('div.shelf-item').should('have.length', 1)
      .get('span').contains('M').click()
      .get('div.shelf-item').should('have.length', 1)
      .get('div').contains('Add to cart').click()
      .get('p.sub-price__val').should('contain', '$ 666.00')
      .get('div').contains('Checkout')
      .click().then(() => expect(stub.getCall(0)).to.be.calledWith('Checkout - Subtotal: $ 666.00'))
  })

  it('Is ok when there\'s nothing there', () => {
    // Mock an empty response
    cy.server().route('/products.json', { products: []})

    // Expect an empty page
    cy.visit('/').get('span').contains('0 Product(s) found.')
  })
})