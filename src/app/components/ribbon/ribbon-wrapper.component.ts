import { Component, Input } from '@angular/core';

@Component({
    selector: 'whg-ribbon-wrapper',
    templateUrl: 'ribbon-wrapper.component.html'
})
export class RibbonWrapperComponent {
    @Input() data: IRibbonData;
}

export interface IRibbonData {
    visible: boolean;
    text: string;
    look: string;
}
