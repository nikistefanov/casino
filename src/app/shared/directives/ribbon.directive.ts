import { Directive, Input, OnInit } from '@angular/core';
import { ICategory } from '../../../db-models/category';

@Directive({
    selector: '[whgRibbon]'
})
export class RibbonDirective implements OnInit {
    @Input() categories: ICategory[];

    ngOnInit() {
        console.log(this.categories);
    }
}
