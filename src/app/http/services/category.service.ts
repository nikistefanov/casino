import { ApiService } from '../api.service';
import { Observable, of } from 'rxjs';
import { ICategory } from '../../../db-models/category';

const CATEGORIES: ICategory[] = [
    {
        id: 'top',
        name: 'Top Games'
    },
    {
        id: 'new',
        name: 'New Games'
    },
    {
        id: 'slots',
        name: 'Slots'
    },
    {
        id: 'jackpots',
        name: 'Jackpots'
    },
    {
        id: 'live',
        name: 'Live'
    },
    {
        id: 'blackjack',
        name: 'Blackjack'
    },
    {
        id: 'roulette',
        name: 'Roulette'
    },
    {
        id: 'table',
        name: 'Table'
    },
    {
        id: 'poker',
        name: 'Poker'
    },
    {
        id: 'other',
        name: 'Other'
    }
];

export const TOP_CATEGORY_ID = 'top';
export const NEW_CATEGORY_ID = 'new';
export const OTHER_CATEGORY_ID = 'other';

export class CategoryService extends ApiService {
    get(): Observable<ICategory[]> {
        return of(CATEGORIES);
    }

    getDefault(): Observable<ICategory> {
        return of(CATEGORIES[1]);
    }
}


