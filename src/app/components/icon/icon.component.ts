import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'whg-icon',
    templateUrl: './icon.component.html'
})
export class IconComponent implements OnInit {
    @Input() look: string;
    @Input() name: string;

    iconClass: string;

    ngOnInit() {
        this.iconClass = this.generateCssClassList();
    }

    generateCssClassList() {
        let cls = 'whg-icon';
        if (this.name) {
            cls += ' -' + this.name;
        }

        if (this.look) {
            cls += ' -' + this.look.split(' ').join(' -');
        }
        return cls;
    }
}
