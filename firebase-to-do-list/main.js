import './style.css'
import { getTasks, addTask, editDocument} from './firebase.js'

let tasks = [];
await renderTasks();

const buttonTask = document.getElementById('create-todo');
buttonTask.addEventListener('click', async () => await handleClick())

async function renderTasks() {
  tasks = await getTasks()
  const todosContainer = document.querySelector('#to-dos-container')

  todosContainer.innerHTML = '';

  tasks.forEach(task => {
    const elem = document.createElement('li')
    elem.textContent = task.name
    if(task.completed) elem.style.textDecoration = 'line-through'
    todosContainer.append(elem)
    elem.addEventListener('click', async ()=>  {
      await editDocument(task.name, task.id)
      await renderTasks()
    }));
}

async function handleClick() {
  const inputTask = document.getElementById('input-todo')
  const inputText = inputTask.value;

  await addTask(inputText);
  inputTask.value = '';
  await renderTasks();
}

