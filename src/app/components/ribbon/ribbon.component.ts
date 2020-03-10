import { Component, Input } from '@angular/core';

@Component({
    selector: 'whg-ribbon',
    templateUrl: 'ribbon.component.html'
})
export class RibbonComponent {
    @Input() text: string;
}
