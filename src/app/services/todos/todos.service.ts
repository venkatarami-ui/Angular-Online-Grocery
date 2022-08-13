import { Injectable, EventEmitter } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { Todo } from 'src/app/todos/Todo';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  constructor(
    private httpService: HttpService
  ) { }

  private todosList:Todo[] = [];
  todosData:Subject<Todo[]> = new Subject<Todo[]>();
  //private todo:Todo = <Todo>{};
  todoData:EventEmitter<Todo> = new EventEmitter<Todo>();

  private allSubscription?:Subscription;
  //private oneSubscription?:Subscription;
  private addSubscription?:Subscription;
  private editSubscription?:Subscription;
  private delSubscription?:Subscription;

  get todos():Todo[]{
    this.getAllTodos();
    return this.todosList.slice();
  }
  
  getAllTodos(){
    this.allSubscription = this.httpService.getAllRequest('todos')
    .subscribe(
      (res:any) => {
        this.todosList = [...res];
        this.todosData.next(this.todosList);
        this.allSubscription?.unsubscribe();
      }
    )
  }

  addTodo(data:Todo){
    this.addSubscription = this.httpService.postRequest('todos',data)
    .subscribe(
      (res:any) => {
        this.getAllTodos();
        this.addSubscription?.unsubscribe();
      }
    )
  }

  editTodo(id:string,data:Todo){
    this.addSubscription = this.httpService.putRequest('todos',id,data)
    .subscribe(
      (res:any) => {
        this.getAllTodos();
        //this.getOneTodo(id);
        this.todoData.emit(res);
        this.editSubscription?.unsubscribe();
      }
    )
  }

  deleteTodo(id:string){
    this.delSubscription = this.httpService.deleteRequest('todos',id)
    .subscribe(
      (res:any) => {
        this.getAllTodos();
        this.delSubscription?.unsubscribe();
      }
    )

  }
}
