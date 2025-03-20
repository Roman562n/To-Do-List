import { useState } from 'react';
import './styles/App.css'
import CreateTask from './components/CreateTask';


function App() {
  const [value, setValue] = useState('')

  function addNewTask(event) {
    event.preventDefault()
    console.log(value)
    setValue('')
  }

  return (
    <div className="App">
      <CreateTask />
      
      <ul className="todo__list">
        <li className="todo__item">
          <span className="todo__content">Some task</span>
          <button className='todo__delete-button'>Удалить</button>
        </li>
      </ul>
    </div>
  );
}

export default App;
