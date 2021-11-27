import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit {
  todoForm: FormGroup;
  editMode: boolean = false;
  id!: string | null;

  constructor(
    private todoService: TodoService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private message: NzMessageService) {
    this.todoForm = this.formBuilder.group({
      title: [''],
      details: [''],
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.editMode = !!this.id;
    if (this.id)
      this.todoService.getById(this.id).subscribe(res => {
        this.todoForm.patchValue(res);
      });
  }

  create() {
    const payload = {
      title: this.todoForm.value.title,
      details: this.todoForm.value.details,
    };
    if (this.id ) {
      this.todoService.edit(this.id, payload).subscribe(res => {
        this.message.create('success', `Update Successfully`);
        this.router.navigate(['/list']);
      });
    } else {
      this.todoService.create(payload).subscribe(res => {
        this.message.create('success', `Add Successfully`);
        this.router.navigate(['/list']);
      });
    }
  }
}
