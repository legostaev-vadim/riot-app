<r-form>

  <form class="form">
    <label class="form__label">First name</label>
    <input type="text" class="form__input" oninput={ inputValue } data-name="firstName" placeholder="First name" value="{ firstName }">
    <label class="form__label">Last name</label>
    <input type="text" class="form__input" oninput={ inputValue } data-name="lastName" placeholder="Last name" value="{ lastName }">
    <button class="form__btn form__btn--create" onclick={ clickButton } data-method="createUser">Create</button>
    <button class="form__btn form__btn--delete" onclick={ clickButton } data-method="deleteUser">Delete</button>
    <button class="form__btn form__btn--update" onclick={ clickButton } data-method="updateUser">Update</button>
  </form>

  <style type="plain">
    .form__label {
      display: inline-block;
      margin: 0 0 5px;
    }
    .form__input {
      border: 1px solid #ddd;
      border-radius: 3px;
      box-sizing: border-box;
      display: block;
      margin: 0 0 10px;
      padding: 10px 15px;
      width: 100%;
    }
    .form__btn {
      background: #ddd;
      border: 1px solid #ddd;
      border-radius: 3px;
      color: #fff;
      cursor: pointer;
      display: inline-block;
      margin-top: 20px;
      padding: 10px 15px;
      text-decoration: none;
    }
    .form__btn--create {
      background: #41BA5E;
    }
    .form__btn--delete {
      background: #FF0044;
    }
    .form__btn--update {
      background: #0B77B3;
    }
    .form__btn:hover {
      background: #ddd;
      color: #222;
    }
  </style>

  <script>
    clickButton(e) {
      e.preventDefault()
      e.preventUpdate = true
      this.user[e.target.dataset.method]()
    }

    inputValue(e) {
      e.preventUpdate = true
      this.user.current[e.target.dataset.name] = e.target.value
    }

    this.on('update', () => {
      this.firstName = this.user.current.firstName
      this.lastName = this.user.current.lastName
    })

    this.on('route', (id) => this.user.getUser(id))
    this.user.one('updated', this.update)
    this.user.one('home', () => this.route('list'))
  </script>

</r-form>