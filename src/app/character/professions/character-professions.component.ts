import {Component, OnDestroy, OnInit} from '@angular/core';
import {GameDataService} from '../../services/game-data.service';
import {Character} from '../../data/character';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-professions-list',
  templateUrl: './character-professions.component.html'
})
export class CharacterProfessionsComponent implements OnInit, OnDestroy {

  characters: Character[] = [];
  characterSubscription: Subscription;

  constructor(private gameDataService: GameDataService) {
  }

  ngOnInit(): void {
    this.characterSubscription = this.gameDataService.characterSubject.subscribe((characters) => this.characters = characters);
  }

  ngOnDestroy(): void {
    this.characterSubscription.unsubscribe();
  }
}
