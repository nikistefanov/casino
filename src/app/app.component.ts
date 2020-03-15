import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, Subscription, of, timer } from 'rxjs';
import { startWith, switchMapTo, delay } from 'rxjs/operators';
import { IJackpot } from '../db-models/jackpot';
import { IGame } from '../db-models/game';
import { RootService } from './http';
import { ICategory } from '../db-models/category';
import { OTHER_CATEGORY_ID } from './http/services/category.service';

const REQUEST_INTERVAL = 1000;

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

    private games: IGame[] = [];
    private subscriptions: Subscription[] = [];

    constructor(private rootService: RootService) { }

    ngOnInit() {
        this.getGames();
        this.getJackpots();
        this.getCategories();
    }

    ngOnDestroy() {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }

    onCategoryChange(category: ICategory) {
        this.isGamesLoading = true;

        timer(REQUEST_INTERVAL / 2).subscribe(() => {
            this.filteredGames = this.filterGames(category.id);

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
