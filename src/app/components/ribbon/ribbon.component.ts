import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'whg-ribbon',
    templateUrl: 'ribbon.component.html'
})
export class RibbonComponent implements OnInit {
    @Input() look: string;
    @Input() text: string;

    ribbonClass: string;

    ngOnInit() {
        this.ribbonClass = this.generateCssClassList();
    }

    generateCssClassList() {
        let cls = 'whg-ribbon -top-right';

        if (this.look) {
            cls += ' -' + this.look.split(' ').join(' -');
        }
        return cls;
    }
}
