"use client"
import Icon from '@mdi/react';
import { mdiDeleteCircle } from '@mdi/js';
import EditTodo from '@/components/EditTodo';
import { useEffect, useState } from "react"

export default function Home() {
const [Name , setName] = useState("")

const [todos , setTodos] = useState([])

const handleSubmit = async (e) => {
  e.preventDefault()
  try {
    const res = await fetch(`http://localhost:3000/api/todo`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ Name }),
    });

    if (res.ok) {
      getTodos()

    } else {
      throw new Error("Failed to create a topic");
    }
  } catch (error) {
    console.log(error);
  }

}

const getTodos = async ()=>{
  try {
    const res = await fetch(`http://localhost:3000/api/todo`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    });

    if (res.ok) {
      const result = await res.json();
    setTodos(result.todo)
    } else {
      throw new Error("Failed to create a topic");
    }
  } catch (error) {
    console.log(error);
  }

}
useEffect(()=>{
  getTodos()
},[]);


const handleDelete = async (id)=>{

  const confirmed = confirm("Are you sure?");

  if (confirmed) {
    const res = await fetch(`http://localhost:3000/api/todo?id=${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      getTodos()
    }
  }

}

const onChange = async () => {
  getTodos()
}


  return (
    <>
    <form onSubmit={handleSubmit} className="flex justify-center p-10">
     <input placeholder="Name" value={Name} onChange={(e)=>{setName(e.target.value)}} className="p-5 shadow-lg rounded-lg"/>
     <button type="submit">submit</button>
    </form>
    <div className="flex gap-5 justify-center flex-wrap ">
    {todos.map((e)=>{
       return (
        <>
        <div className="p-10 rounded-lg  border-solid shadow-lg bg-zinc-100 relative">
          <p>{e.name}</p>
        <Icon path={mdiDeleteCircle} color="red" size={1} className='absolute top-0 right-0 p-1 cursor-pointer' onClick={()=>{handleDelete(e.id)}} />
        <EditTodo item={e} onChange={onChange}/>
        </div>
        </>

       )
    })}
    </div>
  </>
  )
}
