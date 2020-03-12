import { NgModule } from '@angular/core';
import { RibbonDirective } from './directives/ribbon.directive';


@NgModule({
    providers: [
        RibbonDirective
    ]
})
export class SharedModule {}
