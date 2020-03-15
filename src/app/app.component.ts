import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { startWith, switchMapTo, delay } from 'rxjs/operators';
import { IJackpot } from '../db-models/jackpot';
import { IGame } from '../db-models/game';
import { RootService } from './http';
import { ICategory } from '../db-models/category';
import { OTHER_CATEGORY_ID } from './http/services/category.service';
import { ActiveCategoryService } from './services/active-category.service';

const REQUEST_INTERVAL = 1000;
const CATEGORY_PARAM = 'category';

@Component({
    selector: 'whg-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {
    isLoading = true;
    isGamesLoading = false;
    jackpots: IJackpot[] = [];
    categories: ICategory[] = [];
    filteredGames: IGame[] = [];
    activeCategoryId: string;

    private games: IGame[] = [];
    private subscriptions: Subscription[] = [];

    constructor(private rootService: RootService, private activeCategoryService: ActiveCategoryService) { }

    ngOnInit() {
        this.getGames();
        this.getJackpots();
        this.getCategories();
        this.subscribeToCategoryChange();
    }

    ngOnDestroy() {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }

    onCategoryChange(category: ICategory) {
        if (category.id === this.activeCategoryId) {
            return;
        }

        this.activeCategoryService.setActiveCategory(category.id);
    }

    private subscribeToCategoryChange() {
        this.isGamesLoading = true;

        this.activeCategoryService.activeCategoryId.subscribe(activeCategoryId => {
            this.filteredGames = this.filterGames(activeCategoryId);

            this.isGamesLoading = false;
        });
    }

    private getGames(): void {
        const gameSubscription = this.rootService.games.get().pipe(
            delay(REQUEST_INTERVAL)
        ).subscribe((games: IGame[]) => {
            this.games = games;

            this.isLoading = false;
        });

        this.subscriptions.push(gameSubscription);
    }

    private getJackpots(): void {
        const jackpotSubscription = interval(REQUEST_INTERVAL).pipe(
            startWith(),
            switchMapTo(this.rootService.jackpots.get())
        )
            .subscribe((jackpots: IJackpot[]) => {
                this.jackpots = jackpots;
            });

        this.subscriptions.push(jackpotSubscription);
    }

    private getCategories(): void {
        const categoriesSubscription = this.rootService.categories.get().subscribe((categories: ICategory[]) => {
            this.categories = categories;
        });

        this.subscriptions.push(categoriesSubscription);
    }

    private filterGames(categoryId: string): IGame[] {
        if (categoryId === OTHER_CATEGORY_ID) {
            return this.games.filter(g => {
                let categoryFound = false;
                g.categories.forEach(gc => categoryFound = this.categories.some(c => c.id === gc));

                return !categoryFound;
            });
        }

        const fil = this.games.filter(g => {
            if (g.categories && g.categories.indexOf(categoryId) > -1) {
                return true;
            }

            return false;
        });

        return fil;
    }
}
