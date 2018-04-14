import { Task } from './Task';
import { Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
// importar las funciones de la biblioteca
import 'rxjs/RX';

@Injectable()
export class TasksService {

  domain: string;

  constructor(private http: HttpClient) {
    console.log('Task service initialized');
    this.domain = 'http://localhost:3000';
  }
  /*Nos devuelve un arreglo de tareas */
  // Obtener
  getTasks() {
    return this.http.get<Task[]>(`${this.domain}/api/tasks`)
    .map( res => res );
  }
  // Añadir
  addTask(newTask: Task) {
    return this.http .post<Task>(`${this.domain}/api/tasks`, newTask)
    .map( res => res);
  }
  // Borrar
  deleteTask(id) {
    return this.http.delete<Task>(`${this.domain}/api/tasks/${id}`);
  }
  // Actualizar
  updateTask(newTask: Task) {
    return this.http.put(`${this.domain}/api/tasks/${newTask._id}`, newTask)
    .map( res => res );
  }
}
