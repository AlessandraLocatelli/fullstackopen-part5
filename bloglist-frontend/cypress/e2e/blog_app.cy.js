
describe('Blog ', function () {

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'react',
      username: 'reactuser',
      password: 'reaus'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user) 
    cy.visit('http://localhost:5173')
  })

  it('login form is shown', function () {
    cy.contains('username')
    cy.contains('password')
  })

  it('fails with wrong credentials', function() {
   
    cy.contains('login').click()
    cy.get('input[name="username"]').type('reactt')
    cy.get('input[name="password"]').type('react')
    cy.contains('login').click()
    cy.get('.error')
    .should('contain', 'wrong username or password')
    .and('have.css', 'color', 'rgb(255, 0, 0)')
    .and('have.css', 'border-style', 'solid')
    cy.get('html').should('not.contain', 'superoot logged in')
  })

  it('succeeds with correct credentials', function () {
   
    cy.contains('login').click()
    cy.get('input[name="username"]').type('reactuser')
    cy.get('input[name="password"]').type('reaus')
    cy.contains('login').click()
    cy.contains('react logged in')
  })

  describe('when logged in', function () {
    
    beforeEach(function() {
      cy.login({ username: 'reactuser', password: 'reaus' })
    })

    it('a new note can be created', function() {
     
      cy.contains('new blog').click()
      cy.get('input[name="title"]').type('a blog created by cypress')
      cy.get('input[name="author"]').type('cypress')
      cy.get('input[name="url"]').type('https//:cypress.com')
      cy.contains('save').click()

      cy.contains('a blog created by cypress')
      cy.contains('log out').click()
     
      
    })

    it('users can like a blog', function() {
      cy.login({ username: 'reactuser', password: 'reaus' })
      cy.contains('new blog').click()
      cy.get('input[name="title"]').type('a blog created by cypress')
      cy.get('input[name="author"]').type('cypress')
      cy.get('input[name="url"]').type('https//:cypress.com')
      cy.contains('save').click()

      cy.contains('a blog created by cypress')

      cy.contains('details').click()
      cy.contains('likes').click()
      cy.get('html').contains('likes:1')
      cy.contains('log out').click()
     
    })
    
    it('creator can delete a blog', function() {
      

      cy.contains('new blog').click()
      cy.get('input[name="title"]').type('a blog created by cypress')
      cy.get('input[name="author"]').type('cypress')
      cy.get('input[name="url"]').type('https//:cypress.com')
      cy.contains('save').click()

      cy.contains('a blog created by cypress')

      cy.contains('details').click()
      cy.contains('remove').click()
      
      cy.get('html').should('not.contain','a blog created by cypress')
      cy.contains('log out').click()
    })

    it.only('a user who has not created the blog does not see delete button', function () {

      const user = {
        name: 'nodejs',
        username: 'node',
        password: 'nodeaus'
      }
      cy.request('POST', 'http://localhost:3003/api/users/', user)
      cy.login({ username: 'node', password: 'nodeaus' })
     

      cy.get('html').should('not.contain', 'a blog created by cypress')

    })

    it('blogs are ordered according to likes', function() {
    
      

      cy.contains('new blog').click()
      cy.get('input[name="title"]').type('a blog created by cypress')
      cy.get('input[name="author"]').type('cypress')
      cy.get('input[name="url"]').type('https//:cypress.com')
      cy.contains('save').click()

      cy.contains('a blog created by cypress')
     

      
      cy.get('input[name="title"]').type('new cypress blog')
      cy.get('input[name="author"]').type('cypress')
      cy.get('input[name="url"]').type('https//:cypress.com')
      cy.contains('save').click()
      cy.contains('a blog created by cypress')
      cy.contains('new cypress blog')
      
      
      cy.get('.blog').eq(0).should('contain', 'a blog created by cypress')
      cy.get('.blog').eq(1).should('contain', 'new cypress blog')
     
    
    
    })

   })
})