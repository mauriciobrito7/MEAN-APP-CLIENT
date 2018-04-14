import { Component, OnInit } from '@angular/core';
import { TasksService } from '../../services/tasks.service';
import { Task } from '../../services/Task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  tasks: Task[];
  title: string;

  constructor(private taskService: TasksService) {
  }
  ngOnInit() {
    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
    });
  }
  addTask(event) {
    // Cancelamos el evento
    event.preventDefault();
    // console.log(this.title);
    const newTask = {
      title: this.title,
      isDone: false
    };
    // this.tasks.push(newTask);
    this.taskService.addTask(newTask)
    .subscribe(task => {
      this.tasks.push(task);
      this.title = '';
    });
  }

  deleteTask(id) {
    const tasks = this.tasks;
    this.taskService.deleteTask(id).subscribe(data => {
      if (data.n === 1) {
        /*Si ha eliminado el dato voy a recorrer todas mis tareas y si el id es igual al que he eliminado entonces se remueve del arreglo*/
        for (let i = 0; i < tasks.length; i++) {
          if (tasks[i]._id === id) {
            tasks.splice(i, 1);
          }
        }
      }
    });
  }

  updateStatus(task) {
    console.log(task._id);
    // Se crea una nueva tarea para que actualice a la antigua
    const newTask = {
      _id: task._id,
      title: task.title,
      isDone: !task.isDone
    };

    this.taskService.updateTask(newTask).subscribe(data => {
      task.isDone = !task.isDone;
    });
  }
}
