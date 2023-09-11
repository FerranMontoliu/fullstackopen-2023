import { setupDatabase } from './helpers.js'

describe('Blog app', function () {
  beforeEach(function () {
    setupDatabase()

    // Go to the webpage
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function () {
    // Click on the button to open the log in form
    cy.contains('Log in').click()

    // Check that the log in form is displayed
    cy.get('#username')
    cy.get('#password')
    cy.contains('login')
    cy.contains('Cancel')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      // Click on the button to open the log in form
      cy.contains('Log in').click()

      // Log into the platform with correct credentials
      cy.get('#username').type('testUsername')
      cy.get('#password').type('testPassword')
      cy.get('#login-button').click()

      // Check that the user is logged in
      cy.contains('Test Name logged in')
    })

    it('fails with wrong credentials', function () {
      // Click on the button to open the log in form
      cy.contains('Log in').click()

      // Log into the platform with incorrect credentials
      cy.get('#username').type('testUsername')
      cy.get('#password').type('this is a wrong password')
      cy.get('#login-button').click()

      // Check that the error notification appeared
      cy.get('.error')
        .should('contain', 'Invalid username or password.')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      // Check that the user is not logged in
      cy.get('html').should('not.contain', 'Test Name logged in')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      // Click on the button to open the log in form
      cy.contains('Log in').click()

      // Log into the platform
      cy.get('#username').type('testUsername')
      cy.get('#password').type('testPassword')
      cy.get('#login-button').click()

      // Check that the user is logged in
      cy.contains('Test Name logged in')
    })

    it('a blog can be created', function () {
      // Check that there are 2 blogs in the blog list
      cy.get('.blog-list--container')
        .children('.blog--container')
        .should('have.length', 2)

      // Click on the button to open the blog creation form
      cy.contains('Create new blog').click()

      // Create a blog
      cy.get('.create-blog-form--title-input').type('Test title')
      cy.get('.create-blog-form--author-input').type('Test author')
      cy.get('.create-blog-form--url-input').type('Test url')
      cy.get('.create-blog-form--submit-btn').click()

      // Check that the info notification appeared
      cy.get('.info')
        .should('contain', 'A new blog \'Test title\' by \'Test author\' added')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
        .and('have.css', 'border-style', 'solid')

      // Check that the blog was added to the blog list
      cy.get('.blog-list--container')
        .children('.blog--container')
        .should('have.length', 3)
    })

    it('a blog can be liked', function () {
      // Check that there are 2 blogs in the blog list
      cy.get('.blog-list--container')
        .children('.blog--container')
        .should('have.length', 2)

      // Get first blog, expand it, and like it
      cy.get('.blog--container')
        .contains('View')
        .click()
      cy.get('.blog--container')
        .get('.blog--expanded')
        .get('.blog--like-btn')
        .click()

      // Check that the number of likes increased
      cy.get('.blog--container')
        .get('.blog--expanded')
        .contains('Likes 1')
    })

    it('owner of blog can remove it', function () {
      // Check that there are 2 blogs in the blog list
      cy.get('.blog-list--container')
        .children('.blog--container')
        .should('have.length', 2)

      // Get own blog, and expand it
      cy.get('.blog--container')
        .contains('Test title 1')
        .contains('View')
        .click()

      // Remove blog
      cy.get('.blog--container')
        .contains('Test title 1')
        .get('.blog--remove-btn')
        .click()

      // Confirm removal of blog
      cy.on('window:confirm', () => true)

      // Check that there is 1 blog in the blog list
      cy.get('.blog-list--container')
        .children('.blog--container')
        .should('have.length', 1)

      // Check that the blog we removed is not there
      cy.get('.blog--container')
        .contains('Test title 1')
        .should('not.exist')
    })

    it('non-owner of blog cannot remove it', function () {
      // Check that there are 2 blogs in the blog list
      cy.get('.blog-list--container')
        .children('.blog--container')
        .should('have.length', 2)

      // Get non-owned blog, and expand it
      cy.get('.blog--container')
        .contains('Nugget title 1')
        .contains('View')
        .click()

      // Make sure the remove button is not there
      cy.get('.blog--container')
        .contains('Nugget title 1')
        .get('.blog--remove-btn')
        .should('not.exist')
    })

    it('blogs are sorted by number likes DESC', function () {
      // Check that there are 2 blogs in the blog list
      cy.get('.blog-list--container')
        .children('.blog--container')
        .should('have.length', 2)

      // Get Nugget blog, expand it, like it twice, and hide it again
      cy.get('.blog--container')
        .contains('Nugget title 1')
        .contains('View')
        .click()
      cy.contains('Likes 0')
      cy.get('.blog--container')
        .contains('Nugget title 1')
        .get('.blog--like-btn')
        .click()
      cy.contains('Likes 1')
      cy.get('.blog--container')
        .contains('Nugget title 1')
        .get('.blog--like-btn')
        .click()
      cy.contains('Likes 2')
      cy.get('.blog--container')
        .contains('Nugget title 1')
        .contains('Hide')
        .click()

      // Get Test blog, expand it, like it once, and hide it again
      cy.get('.blog--container')
        .contains('Test title 1')
        .contains('View')
        .click()
      cy.contains('Likes 0')
      cy.get('.blog--container')
        .contains('Test title 1')
        .get('.blog--like-btn')
        .click()
      cy.contains('Likes 1')
      cy.get('.blog--container')
        .contains('Test title 1')
        .contains('Hide')
        .click()

      // Check that the blogs are sorted in the correct way
      cy.get('.blog--container')
        .eq(0)
        .should('contain', 'Nugget title 1')
      cy.get('.blog--container')
        .eq(1)
        .should('contain', 'Test title 1')
    })
  })
})