import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { JackpotService } from './services/jackpot.service';
import { GameService } from './services/game.service';
import { CategoryService } from './services/category.service';

@Injectable()
export class RootService extends ApiService {
    jackpots: JackpotService;
    games: GameService;
    categories: CategoryService;

    constructor(http: HttpClient) {
        super(http);
        this.jackpots = new JackpotService(http);
        this.games = new GameService(http);
        this.categories = new CategoryService(http);
    }
}
