// route.js
import { NextResponse } from "next/server";
import { getDatabase, closeDatabase } from "@/libs/db"; // Adjust the import path accordingly

export async function GET(request) {
    try {
      const db = getDatabase(); 
      
      const query = 'SELECT * FROM todo';
      const todo = await db.any(query);
      if (todo) {
        return NextResponse.json({ todo });
      } else {
        return NextResponse.json({ message: 'Users not found' }, { status: 404 });
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      return NextResponse.json({ message: error }, { status: 500 });
    } finally {
      closeDatabase(); 
    }
  }
  
  export async function POST(request) {
    let db;
    try {
       db = getDatabase();
      const { Name } = await request.json();
    //   console.log(Name)
      const newTodo = await db.one(
        "INSERT INTO todo(name) VALUES($1) RETURNING *",
        Name
      );
    //   console.log(newTodo)
      return NextResponse.json({ newTodo }, { status: 201 });
    } catch (error) {
      console.error("Error adding user:", error);
      return NextResponse.json({ message: error }, { status: 500 });
    }  finally {
      if (db) {
        closeDatabase(); 
      }
    }
  }
  
  export async function DELETE(request) {
    let db;
    try {
      db = getDatabase();
      const id = request.nextUrl.searchParams.get("id");
      console.log(id)
  
      if (!id) {
        return NextResponse.json({ message: "Missing 'id' parameter" }, { status: 400 });
      }
  
      const deleteQuery = 'DELETE FROM todo WHERE id = $1';
      await db.none(deleteQuery, [id]);
  
      return NextResponse.json({ message: "todo deleted" }, { status: 200 });
    } catch (error) {
      console.error("Error deleting todo:", error);
      return NextResponse.json({ message: error }, { status: 500 });
    } finally {
      if (db) {
        closeDatabase();
      }
    }
  }
  
  