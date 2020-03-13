import { Component, Input, OnInit } from '@angular/core';
import { ICategory } from '../../../db-models/category';
import { NEW_CATEGORY_ID, TOP_CATEGORY_ID } from '../../http/services/category.service';

@Component({
    selector: 'whg-ribbon-wrapper',
    templateUrl: 'ribbon-wrapper.component.html'
})
export class RibbonWrapperComponent implements OnInit {
    @Input() categories: string[];
    @Input() activeCategory: ICategory;

    ribbonText: string;
    ribbonLook: string;
    ribbonVisible = false;

    ngOnInit() {
        this.setRibbonData();
    }

    private setRibbonData() {
        if (!this.categories.length) {
            return;
        }

        const notTopOrNewCategoryActive = this.activeCategory.id !== NEW_CATEGORY_ID && this.activeCategory.id !== TOP_CATEGORY_ID;
        const hasNewCategory = this.categories.some(c => c === NEW_CATEGORY_ID);
        const hasTopCategory = this.categories.some(c => c === TOP_CATEGORY_ID);
        this.ribbonVisible = notTopOrNewCategoryActive && (hasNewCategory || hasTopCategory);

        if (this.ribbonVisible) {
            this.ribbonText = hasNewCategory ? NEW_CATEGORY_ID : TOP_CATEGORY_ID;
            this.ribbonLook = hasNewCategory ? '' : 'light';
        }
    }
}
