import { GameComponent } from './game.component';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { NEW_GAMES, JACKPOTS } from '../../../test-helpers/mocks';
import { By } from '@angular/platform-browser';
import { IconComponent } from '../icon/icon.component';
import { CardComponent } from '../card/card.component';
import { Component, Input } from '@angular/core';

const GAMES_SELECTOR = '.whg-game';
const GAME_JACKPOT_SELECTOR = '.whg-game__jackpot';

@Component({
    selector: 'whg-ribbon-wrapper',
    template: '<div></div>'
})
class FakeRibbonWrapperComponent {
    @Input() categories;
}

describe('GameComponent', () => {
    let fixture: ComponentFixture<GameComponent>;
    let component: GameComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                GameComponent,
                FakeRibbonWrapperComponent,
                IconComponent,
                CardComponent
            ]
        });
        fixture = TestBed.createComponent(GameComponent);
        component = fixture.componentInstance;
    });

    it('should show all games', () => {
        setData(NEW_GAMES, JACKPOTS);

        const games = fixture.debugElement.queryAll(By.css(GAMES_SELECTOR));
        expect(games.length).toEqual(NEW_GAMES.length);
    });

    it('should show only one jackpot with corrent value', () => {
        setData(NEW_GAMES, JACKPOTS);

        const jackpots = fixture.debugElement.queryAll(By.css(GAME_JACKPOT_SELECTOR));
        expect(jackpots[0].nativeElement.textContent).toContain(JACKPOTS[0].amount);

        const hiddenJackpotDisplayStyle = getComputedStyle(jackpots[1].nativeElement).display;
        expect(hiddenJackpotDisplayStyle).toBe('none');
    });

    it('should show no results if no games are provided', () => {
        setData([], []);

        const card = fixture.debugElement.query(By.directive(CardComponent));
        expect(card).toBeTruthy();

        expect(fixture.nativeElement.textContent).toContain('No games found');
    });

    function setData(games, jackpots) {
        component.games = games;
        component.jackpots = jackpots;
        fixture.detectChanges();

    }
});
