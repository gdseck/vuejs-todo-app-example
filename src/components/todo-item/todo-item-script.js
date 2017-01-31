import Vue from 'vue'

export default Vue.component('todo-item', {
  props: ['todo', 'index', 'value'],
  methods: {
    updateTodo: function (value) {
      this.$emit('input', value)
    },
    completed: function (index) {
      this.$emit('completed', index)
    }
  }
})
