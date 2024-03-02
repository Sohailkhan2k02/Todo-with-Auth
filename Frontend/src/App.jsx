import { BusinessCard } from './components/BusinessCard';
import { CreateTodo } from './components/CreateTodo'
import { Todos } from './components/Todos'

function App() {
  const todos = [
    {
      title : "asd",
      description : "Go to gym",
      completed : false
    },
    {
      title: "Don",
      description:"Most wanted criminal",
      completed: true
    },
    {
      title: "Shanavaz",
      description:"Masti time",
      completed: false
    }
  ];

  return (
    <div>
      <CreateTodo />
      
    </div>
  )
}

export default App
