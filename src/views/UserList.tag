<r-list>

  <div class="list">
    <a href="#!/edit/{ id }" class="list__item" each={ list } key={ id }>{ firstName } { lastName }</a>
  </div>

  <style type="plain">
    .list {
      list-style: none;
      margin: 0 0 10px;
      padding: 0;
    }
    .list__item {
      background: #fafafa;
      border: 1px solid #ddd;
      color: #333;
      display: block;
      margin: 0 0 1px;
      padding: 8px 15px;
      text-decoration: none;
    }
    .list__item:hover {
      text-decoration: underline;
    }
  </style>

  <script>
    this.on('update', () => this.list = this.user.list)
    this.user.one('updated', this.update)
    this.user.getUsers()
  </script>

</r-list>