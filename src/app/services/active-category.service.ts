import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription, Subject } from 'rxjs';

const CATEGORY_PARAM = 'category';
const DEFAULT_CATEGORY_ID = 'new';

@Injectable({
    providedIn: 'root'
})
export class ActiveCategoryService implements OnInit, OnDestroy {
    activeCategoryId: Subject<string> = new Subject<string>();
    private queryParamsSubscription: Subscription;

    constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        console.log('init');

        this.setActiveCategory(DEFAULT_CATEGORY_ID);
    }

    ngOnDestroy() {
        this.queryParamsSubscription.unsubscribe();
    }

    setActiveCategory(categoryId: string) {
        this.router.navigate([], {
            queryParams: {
                category: categoryId
            }
        });
    }

    getActiveCategoryId() {
        this.queryParamsSubscription = this.activatedRoute.queryParams.subscribe((params: Params) => {
            if (params[CATEGORY_PARAM]) {
                this.activeCategoryId.next(params[CATEGORY_PARAM]);
            }
        });
    }
}
