import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Category } from '../../models/category.model';
import { CategoryService } from '../../services/category.service';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ToastrService } from 'ngx-toastr';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Question } from '../../models/question.model';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    // NgFor,
    RouterLink,
    FormsModule, 
    RouterModule,
    CommonModule,
    MatIconModule,
    TranslateModule,
    MatTooltipModule
    ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})

export class SidebarComponent implements OnInit{
  categories: Category[] = [];
  newCategory: string = '';
  confirmDeleteCategory: Category | null = null;

  constructor(
    private categoryService: CategoryService,
    private toastr: ToastrService,
    private translate: TranslateService)
     {
      translate.addLangs(['en', 'uk']);
      translate.setDefaultLang('en');
      translate.use('uk');
    }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  addCategory() {
    const name = this.newCategory.trim();
    if (!name) return;
  
    this.categoryService.addCategory(name).subscribe({
      next: (newCat) => {
        this.categories.push(newCat); 
        this.newCategory = '';
        this.toastr.success('Category added successfully!', 'Success');
      },
      error: () => {
        this.toastr.error('This category already exists or an error occurred.', 'Error');
      }
    });
  }

  deleteCategory(category: Category) {
    this.categoryService.deleteCategory(category.id).subscribe({
      next: () => {
        this.loadCategories();
        this.confirmDeleteCategory = null;
        this.toastr.success('Category deleted successfully!', 'Success');
      },
      error: () => {
        this.toastr.error('An error occurred while deleting the category.', 'Error');
      }
    });
  }


}
