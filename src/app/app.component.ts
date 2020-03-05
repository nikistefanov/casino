import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, Subscription, Observable } from 'rxjs';
import { startWith, switchMapTo, delay } from 'rxjs/operators';
import { IJackpot } from '../db-models/jackpot';
import { IGame } from '../db-models/game';
import { RootService } from '../http';

const JACKPOT_REQUEST_INTERVAL = 1000;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
    isLoading = true;
    jackpots: IJackpot[] = [];
    games: IGame[] = [];
    private jackpotSubscription: Subscription;
    private gameSubscription: Subscription;

    constructor(private rootService: RootService) {}

    ngOnInit() {
        this.gameSubscription = this.rootService.games.get().pipe(
            delay(JACKPOT_REQUEST_INTERVAL)
        ).subscribe((games: IGame[]) => {
            this.games = games;
            this.isLoading = false;
        });

        this.jackpotSubscription = this.subscribeForJackpots().subscribe((jackpots: IJackpot[]) => {
            this.jackpots = jackpots;
        });
    }

    ngOnDestroy() {
        this.gameSubscription.unsubscribe();
        this.jackpotSubscription.unsubscribe();
    }

    getJackpot(id: string): number {
        const jackpot = this.jackpots.find(j => j.game === id);

        if (jackpot) {
            return jackpot.amount;
        }

        return null;
    }

    private subscribeForJackpots(): Observable<IJackpot[]> {
        return interval(JACKPOT_REQUEST_INTERVAL).pipe(
            startWith(),
            switchMapTo(this.rootService.jackpots.get())
        );
    }
}
