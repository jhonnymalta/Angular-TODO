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
      Title: ['', Validators.required],
    });
    this.todos.push(new Todo(1, 'Cortar cabelo as 17:00', false));
    this.todos.push(new Todo(2, 'Comprar Legumes', false));
    this.todos.push(new Todo(3, 'Ligar para Sr Zé', false));
  }

  Remove(todo: Todo) {
    const index = this.todos.indexOf(todo);
    if (index !== -1) {
      this.todos.splice(index, 1);
    }
  }
  MarkAsDone(todo: Todo) {
    todo.done = true;
  }
}
