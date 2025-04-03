import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss',
})

export class TestComponent {
  ageValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    const isValidAge = value >= 18 && value <= 99;
    return isValidAge ? null : { ageInvalid: 'Age must be between 18 and 99' };
  }

  complexForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    age: new FormControl(null, [Validators.required, this.ageValidator]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    consent: new FormControl(false, Validators.requiredTrue),
    })

  onSubmit() {
    console.log('FORM VALUE',this.complexForm.value);
    console.log('FORM STATUS - IS VALID',this.complexForm.valid);
    console.log('FORM CONTROLS',this.complexForm.controls);
  }


  get name() {
    return this.complexForm.get('name');
  }

  get email() {
    return this.complexForm.get('email');
  }

  get age() {
    return this.complexForm.get('age');
  }

  get password() {
    return this.complexForm.get('password');
  }

  get consent() {
    return this.complexForm.get('consent');
  } 

}













//TODO
// import { CommonModule } from '@angular/common';
// import { Component, OnInit } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { TodoService } from '../../services/todo.service';



// @Component({
//   selector: 'app-test',
//   // standalone: true,
//   imports: [CommonModule, FormsModule],
  
//   templateUrl: './test.component.html',
//   styleUrl: './test.component.scss'
// })
// export class TestComponent implements OnInit {

//   newTask: string = '';
//   tasks: string[] = [];

//   constructor(private todoService: TodoService) { }

//   ngOnInit() {
//     this.tasks = this.todoService.getTasks();
//     this.updateTasks();
//   }

//   addTask() {
//     if (this.newTask.trim() !== '') {
//       this.todoService.addTask(this.newTask.trim()); 
//       this.newTask = '';
//       this.updateTasks();

//       }
//     }

// removeTask(index: number) {
//   this.todoService.removeTask(index);
//   this.updateTasks();
// }

// private updateTasks() {
//   this.tasks = this.todoService.getTasks();
// }
// }



// import { CommonModule } from '@angular/common';
// import { Component, EventEmitter, Input, Output } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { HighlightDirective } from '../../directives/highlight.directive';
// import { TruncatePipe } from '../../pipes/truncate.pipe';



// @Component({
//   selector: 'app-test',
//   imports: [CommonModule, FormsModule, HighlightDirective, TruncatePipe],
  
//   templateUrl: './test.component.html',
//   styleUrl: './test.component.scss'
// })
// export class TestComponent {
// title = 'It is interpolation';
// firstName = 'Alina';
// lastName = 'Chumachenko';

// isEnabled:boolean = true;

// isActive: boolean = true;
// isDisabled: boolean = true;
// inputText: string ='';

// isClickedState: boolean = false;

// appState = 'active';//stopped, paused

// users = ['Alina', 'Ivan', 'Serhii', 'Diana']

// items = [
//   {'id': 1, 'name': 'Яблуко'},
//   {'id': 2, 'name': 'Банан'},
//   {'id': 3, 'name': 'Апельсин'},
//   {'id': 4, 'name': 'Ківі'},
//   {'id': 5, 'name': 'Виноград'},
// ]

// today = new Date();
// lonText = 'Дуже довгий текст, який необхідно обрізати'



// //-----------------------------------------------------------------
// @Input() childMessage: string = '';
// @Output() messageFromChild = new EventEmitter<string>()
// //-----------------------------------------------------------------

// getFullName() {
//   return `My name ${this.firstName} ${this.lastName}`
// }

// toggleState() {
// this.isClickedState=true;
// }

// sendMessageToParent() {
//   this.messageFromChild.emit('I am your child');
// }

// }
