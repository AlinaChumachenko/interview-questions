import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor() { }

  private todos: string[] = [];

  //Add new task
  addTask(task: string) {
    this.todos.push(task);
  }

  //Get all tasks
  getTasks(): string[] {
    return this.todos;
  }

  //Delete task
  removeTask(ibdex: number) {
    this.todos.splice(ibdex, 1);
  }
  
  //Clear all tasks
  clearTasks() {
    this.todos = [];
  }
}
