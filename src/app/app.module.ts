import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from './http';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { CategoryFilterComponent } from './components/category-filter/category-filter.component';
import { GamesComponent } from './components/games/games.component';
import { IconComponent } from './components/icon/icon.component';
import { RibbonComponent } from './components/ribbon/ribbon.component';
import { LoaderComponent } from './components/loader/loader.component';
import { CardComponent } from './components/card/card.component';
import { RibbonWrapperComponent } from './components/ribbon/ribbon-wrapper.component';
import { ActiveCategoryService } from './services/active-category.service';

@NgModule({
    declarations: [
        AppComponent,
        CategoryFilterComponent,
        GamesComponent,
        IconComponent,
        RibbonComponent,
        RibbonWrapperComponent,
        LoaderComponent,
        CardComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        HttpModule
    ],
    providers: [ActiveCategoryService],
    bootstrap: [AppComponent]
})
export class AppModule { }
