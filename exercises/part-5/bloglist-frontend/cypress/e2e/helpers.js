const addDummyData = () => {
  // Log in with test user
  cy.request('POST', 'http://localhost:3003/api/login/', {
    username: 'testUsername',
    password: 'testPassword'
  }).then(response => {
    const testUser = response.body

    // Add blog
    cy.request({
      method: 'POST',
      url: 'http://localhost:3003/api/blogs',
      headers: {
        Authorization: `Bearer ${testUser.token}`
      },
      body: {
        title: 'Test title 1',
        author: 'Test author 1',
        url: 'Test url 1'
      }
    })
  })

  // Create nugget user
  cy.request('POST', 'http://localhost:3003/api/users/', {
    name: 'Nugget',
    username: 'nugget',
    password: 'nugget'
  })

  // Log in with nugget user
  cy.request('POST', 'http://localhost:3003/api/login/', {
    username: 'nugget',
    password: 'nugget'
  }).then(response => {
    const nuggetUser = response.body

    // Add blog
    cy.request({
      method: 'POST',
      url: 'http://localhost:3003/api/blogs',
      headers: {
        Authorization: `Bearer ${nuggetUser.token}`
      },
      body: {
        title: 'Nugget title 1',
        author: 'Nugget author 1',
        url: 'Nugget url 1'
      }
    })
  })
}

export const setupDatabase = () => {
  // Empty the database
  cy.request('POST', 'http://localhost:3003/api/testing/reset')

  // Create a new user
  const user = {
    name: 'Test Name',
    username: 'testUsername',
    password: 'testPassword'
  }
  cy.request('POST', 'http://localhost:3003/api/users/', user)

  // Add dummy data
  addDummyData()
}