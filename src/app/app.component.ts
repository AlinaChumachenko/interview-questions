import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { TestComponent } from './components/test/test.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';

// ⬇ Add Angular Material imports

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    RouterLink,
    RouterLinkActive,
    TestComponent,
    CommonModule,    
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatButtonModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']  // Make sure this is plural if you're using multiple stylesheets
})
export class AppComponent { }



// import { Component } from '@angular/core';
// import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
// import { TestComponent } from './components/test/test.component';
// import { CommonModule } from '@angular/common';
// import { TodoService } from './services/todo.service';

// @Component({
//   selector: 'app-root',
//   imports: [
//     RouterOutlet, 
//     RouterLink,
//     RouterLinkActive,
//     TestComponent,
//   ],
//   templateUrl: './app.component.html',
//   styleUrl: './app.component.scss'
// })
// export class AppComponent {
//   // title = 'interview-master';
//   // messageFromParent = "I am you father"
//   // messageFromChild = '';
  
//   // getMessageFromChild(message:string)  {
//   //   this.messageFromChild = message;
//   // }
// }
