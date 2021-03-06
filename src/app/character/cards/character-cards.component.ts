import {Component, OnDestroy, OnInit} from '@angular/core';
import {GameDataService} from '../../services/game-data.service';
import {Character} from '../../data/character';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-character-cards',
  templateUrl: './character-cards.component.html'
})
export class CharacterCardsComponent implements OnInit, OnDestroy {

  characters: Character[] = [];
  characterSubscription: Subscription;

  constructor(private gameDataService: GameDataService) { }

  ngOnInit(): void {
    this.characterSubscription = this.gameDataService.characterSubject.subscribe((characters) => this.characters = characters);
  }

  ngOnDestroy(): void {
    this.characterSubscription.unsubscribe();
  }
}
