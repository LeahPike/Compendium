import {Component, OnInit} from '@angular/core';
import {Character} from './data/character';
import {Class} from './data/class';
import {Race} from './data/race';
import {GameDataService} from './services/game-data.service';
import {BattleNetService} from './services/battle-net.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  characters: Character[] = [];
  classes: Class[] = [];
  races: Race[] = [];

  constructor(private gameDataService: GameDataService) {

  }

  ngOnInit() {
    this.characters = this.gameDataService.characters;
  }
}
