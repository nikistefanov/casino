import { TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { CategoryFilterComponent } from './components/category-filter/category-filter.component';
import { GameComponent } from './components/game/game.component';
import { LoaderComponent } from './components/loader/loader.component';
import { IconComponent } from './components/icon/icon.component';
import { RibbonComponent } from './components/ribbon/ribbon.component';
import { CardComponent } from './components/card/card.component';
import { RootService } from './http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { rootServiceMock } from '../test-helpers/mocks';

describe('AppComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            declarations: [
                AppComponent,
                CategoryFilterComponent,
                GameComponent,
                LoaderComponent,
                IconComponent,
                RibbonComponent,
                CardComponent
            ],
            providers: [
                { provide: RootService, useValue: rootServiceMock }
            ]
        }).compileComponents();
    }));

    it('should create the app', fakeAsync(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;

        fixture.detectChanges();
        expect(app).toBeTruthy();
    }));
});
