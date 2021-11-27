import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Todo } from '../interface/todo';

@Injectable({
  providedIn: 'root',
})
export class TodoService {

  constructor(private Http: HttpClient) {
  }

  create(todo: Todo): Observable<void> {
    return this.Http.post<void>(`${environment.apiUrl}todo`, todo);
  }

  list(): Observable<Todo[]> {
    return this.Http.get<Todo[]>(`${environment.apiUrl}todo`);
  }

  getById(id: string): Observable<Todo> {
    return this.Http.get<Todo>(`${environment.apiUrl}todo/${id}`);
  }

  edit(id: string, todo: Todo) {
    return this.Http.patch(`${environment.apiUrl}todo/${id}`, todo);
  }

  delete(id: string): Observable<Todo> {
    return this.Http.delete<Todo>(`${environment.apiUrl}todo/${id}`);
  }
}
