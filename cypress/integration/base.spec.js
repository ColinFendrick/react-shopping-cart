describe('Testing the text filtering', () => {
  beforeEach(() =>
    cy.visit('/')
  )
  it('Filters will all, some, none', () => {
    cy.get('ul.pokemons li.pokemons__item')
      .should('have.length', 784)
      .get('input[placeholder="Enter pokemon name..."]')
      .type('saur')
      .get('ul.pokemons li.pokemons__item')
      .should('have.length', 3)
      .get('input[placeholder="Enter pokemon name..."]')
      .type('{selectall}{backspace}zzzzzzz')
      .get('ul.pokemons li.pokemons__item')
      .should('have.length', 0)
  })

  it('Does stuff', () => {
    expect(true).to.equal(true)
  })
})
