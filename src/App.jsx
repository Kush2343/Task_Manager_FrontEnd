import { useState, useEffect } from "react"
import axios from "axios"
import TaskForm from "./Components/TaskForm"
import TaskList from "./Components/TaskList"

const APIURL = import.meta.env.VITE_SERVERURL;
console.log("u",APIURL);

function App() {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    const response = await axios.get(`${APIURL}/tasks`)
    setTasks(response.data)
  }

  const addTask = async (title, description) => {
    await axios.post(`${APIURL}/tasks`, { title, description })
    fetchTasks()
  }

  const updateTask = async (id, title, description) => {
    await axios.put(`${APIURL}/tasks/${id}`, { title, description })
    fetchTasks()
  }

  const deleteTask = async (id) => {
    await axios.delete(`${APIURL}/tasks/${id}`)
    fetchTasks()
  }

  return (
    <div className="flex h-screen bg-gray-100 items-center">
      <div className="w-full max-w-2xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Task Manager</h1>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-6 border-b">
            <TaskForm onAddTask={addTask} />
          </div>
          <TaskList tasks={tasks} onUpdateTask={updateTask} onDeleteTask={deleteTask} />
        </div>
      </div>
    </div>
  )
}

export default App;