import { useEffect, useState } from "react";
import Create from "./Components/Create/Create";
import Task from "./Components/Task/Task";
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

function App() {
  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem('Tasks')) || []);

  useEffect(() => {
    const getTasks = async () => {
      try {
        const response = await axios.get('http://localhost:3000/tasks');

        if (response.data?.length > 0) {
          setTasks(response.data);
        }

      } catch (error) {
        console.log(`(${error.message}) Ocorreu um erro ao realizar a busca de tarefas: [ Servidor pode estar fora do ar, tente inicia-lo com "node server.js" ]`)
      }
    };

    getTasks();
  }, []);

  const insertNewTask = async (task) => {
    const newTaskToInsert = {
      id: uuidv4(),
      task: task,
      isComplete: false,
      isEditing: false
    };

    try {
      const response = await axios.post('http://localhost:3000/tasks', newTaskToInsert, {
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.status === 200) {
        setTasks(
          [...tasks,
            newTaskToInsert
          ]
        );

        localStorage.setItem('Tasks', JSON.stringify([...tasks, newTaskToInsert]));

        console.log(response.data.message);
      } else {
        console.log(response.data.message);
      }

    } catch (error) {
      console.error('Ocorreu um erro ao adicionar uma tarefa', error);
    }
  };

  const handleStateComplete = async (id) => {

    const findTaskToUpdate = tasks.find(task => (task.id === id));

    const updatedTask = { ...findTaskToUpdate, isComplete: !findTaskToUpdate.isComplete };

    try {
      const response = await axios.put(`http://localhost:3000/tasks/${id}`, updatedTask);

      if (response.status === 200) {
        setTasks(tasks.map(task => task.id === id ? updatedTask : { ...task }))

        localStorage.setItem('Tasks', JSON.stringify(tasks.map(task => task.id === id ? updatedTask : { ...task })));

        console.log(response.data.message);
      } else {
        console.log(response.data.message);
      }

    } catch (error) {
      console.log(error.message)
    }
  }

  const handleStateEditing = (id, { target }) => {
    setTasks(tasks => {
      const updatedTasks = tasks.map(task => {

        if (task.id === id) {

          if (task.isEditing) {
            const taskContainer = target.parentNode.parentNode;

            let subject = taskContainer.querySelector('.task_subject').textContent;

            return {
              ...task,
              isEditing: false,
              task: subject == '' ? task.task : subject
            };
          } else {
            return {
              ...task,
              isEditing: true
            };
          }
        }

        return task;
      });

      localStorage.setItem('Tasks', JSON.stringify(updatedTasks));
      return updatedTasks
    });
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3000/tasks/${id}`);

      if (response.status === 200) {
        console.log(response.data.message)

        setTasks(tasks.filter(task => task.id !== id));

        localStorage.setItem('Tasks', JSON.stringify(tasks.filter(task => task.id !== id)));
      } else {
        console.log(response.data.message)
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <>
      <main className="container">

        <header className="container_header">
          <h2>TaskOn - Organize suas tarefas</h2>
        </header>

        <section className="container_tasks">
          {tasks.length == 0 && <p className="empty_container_tasks">Adicione uma tarefa a lista!</p>}

          {tasks.map((task, index) => (
            <Task
              task={task}
              handleDelete={handleDelete}
              handleStateComplete={handleStateComplete}
              handleStateEditing={handleStateEditing}
              key={index}
            />
          ))}
        </section>

        <div className="container_create">
          <Create insertNewTask={insertNewTask} />
        </div>

      </main>
    </>
  )
}

export default App
