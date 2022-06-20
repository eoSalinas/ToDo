import { ChangeEvent, FormEvent, useState } from 'react';

import style from './styles.module.scss';
import addImg from '../../../public/images/add.svg';
import trashImg from '../../../public/images/trash.svg';
import ClipboardImg from '../../../public/images/clipboard.svg'

interface Task {
  id: number;
  text: string;
  isComplete: boolean
}

export function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskText, setNewTaskText] = useState('');
  const [tasksDone, setTasksDone] = useState(0);

  const hasTask = tasks.length >= 1;

  function handleNewTaskChange(e: ChangeEvent<HTMLInputElement>) {
    setNewTaskText(e.target.value);
  }

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault();

    if (!newTaskText) {
      return
    }

    const newTask = {
      id: Math.random(),
      text: newTaskText,
      isComplete: false
    }

    setTasks([...tasks, newTask]);
    setNewTaskText('');
  }

  function handleDeleteTask(taskRecovery: Task) {
    if (taskRecovery.isComplete === true) {
      const tasksWithoutSameId = tasks.filter(task => task.id !== taskRecovery.id);
      setTasks(tasksWithoutSameId);

        if(tasksDone >= 1) {
          setTasksDone(tasksDone - 1);
        }
    } else {
      alert('Você deve concluir a tarefa primeiro!');
    }
  }

  function handleToggleTaskComplete(id: number) {
    const toggledTasks = tasks.map((task) => {
      return task.id === id ? {...task, isComplete: !task.isComplete} : task
    });
    setTasks(toggledTasks);

    // Filtra e faz o Set das atividades que estão concluídas
    const filteredCompleteTask = toggledTasks.filter((task) => task.isComplete === true);
    setTasksDone(filteredCompleteTask.length);
  }
  
  return (
    <div className={style.container}>
      <form 
        className={style.addForm} 
        onSubmit={handleCreateNewTask}
      >
        <input 
          type="text" 
          placeholder="Adicione uma nova tarefa" 
          onChange={handleNewTaskChange}
          value={newTaskText} 
        />
        <button>
          <span>Criar</span>
          <img src={addImg} />
        </button>
      </form>

      <div className={style.list}>
        <header>
          <h2>Tarefas criadas <span>{tasks.length}</span></h2>
          <h2>Concluídas <span>{tasksDone} de {tasks.length}</span></h2>
        </header>

        {hasTask ? <></> : 
          <div className={style.empty}>
            <img src={ClipboardImg} />
            <strong>Você ainda não tem tarefas cadastradas</strong>
            <p>Crie tarefas e organize seus itens a fazer</p>
          </div>
        }

        <ul>
          {tasks.map(task => {
            return (
              <li key={task.id}>
                <input 
                  type="checkbox"
                  readOnly
                  checked={task.isComplete}
                  onClick={() => handleToggleTaskComplete(task.id)}
                />
                <label>{task.text}</label>
                <button onClick={() => handleDeleteTask(task)}>
                  <img src={trashImg} alt="Deletar tarefa" />
                </button>
              </li>
            );
          })}
        </ul>
      </div>

    </div>
  );
}