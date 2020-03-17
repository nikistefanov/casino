import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { GameComponent } from './components/game/game.component';
import { CategoryFilterComponent } from './components/category-filter/category-filter.component';
import { LoaderComponent } from './components/loader/loader.component';
import { RibbonWrapperComponent } from './components/ribbon/ribbon-wrapper.component';
import { IconComponent } from './components/icon/icon.component';
import { CardComponent } from './components/card/card.component';
import { RibbonComponent } from './components/ribbon/ribbon.component';
import { RootService } from './http';
import { rootServiceMock, NEW_CATEGORY, SLOTS_CATEGORY, TOP_GAMES, TOP_CATEGORY, OTHERS_CATEGORY } from '../test-helpers/mocks';
import { By } from '@angular/platform-browser';
import { ICategory } from '../db-models/category';

const ACTIVE_CATEGORY_SELECTOR = '.whg-nav__link.-active';
const GAME_TITLE_SELECTOR = '.whg-game__title';
const GAME_SELECTOR = '.whg-game';
const CATEGORY_LINK_SELECTOR = '.whg-nav__link';

describe('AppComponent', () => {
    let fixture: ComponentFixture<AppComponent>;
    let component: any;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                AppComponent,
                GameComponent,
                CategoryFilterComponent,
                LoaderComponent,
                RibbonWrapperComponent,
                RibbonComponent,
                IconComponent,
                CardComponent
            ],
            providers: [
                { provide: RootService, useValue: rootServiceMock }
            ]
        });

        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
    });

    it('should show the correct games when load', fakeAsync(() => {
        init();

        checkActiveCategory(NEW_CATEGORY);

        checkRenderedGames(NEW_CATEGORY);
    }));

    it('should show the correct games when category is changed', fakeAsync(() => {
        init();

        checkActiveCategory(NEW_CATEGORY);

        triggerCategoryChange(SLOTS_CATEGORY);
        checkActiveCategory(SLOTS_CATEGORY);

        checkRenderedGames(SLOTS_CATEGORY);
    }));

    it('should show ribbons when Top or New category are not active', fakeAsync(() => {
        init();

        checkActiveCategory(NEW_CATEGORY);
        let ribbons = fixture.debugElement.queryAll(By.directive(RibbonComponent));
        expect(ribbons.length).toBe(0);

        triggerCategoryChange(SLOTS_CATEGORY);
        checkActiveCategory(SLOTS_CATEGORY);

        ribbons = fixture.debugElement.queryAll(By.directive(RibbonComponent));
        expect(ribbons.length).toBe(3);
        expect(ribbons[0].nativeElement.innerText).toBe(NEW_CATEGORY.id.toUpperCase());
        expect(ribbons[1].nativeElement.innerText).toBe(TOP_CATEGORY.id.toUpperCase());
        expect(ribbons[2].nativeElement.innerText).toBe(NEW_CATEGORY.id.toUpperCase());
    }));

    function init() {
        spyOn(component, 'getJackpots').and.callFake(() => {
            rootServiceMock.jackpots.get().subscribe(data => component.jackpots = data);
        });
        // Init
        advance();
        // Fetch data
        advance();
        // Filter games
        advance();
    }

    function advance() {
        fixture.detectChanges();
        tick(1000);
    }

    function checkActiveCategory(category: ICategory) {
        const activeCategory = fixture.debugElement.query(By.css(ACTIVE_CATEGORY_SELECTOR)).nativeElement;
        expect(activeCategory.innerText).toBe(category.name);
    }

    function triggerCategoryChange(category: ICategory) {
        const categoryLinks = fixture.debugElement.queryAll(By.css(CATEGORY_LINK_SELECTOR));
        const slots = categoryLinks.find(l => l.nativeElement.innerText === category.name);
        slots.triggerEventHandler('click', {});
        advance();
        advance();
    }

    function checkRenderedGames(activeCategory: ICategory) {
        const games = fixture.debugElement.queryAll(By.css(GAME_SELECTOR));
        const activeGames = component.games.filter(g => g.categories.indexOf(activeCategory.id) > -1);
        expect(games.length).toBe(activeGames.length);

        for (let i = 0; i < games.length; i++) {
            const gameTitle = games[i].query(By.css(GAME_TITLE_SELECTOR)).nativeElement;

            expect(gameTitle.innerText.toLowerCase()).toBe(activeGames[i].name.toLowerCase());
        }
    }
});
