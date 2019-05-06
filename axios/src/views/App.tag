<app>

  <header data-is="r-header"></header>
  
  <main data-is="router">
    <route path="list"><r-list /></route>
    <route path="edit/*"><r-form /></route>
  </main>

  <footer data-is="r-footer"></footer>

  <style type="plain">
    :scope {
      display: flex;
      flex-direction: column;
      font: normal 16px Verdana;
    }
    main {
      margin-bottom: 20px;
      padding: 0 15px;
    }
  </style>

</app>