import * as riot from 'riot'
import route from 'riot-route'
import observable from 'riot-observable'
import User from './models/user'
import App from './views/app.riot'
import 'normalize.css/normalize.css'
import './sass/styles.scss'

route.start(true)
route.base('#!/')
route('list')

riot.install(function(component) {
  component.route = route
  component.user = new User(observable)
})

riot.component(App)(document.getElementById('app'))