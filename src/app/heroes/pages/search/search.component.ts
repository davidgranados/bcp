import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

import { Hero } from '../../interfaces/heroes';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [],
})
export class SearchComponent implements OnInit {
  query: string = '';
  heroes: Hero[] = [];
  selectedHero!: Hero;

  constructor(private heroesService: HeroesService) {}

  ngOnInit(): void {}

  searching(): void {
    this.heroesService
      .getSuggestions(this.query)
      .subscribe((heroes) => (this.heroes = heroes));
  }

  selectedOption(event: MatAutocompleteSelectedEvent) {
    const hero: Hero = event.option.value;
    this.query = hero.superhero;

    if (typeof hero.id === 'string') {
      this.heroesService
        .getById(hero.id)
        .subscribe((hero) => (this.selectedHero = hero));
    }
  }
}
