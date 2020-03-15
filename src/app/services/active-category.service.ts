import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ActiveCategoryService {
    activeCategoryId: ReplaySubject<string> = new ReplaySubject<string>();

    setActiveCategory(categoryId: string) {
        this.activeCategoryId.next(categoryId);
    }
}
