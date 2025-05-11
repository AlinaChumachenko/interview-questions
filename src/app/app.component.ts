import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
// import { NotFoundComponent } from './components/not-found/not-found.component';
// import { HomeComponent } from './pages/home/home.component';
// import { CategoryComponent } from './pages/category/category.component';
// import { MessageModalComponent } from './components/message-modal/message-modal.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeaderComponent,
    SidebarComponent,
    // NotFoundComponent,
    // HomeComponent,
    // CategoryComponent,
    RouterOutlet, 
    // MessageModalComponent,
    // RouterLink,
    
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']  // Make sure this is plural if you're using multiple stylesheets
})
export class AppComponent { }

