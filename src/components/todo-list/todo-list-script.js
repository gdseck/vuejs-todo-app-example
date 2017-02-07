import Vue from 'vue'
import TodoItem from '../todo-item/index.vue'
import EditTodo from '../edit-todo/index.vue'

export default Vue.component('todo-list', {
  props: ['todos', 'status'],
  components: {
    'todo-item': TodoItem,
    'edit-todo': EditTodo
  },
  computed: {
    isEditing: {
      get: function () {
        return this.todos.map(todo => todo.editing)
      }
    },
    hasStatus: {
      get: function () {
        return this.todos.map(todo => {
          if (this.status === '') {
            return true
          }

          if (todo.status === this.status) {
            return true
          }

          return false
        })
      }
    }
  },
  methods: {
    updateTodo: function (value) {
      this.$emit('input', value)
    },
    edit: function (index, editing) {
      this.$emit('edit', index, editing)
    },
    save: function (index) {
      this.$emit('save', index)
    }
  }
})
