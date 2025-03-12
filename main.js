const createTaskInputElement = document.querySelector('[data-js-create-task-input]')
const createTaskButtonElement = document.querySelector('[data-js-create-task-button]')
const todoListElement = document.querySelector('[data-js-todo-list]')

// let testTasks = []

// for (let i = 0; i < 100; i++) {
//   const task = {}
//   task.content = i
//   task.isChecked = false
//   testTasks.push(task)
// }

// localStorage.setItem('tasks', JSON.stringify(testTasks))

let tasks
!localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks') )

for (let task of tasks) {
  addTodoItem(task.content, task.isChecked)
}

function addTodoItem(taskMessage, isChecked = false) {
  const newTaskMarkup = `
        <li class="todo__item task shadow-block ${isChecked ? 'checked': ''}" data-js-todo-item>
        <input class="task__checkbox custom-checkbox" type="checkbox" data-js-task-checkbox ${isChecked ? 'checked': ''}>
        <span class="task__content" data-js-todo-content>${taskMessage}</span>
        <button class="task__delete-button button" type="button" aria-label="Delete task" title="Delete task" data-js-task-delete-button></button>
    </li>`

  todoListElement.insertAdjacentHTML("afterbegin", newTaskMarkup)    
}

function createTaskEvent() {
  const taskMessage = createTaskInputElement.value

  if(!taskMessage) {
    return
  }

  addTodoItem(taskMessage)
  createTaskInputElement.value = ''
  updateStorage()
}

// События создания новой задачи
createTaskButtonElement.addEventListener('click', createTaskEvent)
createTaskInputElement.addEventListener('keydown', (event) => {
  if (event.code === "Enter" || event.code === 'NumpadEnter') {
    event.preventDefault()
    createTaskEvent()
  }
})

// События удаления и выполнения задачи
todoListElement.addEventListener('click', (event) => {
  const todoItemElement = event.target.closest('[data-js-todo-item]')
  const deleteButtonElement = event.target.closest('[data-js-task-delete-button]')
  
  if (deleteButtonElement) {
    todoItemElement.remove()
  }
  else if (todoItemElement) {
    todoItemElement.querySelector('[data-js-task-checkbox]').checked = false
    todoItemElement.classList.toggle('checked')

    if (todoItemElement.classList.contains('checked')) {
      todoItemElement.querySelector('[data-js-task-checkbox]').checked = true
    }
    
  }
  updateStorage()
})

function updateStorage() {
  tasks = []
  for (let i = 0; i < todoListElement.childElementCount; i++) {
    const task = {}
    task.content = todoListElement.children[i].querySelector('[data-js-todo-content]').textContent
    task.isChecked = todoListElement.children[i].classList.contains('checked')
    tasks.push(task)
  }
  localStorage.setItem('tasks', JSON.stringify(tasks))
}




