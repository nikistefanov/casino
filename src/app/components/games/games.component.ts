import { Component, Input } from '@angular/core';
import { IGame } from '../../../db-models/game';
import { IJackpot } from '../../../db-models/jackpot';

@Component({
    selector: 'whg-games',
    templateUrl: './games.component.html'
})
export class GamesComponent {
    @Input() games: IGame[];
    @Input() jackpots: IJackpot[];

    getJackpot(id: string): number {
        const jackpot = this.jackpots.find(j => j.game === id);

        if (jackpot) {
            return jackpot.amount;
        }

        return null;
    }

    getRibbonCategory(categories: string[]): string {
        const newCategory = categories.find(c => c === 'new');
        const topCategory = categories.find(c => c === 'top');

        if (newCategory) {
            return 'NEW';
        }

        if (topCategory) {
            return 'TOP';
        }

        return null;
    }
}
