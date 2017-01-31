import Vue from 'vue'
import TodoItem from '../todo-item/index.vue'

export default Vue.component('todo-list', {
  props: ['todos', 'status'],
  components: {
    'todo-item': TodoItem
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
    edit: function (index) {
      let self = this
      this.$emit('edit', index)
      Vue.nextTick(function () {
        self.$refs.todoInput[0].focus()
        self.$refs.todoInput[0].select()
      })
    },
    save: function (index) {
      this.$emit('save', index)
    }
  }
})