import { type } from "@testing-library/user-event/dist/type"
import Button from "../UI/button/Button"
import { useState } from "react"

export default function CreateTask() {
  const [value, setValue] = useState('')

const addNewTask = (event) => {
  event.preventDefault()
  console.log(value);
  setValue('')
}


  return (
    <div className="create-task">
        <form action="" className="create-task__form">
          <input 
            type="text" 
            className="create-task__input" 
            value={value} onChange={(event) => (setValue(event.target.value))}
            autoFocus
          />
          <button 
            className='create-task__button' 
            onClick={addNewTask}
          >Добавить задачу</button>
        </form>
      </div>
  )
}