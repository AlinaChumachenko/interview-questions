import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Category } from '../../models/category.model';
import { CategoryService } from '../../services/category.service';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ToastrService } from 'ngx-toastr';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Question } from '../../models/question.model';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
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
    private translate: TranslateService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  get isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
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
    const currentCategory = this.route.snapshot.paramMap.get('name'); 
    this.categoryService.deleteCategory(category.id).subscribe({
      next: () => {
        if (currentCategory?.toLowerCase() === category.name.toLowerCase()) {
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/']);
          });
        }
  
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
