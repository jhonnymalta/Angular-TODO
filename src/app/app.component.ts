import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Todo } from 'src/models/Todo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'to-do task';
  public todos: Todo[] = [];
  public formTask: FormGroup;

  /**
   *
   */
  constructor(private fb: FormBuilder) {
    this.formTask = this.fb.group({
      title: [
        '',
        Validators.compose([
          Validators.minLength(3),
          Validators.maxLength(25),
          Validators.required,
        ]),
      ],
    });

    this.LoadTasks();
  }

  Add() {
    const title = this.formTask.controls['title'].value;
    const id = this.todos.length + 1;
    this.todos.push(new Todo(id, title, false));
    this.SaveToJsonString();
    this.formTask.reset();
  }

  Remove(todo: Todo) {
    const index = this.todos.indexOf(todo);
    if (index !== -1) {
      this.todos.splice(index, 1);
    }
    this.SaveToJsonString();
  }
  MarkAsDone(todo: Todo) {
    todo.done = true;
  }
  SaveToJsonString() {
    const data = JSON.stringify(this.todos);
    sessionStorage.setItem('todos', data);
  }
  LoadTasks() {
    this.todos = JSON.parse(sessionStorage.getItem('todos')!);
  }
}
