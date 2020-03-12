import { Component, Input, ViewChild, TemplateRef, OnInit } from '@angular/core';


export enum LoaderType {
    Home = 'home',
    Game = 'game'
}

@Component({
    selector: 'whg-loader',
    templateUrl: 'loader.component.html'
})
export class LoaderComponent implements OnInit {
    @Input() type: LoaderType = LoaderType.Home;
    @ViewChild('home') homeLoaderTmpl: TemplateRef<any>;
    @ViewChild('game') gameLoaderTmpl: TemplateRef<any>;

    loaderType: TemplateRef<any>;
    loaderClassList = 'whg-loader';

    ngOnInit() {
        this.setLoaderType();
    }

    private setLoaderType() {
        switch (this.type) {
            case LoaderType.Game:
                this.loaderType = this.gameLoaderTmpl;
                this.loaderClassList += ' -game';
                break;
            default:
                this.loaderType = this.homeLoaderTmpl;
                this.loaderClassList += ' -home';
                break;
        }
    }
}
