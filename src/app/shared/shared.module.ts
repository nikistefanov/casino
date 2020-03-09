import { NgModule } from '@angular/core';
import { ActiveCategoryService } from './services/active-category.service';


@NgModule({
    providers: [
        ActiveCategoryService
    ]
})
export class SharedModule {}
