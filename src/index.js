var Vue = require('vue')
window.Vue = Vue
import App from './components/app/app.vue'

const vm = new Vue({
  el: '#app',
  name: 'app',
  components: {
    'app': App
  },
  created: function () {
    console.log('App created')
  },
  render: h => h('app')
})

vm.$watch('data.todo', function (newVal, oldVal) {
  if (newVal !== '') {
    this.data.showError = false
  }
})
