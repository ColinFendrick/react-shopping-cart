describe('Testing the text filtering', () => {
  it('Sorts, adds to cart, checks out', () => {
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
    // Stub our products call
    cy.server().fixture('products').as('productsJSON')
      .route('/products.json', '@productsJSON')
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
})