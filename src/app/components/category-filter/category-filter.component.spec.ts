import { TestBed, ComponentFixture } from '@angular/core/testing';
import { CategoryFilterComponent } from './category-filter.component';
import { IconComponent } from '../icon/icon.component';
import { LoaderComponent } from '../loader/loader.component';
import { RootService } from '../../http';
import { rootServiceMock, CATEGORIES, NEW_CATEGORY, SLOTS_CATEGORY } from '../../../test-helpers/mocks';
import { By } from '@angular/platform-browser';

const CATEGORY_LINK_SELECTOR = '.whg-nav__link';
const ACTIVE_CATEGORY_SELECTOR = '.-active';

describe('CategoryFilter', () => {
    let fixture: ComponentFixture<CategoryFilterComponent>;
    let component: CategoryFilterComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                CategoryFilterComponent,
                IconComponent,
                LoaderComponent
            ],
            providers: [
                { provide: RootService, useValue: rootServiceMock}
            ]
        });

        fixture = TestBed.createComponent(CategoryFilterComponent);
        component = fixture.componentInstance;
    });

    it('should show all categories', () => {
        fixture.detectChanges();

        const categoryLinks = fixture.debugElement.queryAll(By.css(CATEGORY_LINK_SELECTOR));
        expect(categoryLinks.length).toBe(CATEGORIES.length);
    });

    it('should active the default category', () => {
        fixture.detectChanges();

        const activeCategory = fixture.debugElement.query(By.css(ACTIVE_CATEGORY_SELECTOR));
        expect(activeCategory.nativeElement.innerText).toEqual(NEW_CATEGORY.name);
    });

    it('should change the active category when another one is clicked', () => {
        fixture.detectChanges();
        const links = fixture.debugElement.queryAll(By.css(CATEGORY_LINK_SELECTOR));
        const slots = links.find(l => l.nativeElement.innerText === SLOTS_CATEGORY.name);

        slots.triggerEventHandler('click', {});
        fixture.detectChanges();

        const activeCategory = fixture.debugElement.query(By.css(ACTIVE_CATEGORY_SELECTOR));
        expect(activeCategory.nativeElement.innerText).toEqual(SLOTS_CATEGORY.name);
    });
});
