import Vue from 'vue'

export default Vue.component('todo-item', {
  props: ['todo', 'index', 'value'],
  methods: {
    updateTodo: function (value) {
      this.$emit('input', value)
    },
    toggleCompleted: function (index) {
      this.$emit('toggleCompleted', index)
    },
    edit: function (index) {
      this.$emit('edit', index)
    }
  }
})
