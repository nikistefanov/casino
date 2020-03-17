import { of } from 'rxjs';

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
            'slots'
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
        id: 'BSBACCARAT'
    },
    {
        categories: [
            'virtual'
        ],
        name: 'Virtual World Cup',
        image: '//stage.whgstage.com/scontent/images/games/NYXVIRTUALWORLDCUP.jpg',
        id: 'NYXVIRTUALWORLDCUP'
    },
    {
        categories: [
            'virtual'
        ],
        name: 'Touchdown',
        image: '//stage.whgstage.com/scontent/images/games/NYXTOUCHDOWN.jpg',
        id: 'NYXTOUCHDOWN'
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
    id: 'new',
    name: 'New Games'
};

export const TOP_CATEGORY = {
    id: 'top',
    name: 'Top Games'
};

export const SLOTS_CATEGORY = {
    id: 'slots',
    name: 'Slots'
};

export const OTHERS_CATEGORY = {
    id: 'others',
    name: 'Others'
};

export const CATEGORIES = [
    TOP_CATEGORY,
    NEW_CATEGORY,
    SLOTS_CATEGORY,
    OTHERS_CATEGORY
];


export const rootServiceMock = {
    categories: {
        get() {
            return of(CATEGORIES);
        },
        getDefault() {
            return of(NEW_CATEGORY);
        }
    },
    games: {
        get() {
            return of([...NEW_GAMES, ...TOP_GAMES, ...OTHER_GAMES]);
        }
    },
    jackpots: {
        get() {
            return of(JACKPOTS);
        }
    }
};
