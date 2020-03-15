import { Component, OnInit, OnDestroy, Input, EventEmitter, Output } from '@angular/core';
import { Subscription, combineLatest } from 'rxjs';
import { ICategory } from '../../../db-models/category';
import { RootService } from '../../http';
import { ActiveCategoryService } from '../../services/active-category.service';

@Component({
    selector: 'whg-category-filter',
    templateUrl: './category-filter.component.html'
})
export class CategoryFilterComponent implements OnInit, OnDestroy {
    @Output() categoryChange: EventEmitter<ICategory> = new EventEmitter<ICategory>();

    activeCategory: ICategory;
    categories: ICategory[];
    expanded = false;

    private categoriesSubscription: Subscription;

    constructor(private rootService: RootService, private activeCategoryService: ActiveCategoryService) {}

    ngOnInit() {
        this.getCategories();
    }

    ngOnDestroy() {
        this.categoriesSubscription.unsubscribe();
    }

    onCategoryClick(category: ICategory) {
        if (category === this.activeCategory) {
            return;
        }

        this.expanded = false;
        this.categoryChange.emit(category);
        this.activeCategory = category;
        this.activeCategoryService.setActiveCategory(category.id);
    }

    private getCategories() {
        this.categoriesSubscription = combineLatest(
            this.rootService.categories.get(),
            this.rootService.categories.getDefault()
        ).subscribe(([categories, defaultCategory]) => {
            this.categories = categories || [];
            this.onCategoryClick(defaultCategory);
        });
    }
}
