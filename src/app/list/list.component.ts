import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../interface/todo';
import { NzMessageService } from 'ng-zorro-antd/message';

interface Person {
  key: string;
  name: string;
  age: number;
  address: string;
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  listOfData!: Todo[];

  constructor(
    private todoService: TodoService,
    private message: NzMessageService) {
  }

  ngOnInit(): void {
   this.list();
  }
 list():void{
   this.todoService.list().subscribe(res => {
     this.listOfData = res;
   });
 }

  delete(id: string) {
    this.todoService.delete(id).subscribe(res => {
      this.list();
      this.message.create('success', `Delete Successfully`);
    });
  }
}
