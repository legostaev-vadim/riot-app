export default class User {

  constructor(riot) {
    this.list = []
    this.current = {}
    riot.observable(this)
  }

  getUsers() {
    fetch('https://rem-rest-api.herokuapp.com/api/users?limit=100', {
      method: 'GET',
      credentials: 'include'
    })
      .then(response => response.json())
      .then(result => {
        this.list = result.data
        this.trigger('updated')
      })
  }

  getUser(id) {
    fetch('https://rem-rest-api.herokuapp.com/api/users/' + id, {
      method: 'GET',
      credentials: 'include'
    })
      .then(response => response.json())
      .then(result => {
        this.current = result
        this.trigger('updated')
      })
  }

  createUser() {
    fetch('https://rem-rest-api.herokuapp.com/api/users/', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(this.current)
    })
    .then(response => this.trigger('home'))
  }

  deleteUser() {
    fetch('https://rem-rest-api.herokuapp.com/api/users/' + this.current.id, {
      method: 'DELETE',
      credentials: 'include'
    })
    .then(response => this.trigger('home'))
  }

  updateUser() {
    fetch('https://rem-rest-api.herokuapp.com/api/users/' + this.current.id, {
      method: 'PUT',
      credentials: 'include',
      body: JSON.stringify(this.current)
    })
    .then(response => this.trigger('home'))
  }
  
}