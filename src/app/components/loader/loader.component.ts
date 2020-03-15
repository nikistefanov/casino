import { Component, Input, ViewChild, TemplateRef, OnInit } from '@angular/core';


export enum LoaderType {
    Home = 'home',
    Game = 'game',
    Navigation = 'nav'
}

@Component({
    selector: 'whg-loader',
    templateUrl: 'loader.component.html'
})
export class LoaderComponent implements OnInit {
    @Input() type: LoaderType = LoaderType.Home;
    @ViewChild('home') homeLoaderTmpl: TemplateRef<any>;
    @ViewChild('game') gameLoaderTmpl: TemplateRef<any>;
    @ViewChild('nav') navLoaderTmpl: TemplateRef<any>;

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
            case LoaderType.Navigation:
                this.loaderType = this.navLoaderTmpl;
                this.loaderClassList += ' -nav';
                break;
            default:
                this.loaderType = this.homeLoaderTmpl;
                this.loaderClassList += ' -home';
                break;
        }
    }
}
