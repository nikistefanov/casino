import { of } from 'rxjs';
import { async } from 'rxjs/internal/scheduler/async';

export const NEW_GAMES = [
    {
        categories: [
            'top',
            'slots',
            'new'
        ],
        name: 'The Wish Master',
        image: '//stage.whgstage.com/scontent/images/games/NETHEWISHMASTER.jpg',
        id: 'NEJACKANDTHEBEANSTALK'
    },
    {
        categories: [
            'top',
            'slots',
            'new'
        ],
        name: 'Aliens',
        image: '//stage.whgstage.com/scontent/images/games/NEALIENS.jpg',
        id: 'NEALIENS'
    }
];

export const TOP_GAMES = [{
    categories: [
        'top',
        'slots',
        'new'
    ],
    name: 'Gonzo\'s Quest',
    image: '//stage.whgstage.com/scontent/images/games/NEGONZOSQUEST.jpg',
    id: 'NEGONZOSQUEST'
}];

export const OTHER_GAMES = [
    {
        categories: [
            'classic'
        ],
        name: 'Baccarat',
        image: '//stage.whgstage.com/scontent/images/games/BSBACCARAT.jpg',
        id: 'LEPABLOPICASSOSLOT'
    },
    {
        categories: [
            'virtual'
        ],
        name: 'Craps',
        image: '//stage.whgstage.com/scontent/images/games/BSCRAPS.jpg',
        id: 'BSCRAPS'
    }
];

export const JACKPOTS = [
    {
        game: 'NEJACKANDTHEBEANSTALK',
        amount: 104507
    },
    {
        game: 'LEPABLOPICASSOSLOT',
        amount: 50163
    }
];

export const NEW_CATEGORY = {
    id: 'top',
    name: 'Top Games'
};

export const CATEGORIES = [[
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
        id: 'other',
        name: 'Other'
    }
]];

export const rootServiceMock = {
    jackpots: {
        get() {
            return of(JACKPOTS, async);
        }
    },
    games: {
        get() {
            const games = [...NEW_GAMES, ...TOP_GAMES, ...OTHER_GAMES];
            return of(games, async);
        }
    },
    categories: {
        get() {
            return of(CATEGORIES, async);
        },
        getDefault() {
            return of(NEW_CATEGORY, async);
        }
    }
};
