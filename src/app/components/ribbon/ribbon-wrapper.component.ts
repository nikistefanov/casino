import { Component, Input, OnInit } from '@angular/core';
import { NEW_CATEGORY_ID, TOP_CATEGORY_ID } from '../../http/services/category.service';
import { ActiveCategoryService } from '../../services/active-category.service';

@Component({
    selector: 'whg-ribbon-wrapper',
    templateUrl: 'ribbon-wrapper.component.html'
})
export class RibbonWrapperComponent implements OnInit {
    @Input() categories: string[];

    ribbonText: string;
    ribbonLook: string;
    ribbonVisible = false;

    constructor(private activeCategoryService: ActiveCategoryService) {}

    ngOnInit() {
        this.activeCategoryService.activeCategoryId.subscribe(activeCategoryId => this.setRibbonData(activeCategoryId));
    }

    private setRibbonData(activeCategoryId: string) {
        if (!this.categories.length) {
            return;
        }

        const notTopOrNewCategoryActive = activeCategoryId !== NEW_CATEGORY_ID && activeCategoryId !== TOP_CATEGORY_ID;
        const hasNewCategory = this.categories.some(c => c === NEW_CATEGORY_ID);
        const hasTopCategory = this.categories.some(c => c === TOP_CATEGORY_ID);
        this.ribbonVisible = notTopOrNewCategoryActive && (hasNewCategory || hasTopCategory);

        if (this.ribbonVisible) {
            this.ribbonText = hasNewCategory ? NEW_CATEGORY_ID : TOP_CATEGORY_ID;
            this.ribbonLook = hasNewCategory ? '' : 'light';
        }
    }
}
