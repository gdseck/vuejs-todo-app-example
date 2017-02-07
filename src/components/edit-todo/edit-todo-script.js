import Vue from 'vue'

export default Vue.component('todo-item', {
  props: ['todo', 'index', 'value'],
  methods: {
    focus: function () {
      this.$refs.todoInput.focus()
      this.$refs.todoInput.select()
    }
  }
})
