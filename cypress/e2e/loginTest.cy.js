describe('login_page', function () {
  beforeEach(() => {
    cy.visit("http://localhost:3000")
  })
  
  it('frontpage can be opened', () => {    
    cy.contains("Bienvenido")
  })

  it('user can login', () => {    
    cy.get('[name="email"]').type('admin@gmail.com')
    cy.get('[name="password"]').type('Admin123')
    cy.get('[type="submit"]').click()
    cy.contains('Clip')
  })
})
