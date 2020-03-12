import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'whg-ribbon',
    templateUrl: 'ribbon.component.html'
})
export class RibbonComponent implements OnInit {
    @Input() data: IRibbonData;

    ribbonClass: string;

    ngOnInit() {
        this.ribbonClass = this.generateCssClassList();
    }

    generateCssClassList() {
        let cls = 'whg-ribbon -top-right';

        if (this.data && this.data.look) {
            cls += ' -' + this.data.look.split(' ').join(' -');
        }
        return cls;
    }
}

export interface IRibbonData {
    visible: boolean;
    text: string;
    look: string;
}
