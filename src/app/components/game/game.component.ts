import { Component, Input} from '@angular/core';
import { IGame } from '../../../db-models/game';
import { IJackpot } from '../../../db-models/jackpot';

@Component({
    selector: 'whg-game',
    templateUrl: './game.component.html'
})
export class GameComponent {
    @Input() games: IGame[];
    @Input() jackpots: IJackpot[];

    getJackpot(id: string): number {
        const jackpot = this.jackpots.find(j => j.game === id);

        if (jackpot) {
            return jackpot.amount;
        }

        return null;
    }
}
