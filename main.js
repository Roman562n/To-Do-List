const createTaskInputElement = document.querySelector('[data-js-create-task-input]')
const createTaskButtonElement = document.querySelector('[data-js-create-task-button]')
const todoListElement = document.querySelector('[data-js-todo-list]')

localStorage.setItem('tasks', '[{"content": "Some task", "isChecked": true}]')

let dataAttCount = 0
let tasks

!localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks') )

for (let task of tasks) {
  addTodoItem(task.content, task.isChecked)
}

function addTodoItem(taskMessage, isChecked = false) {
  const newTaskMarkup = `
        <li class="todo__item task shadow-block ${isChecked ? 'checked': ''}" data-js-todo-item="${dataAttCount}">
        <input class="task__checkbox custom-checkbox" type="checkbox" data-js-task-checkbox ${isChecked ? 'checked': ''}>
        <span class="task__content" data-js-todo-content>${taskMessage}</span>
        <button class="task__delete-button button" type="button" aria-label="Delete task" title="Delete task" data-js-task-delete-button></button>
    </li>`

  todoListElement.insertAdjacentHTML("afterbegin", newTaskMarkup)    
  updateStorage(dataAttCount, taskMessage, isChecked)
  dataAttCount++
}

function createTaskEvent() {
  console.log(createTaskInputElement.value)
  const taskMessage = createTaskInputElement.value

  if(taskMessage === '') {
    return
  }

  addTodoItem(taskMessage)
  createTaskInputElement.value = ''
  updateStorage()
}

createTaskButtonElement.addEventListener('click', createTaskEvent)
createTaskInputElement.addEventListener('keydown', (event) => {
  if (event.code === "Enter" || event.code === 'NumpadEnter') {
    event.preventDefault()
    createTaskEvent()
  }
})

todoListElement.addEventListener('click', (event) => {
  const todoItemElement = event.target.closest('[data-js-todo-item]')
  const deleteButtonElement = event.target.closest('[data-js-task-delete-button]')

  if (deleteButtonElement) {
    console.log(todoItemElement)
    todoItemElement.remove()
  }
  else if (todoItemElement) {
    todoItemElement.querySelector('[data-js-task-checkbox]').checked = false
    console.log(event.target)
    todoItemElement.classList.toggle('checked')

    if (todoItemElement.classList.contains('checked')) {
      todoItemElement.querySelector('[data-js-task-checkbox]').checked = true
    }
    
  }
})

function updateStorage(index, message, isChecked = false) {
  const task = {}

  task.content = message
  task.isChecked = isChecked

  tasks[index] = task
  console.log(tasks)
}




// function removeTask(element) {
//   element.remove()
// }

// todoListElement.addEventListener('click', (event) => {
//   const todoItemElement = event.target.closest('[data-js-todo-item]')
//   const deleteButtonElement = event.target.closest('[data-js-task-delete-button]')

//   if (deleteButtonElement) {
//     removeTask(todoItemElement)
//   }
//   else if (todoItemElement) {
//     todoItemElement.querySelector('[data-js-task-checkbox]').checked = false
//     console.log(event.target)
//     todoItemElement.classList.toggle('checked')

//     if (todoItemElement.classList.contains('checked')) {
//       todoItemElement.querySelector('[data-js-task-checkbox]').checked = true
//     }
    
//   }
// })

// const taskCheckboxElements = todoListElement.querySelectorAll('[data-js-task-checkbox]')

// function addTodoItem() {
//   const taskMessage = createTaskInputElement.value
//   if (taskMessage === '') {
//     return
//   }

//   const newTaskMarkup = `
//     <li class="todo__item task shadow-block" data-js-todo-item>
//       <input class="task__checkbox custom-checkbox" type="checkbox" data-js-task-checkbox>
//       <span class="task__content">${taskMessage}</span>
//       <button class="task__delete-button button" type="button" aria-label="Delete task" title="Delete task" data-js-task-delete-button></button>
//     </li>`

//   todoListElement.insertAdjacentHTML("afterbegin", newTaskMarkup)
//   createTaskInputElement.value = ''
// }

// createTaskButtonElement.addEventListener('click', addTodoItem)

// createTaskInputElement.addEventListener('keydown', (event) => {
//   if (event.code === "Enter") {
//     event.preventDefault()
//     addTodoItem()
//   }
// })





