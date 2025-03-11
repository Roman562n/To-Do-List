const createTaskInputElement = document.querySelector('[data-js-create-task-input]')
const createTaskButtonElement = document.querySelector('[data-js-create-task-button]')
const todoListElement = document.querySelector('[data-js-todo-list]')

function addTodoItem() {
  const taskMessage = createTaskInputElement.value
  if (taskMessage === '') {
    return
  }
  const newTaskMarkup = 
  `<li class="todo__item" data-js-task-item>
    <div class="todo__task task shadow-block">
      <label class="task__label">
        <input class="task__checkbox custom-checkbox" type="checkbox">
        <span class="task__content">${taskMessage}</span>
      </label>
      <button class="task__delete-button button" type="button" aria-label="Delete task" title="Delete task" data-js-task-delete-button></button>
    </div>
  </li>`
  
  todoListElement.insertAdjacentHTML("afterbegin", newTaskMarkup)
  createTaskInputElement.value = ''
}

createTaskButtonElement.addEventListener('click', addTodoItem)

createTaskInputElement.addEventListener('keydown', (event) => {
  if (event.code === "Enter") {
    event.preventDefault()
    addTodoItem()
  }
})


const taskCheckboxElement = document.querySelector('[data-js-task-checkbox]')

console.log(taskCheckboxElement.checked)


