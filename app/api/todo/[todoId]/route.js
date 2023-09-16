// route.js
import { NextResponse } from "next/server";
import { getDatabase, closeDatabase } from "@/libs/db"; // Adjust the import path accordingly

export async function GET(request, { params }) {
    const { todoId } = params
    try {
      const db = getDatabase(); 
      
      const query = 'SELECT * FROM todo WHERE id = $1';
      const todo = await db.oneOrNone(query, todoId);
      if (todo) {
        return NextResponse.json({ todo });
      } else {
        return NextResponse.json({ message: 'todo not found' }, { status: 404 });
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      return NextResponse.json({ message: error }, { status: 500 });
    } finally {
      closeDatabase(); 
    }
  }

  export async function PUT(request, { params }) {

    try {
      const db = getDatabase(); 
    
      const { todoId } = params;
      const { name: name} = await request.json();
    //  console.log(todoId, name)
      const checkQuery = 'SELECT * FROM todo WHERE id = $1';
      const existingUser = await db.oneOrNone(checkQuery, todoId);
    
      if (!existingUser) {
        return NextResponse.json({ message: 'User not found' }, { status: 404 });
      }
    
    
      const updateQuery = 'UPDATE todo SET name = $1 WHERE id = $2';
     const todo= await db.none(updateQuery, [name, todoId]);
     return NextResponse.json({ todo });
    } catch (error) {
      console.error("Error fetching user:", error);
      return NextResponse.json({ message: error }, { status: 500 });
    }finally {
      closeDatabase(); 
    }
    
    
    
    }
    