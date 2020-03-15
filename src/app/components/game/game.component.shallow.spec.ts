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

fdescribe('GameComponent isolated tests', () => {
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

    it('should render all games', () => {
        setData();

        const games = fixture.debugElement.queryAll(By.css(GAMES_SELECTOR));
        expect(games.length).toEqual(NEW_GAMES.length);
    });

    it('should render only one jackpot with corrent value', () => {
        setData();

        const jackpot = fixture.debugElement.queryAll(By.css(GAME_JACKPOT_SELECTOR));
        expect (jackpot.length).toEqual(1);
        expect(jackpot[0].nativeElement.textContent).toContain(JACKPOTS[0].amount);
    });

    function setData() {
        component.games = NEW_GAMES;
        component.jackpots = JACKPOTS;
        fixture.detectChanges();

    }
});
