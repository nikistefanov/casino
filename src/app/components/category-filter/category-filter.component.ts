import { Component, OnInit, OnDestroy, Input, EventEmitter, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { ICategory } from '../../../db-models/category';
import { RootService } from '../../http';
import { delay } from 'rxjs/operators';

@Component({
    selector: 'whg-category-filter',
    templateUrl: './category-filter.component.html'
})
export class CategoryFilterComponent implements OnInit, OnDestroy {
    @Input() activeCategory: ICategory;
    @Output() categoryChange: EventEmitter<ICategory> = new EventEmitter<ICategory>();
    categories: ICategory[];

    private categoriesSubscription: Subscription;

    constructor(private rootService: RootService) {}

    ngOnInit() {
        this.getCategories();
    }

    ngOnDestroy() {
        this.categoriesSubscription.unsubscribe();
    }

    onCategoryClick(category: ICategory) {
        this.activeCategory = category;
        this.categoryChange.emit(category);
    }

    private getCategories() {
        this.categoriesSubscription = this.rootService.categories.get().subscribe((categories: ICategory[]) => {
            this.categories = categories;
        });
    }
}
