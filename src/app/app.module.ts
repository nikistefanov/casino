import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from './http';
import { SharedModule } from './shared';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { CategoryFilterComponent } from './components/category-filter/category-filter.component';
import { GamesComponent } from './components/games/games.component';
import { IconComponent } from './components/icon/icon.component';
import { RibbonComponent } from './components/ribbon/ribbon.component';
import { RibbonWrapperComponent } from './components/ribbon/ribbon-wrapper.component';

@NgModule({
    declarations: [
        AppComponent,
        CategoryFilterComponent,
        GamesComponent,
        IconComponent,
        RibbonWrapperComponent,
        RibbonComponent
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot([]),
        HttpClientModule,
        HttpModule,
        SharedModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
