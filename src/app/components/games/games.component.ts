import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IGame } from '../../../db-models/game';
import { IJackpot } from '../../../db-models/jackpot';
import { ICategory } from '../../../db-models/category';

@Component({
    selector: 'whg-games',
    templateUrl: './games.component.html'
})
export class GamesComponent implements OnChanges {
    @Input() games: IGame[];
    @Input() jackpots: IJackpot[];
    @Input() activeCategory: ICategory;

    ngOnChanges(changes: SimpleChanges) {
        const gamesChange = changes.games;

        if (gamesChange && !gamesChange.isFirstChange()) {
            console.log(changes);
        }
    }

    getJackpot(id: string): number {
        const jackpot = this.jackpots.find(j => j.game === id);

        if (jackpot) {
            return jackpot.amount;
        }

        return null;
    }
}
