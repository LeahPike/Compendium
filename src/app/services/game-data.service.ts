import {Injectable} from '@angular/core';
import {Race} from '../data/race';
import {Class} from '../data/class';
import {Character} from '../data/character';
import {BattleNetService} from './battle-net.service';
import {Achievement} from '../data/achievement';

import 'rxjs/add/observable/forkJoin';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class GameDataService {

  achievementsLegion: Achievement[] = [];
  achievementsBFA: Achievement[] = [];
  characters: Character[] = [];
  classes: Class[] = [];
  races: Race[] = [];

  constructor(private battleNetService: BattleNetService) {

    console.log('GameDataService', 'constructor');

    this.loadCharacters();
    this.loadAchievementsLegion();
    this.loadAchievementsBFA();
  }

  loadCharacters() {
    Observable.forkJoin(
      // load  base data
      this.battleNetService.getClasses(),
      this.battleNetService.getRaces()
    ).subscribe(([classes, races]) => {

      this.classes = classes;
      this.races = races;
      // this.achievements = achievements;

      const myCharacters = [];
      myCharacters.push('azjol-nerub/asumi');
      myCharacters.push('azjol-nerub/lexiss');
      myCharacters.push('azjol-nerub/livana');
      myCharacters.push('azjol-nerub/mayara');
      myCharacters.push('azjol-nerub/salus');
      myCharacters.push('azjol-nerub/sheeta');
      myCharacters.push('azjol-nerub/siasan');
      myCharacters.push('azjol-nerub/snowise');
      myCharacters.push('azjol-nerub/sunzie');
      myCharacters.push('azjol-nerub/talah');
      myCharacters.push('azjol-nerub/valiah');
      myCharacters.push('azjol-nerub/zirelle');

      // myCharacters.push ('azjol-nerub/sameera');
      // myCharacters.push ('khadgar/Zyrin');

      const observableBatch = [];
      for (const character of myCharacters) {
        observableBatch.push(this.battleNetService.getCharacter(character));
      }
      Observable.forkJoin(observableBatch).subscribe((result: Character[]) => {

        for (const character of result) {

          // https://dev.battle.net/docs/read/community_apis/world_of_warcraft/Character_Renders
          character.imageInset = 'http://render-eu.worldofwarcraft.com/character/' + character.thumbnail.replace('avatar', 'insert');
          character.imageMain = 'http://render-eu.worldofwarcraft.com/character/' + character.thumbnail.replace('avatar', 'main');
          character.imageAvatar = 'http://render-eu.worldofwarcraft.com/character/' + character.thumbnail;

          character.professions.primary
            .sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0);

          character.professions.secondary
            .sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0);

          this.characters.push(character);
        }
        // sort characters by achievement points
        this.characters
          .sort((a, b) => a.achievementPoints < b.achievementPoints ? 1 : a.achievementPoints > b.achievementPoints ? -1 : 0);
      });

    });
  }

  loadAchievementsBFA() {

    const achievements = [];
    achievements.push(12918); // Have a Heart
    achievements.push(12544); // Level 120

    const observableBatch = [];
    for (const achievement of achievements) {
      observableBatch.push(this.battleNetService.getAchievement(achievement));
    }
    Observable.forkJoin(observableBatch).subscribe((result: Achievement[]) => {
      for (const achievement of result) {
        this.achievementsBFA.push(achievement);
      }
    });
  }

  loadAchievementsLegion() {

      const achievements = [];
      achievements.push(10671); // Level 110
      achievements.push(11171); // Arsenal of Power
      achievements.push(10461); // Fighting with Style: Classic
      achievements.push(10994); // A Glorious Campaign
      achievements.push(11223); // Legendary Research
      achievements.push(10459); // Improving on History
      achievements.push(11298); // A Classy Outfit
      achievements.push(11546); // Breaching the Tomb

      const observableBatch = [];
      for (const achievement of achievements) {
        observableBatch.push(this.battleNetService.getAchievement(achievement));
      }
      Observable.forkJoin(observableBatch).subscribe((result: Achievement[]) => {
        for (const achievement of result) {
          this.achievementsLegion.push(achievement);
        }
      });
  }

  findClass(id: number): Class {
    for (const entry of this.classes) {
      if (id === entry.id) {
        return entry;
      }
    }
  }

  findRace(id: number): Race {
    for (const entry of this.races) {
      if (id === entry.id) {
        return entry;
      }
    }
  }

  getClassColour(classNumber: number) {
    switch (classNumber) {
      case 6: // Death Knight
        return '#C41F3B';
      case 12: // Demon Hunter
        return '#A330C9';
      case 11: // Druid
        return '#FF7D0A';
      case 3: // Hunter
        return '#ABD473';
      case 8: // Mage
        return '#69CCF0';
      case 10: // Monk
        return '#00FF96';
      case 2: // Paladin
        return '#F58CBA';
      case 5: // Priest
        return '#FFFFFF';
      case 4: // Rogue
        return '#FFF569';
      case 7: // Shaman
        return '#0070DE';
      case 9: // Warlock
        return '#9482C9';
      case 1: // Warrior
        return '#C79C6E';
    }
  }
}
