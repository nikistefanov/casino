import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IGame } from '../../../db-models/game';
import { IJackpot } from '../../../db-models/jackpot';
import { ICategory } from '../../../db-models/category';
import { IRibbonData } from '../ribbon/ribbon.component';
import { NEW_CATEGORY_ID, TOP_CATEGORY_ID } from '../../http/services/category.service';

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

    setRibbonData(categories: string[]) {
        const notTopOrNewCategoryActive = this.activeCategory.id !== NEW_CATEGORY_ID && this.activeCategory.id !== TOP_CATEGORY_ID;
        const hasNewCategory = categories.some(c => c === NEW_CATEGORY_ID);
        const hasTopCategory = categories.some(c => c === TOP_CATEGORY_ID);
        const visible = notTopOrNewCategoryActive && (hasNewCategory || hasTopCategory);

        if (visible) {
            const text = hasNewCategory ? NEW_CATEGORY_ID : TOP_CATEGORY_ID;
            const look = hasNewCategory ? '' : 'light';
            const ribbonData: IRibbonData = {
                visible,
                text,
                look
            };

            return ribbonData;
        }

        return null;
    }
}
