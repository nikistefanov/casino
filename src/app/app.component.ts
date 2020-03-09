import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, Subscription, Observable } from 'rxjs';
import { startWith, switchMapTo, delay } from 'rxjs/operators';
import { IJackpot } from '../db-models/jackpot';
import { IGame } from '../db-models/game';
import { RootService } from './http';
import { ICategory } from '../db-models/category';

const REQUEST_INTERVAL = 1000;

@Component({
    selector: 'whg-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {
    isLoading = true;
    jackpots: IJackpot[] = [];
    filteredGames: IGame[] = [];
    defaultCategory: ICategory;

    private games: IGame[] = [];
    private dataSubscriptions: Subscription[] = [];

    constructor(private rootService: RootService) {}

    ngOnInit() {
        this.getGamesData();
        this.getJackpotsData();
    }

    ngOnDestroy() {
        this.dataSubscriptions.forEach(sub => sub.unsubscribe());
    }

    onCategoryChange(category: ICategory) {
        this.filteredGames = this.games.filter(g => g.categories.indexOf(category.id) > -1);
    }

    private getGamesData(): void {
        const gameSubscription = this.rootService.games.get().pipe(
            delay(REQUEST_INTERVAL)
        ).subscribe((games: IGame[]) => {
            this.games = games;
            this.getDefaultCategory();

            this.isLoading = false;
        });

        this.dataSubscriptions.push(gameSubscription);
    }

    private getJackpotsData(): void {
        const jackpotSubscription = interval(REQUEST_INTERVAL).pipe(
            startWith(),
            switchMapTo(this.rootService.jackpots.get())
        )
        .subscribe((jackpots: IJackpot[]) => {
            this.jackpots = jackpots;
        });

        this.dataSubscriptions.push(jackpotSubscription);
    }

    private getDefaultCategory() {
        const defaultCategorySubscription = this.rootService.categories.getDefault().subscribe((category: ICategory) => {
            this.defaultCategory = category;

            this.onCategoryChange(this.defaultCategory);
        });

        this.dataSubscriptions.push(defaultCategorySubscription);
    }
}
