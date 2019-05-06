import axios from 'axios'
axios.defaults.withCredentials = true

export default class {

  constructor(riot) {
    this.list = []
    this.current = {}
    riot.observable(this)
  }

  getUsers() {
    axios.get('https://rem-rest-api.herokuapp.com/api/users?limit=100')
      .then(response => {
        this.list = response.data.data
        this.trigger('updated')
      })
  }

  getUser(id) {
    axios.get('https://rem-rest-api.herokuapp.com/api/users/' + id)
      .then(response => {
        this.current = response.data
        this.trigger('updated')
      })
  }

  createUser() {
    axios.post('https://rem-rest-api.herokuapp.com/api/users/', this.current)
      .then(response => this.trigger('home'))
  }

  deleteUser() {
    axios.delete('https://rem-rest-api.herokuapp.com/api/users/' + this.current.id)
      .then(response => this.trigger('home'))
  }

  updateUser() {
    axios.put('https://rem-rest-api.herokuapp.com/api/users/' + this.current.id, this.current)
      .then(response => this.trigger('home'))
  }

}