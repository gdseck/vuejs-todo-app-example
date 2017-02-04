<template>
  <div class='page'>
    <p>
      <input
        class='input'
        v-model='todo'
        v-on:keyup.enter='addTodo'
        v-on:input='resetErrors'
        placeholder='New todo...'
      />
      <div class='status-bar'>
        <a
          href='#'
          class='status'
          v-on:click='toggleTodos("")'
          v-bind:class='[status === "" ? "active" : ""]'
        >all</a>
        <a
          href='#'
          class='status'
          v-on:click='toggleTodos("active")'
          v-bind:class='[status === "active" ? "active" : ""]'
        >active</a>
        <a
          href='#'
          class='status'
          v-on:click='toggleTodos("completed")'
          v-bind:class='[status === "completed" ? "active" : ""]'
        >completed</a>
      </div>
      <div v-if='error' class='error'>
        Todo cannot be empty
      </div>
    </p>
    <todo-list
      :todos='todos'
      :status='status'
      v-on:edit='edit'
      v-on:save='save'
      v-on:toggleCompleted='toggleCompleted'
    />
  </div>
</template>

<script>
  import Vue from 'vue'
  import TodoList from '../todo-list/index.vue'

  const ACTIVE = 'active'
  const COMPLETED = 'completed'

  export default Vue.component('app', {
    components: {
      'todo-list': TodoList
    },
    data: function () {
      return {
        todo: ``,
        todos: [
          { title: 'learn Vue', status: ACTIVE, editing: true },
          { title: 'learn React', status: COMPLETED, editing: false },
          { title: 'learn Angular', status: ACTIVE, editing: false },
          { title: 'learn Meteor', status: ACTIVE, editing: false },
          { title: 'learn RxJS', status: ACTIVE, editing: false }
        ],
        error: false,
        status: ''
      }
    },
    methods: {
      addTodo: function () {
        if (this.todo === '') {
          this.showError = true
          return
        }

        this.showError = false
        this.todos = this.todos.concat({
          title: this.todo,
          status: ACTIVE
        })

        this.todo = ''
      },
      resetErrors: function (e) {
        if (this.showError === true && e.target.value) {
          this.showError = false
        }
      },
      toggleTodos: function (status) {
        this.status = status
      },
      edit: function (index, current) {
        let self = this
        let todos = this.todos.slice(0)
        todos[index].editing = true
        this.todos = todos.map((todo, i) => {
          if (index === i) {
            return Object.assign({}, todo, {
              editing: !current
            })
          }

          return Object.assign({}, todo, {
            editing: false
          })
        })
      },
      save: function (index) {
        let todos = this.todos.slice(0)
        todos[index].editing = false
        this.todos = todos
      },
      toggleCompleted: function (index) {
        let todos = this.todos.slice(0)

        if (todos[index].status === COMPLETED) {
          todos[index].status = ACTIVE
          return
        }

        todos[index].status = COMPLETED
      }
    }
  })
</script>

<style>
  .page {
    width: 30%;
    min-width: 25rem;
    margin: 0 auto;
    top: 2rem;
    position: relative;
    border: 1px solid;
    padding: 1rem;
    box-shadow: 1px 1px 1px 1px rgba(0,0,0,0.8);
    background: #fff;
  }

  .status-bar {
    height: 2rem;
    line-height: 2rem;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-around;
  }

  .status {
    text-decoration: none;
    color: inherit;
    width: 33.3%;
    border: none;
    text-align: center;
    color: #0f0d27;
    background: #dde2e6;
  }

  .status:hover {
    background-color: #346392;
    color: #fff;
  }

  .status.active {
    background-color: #27496d;
    color: #fff;
    text-shadow: -1px 1px #193047;
  }

  .input {
    width: 100%;
    line-height: 2rem;
    border: none;
    border-bottom: 2px solid;
    font-size: 20px;
    padding-left: 3px;
    transition: border 0.4s;
    text-align: center;
  }

  .input:focus {
    border: none;
    border-bottom: 2px solid #417cb8;
    outline: none;
  }

  p {
    margin-top: 0;
  }
</style>
