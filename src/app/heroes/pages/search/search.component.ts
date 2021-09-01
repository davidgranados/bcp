import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

import { Hero } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [],
})
export class SearchComponent implements OnInit {
  query: string = '';
  heroes: Hero[] = [];
  selectedHero: Hero | null = null;

  constructor(private heroesService: HeroesService) {}

  ngOnInit(): void {}

  searching(): void {
    const query = this.query.trim();
    if (query.length) {
      this.heroesService
        .getSuggestions(query)
        .subscribe((heroes) => (this.heroes = heroes));
    } else {
      this.heroes = [];
    }
  }

  selectedOption(event: MatAutocompleteSelectedEvent) {
    const hero: Hero = event.option.value;

    if (!hero) {
      this.selectedHero = null;
      return;
    }

    this.query = hero.superhero;

    if (typeof hero.id === 'string') {
      this.heroesService
        .getById(hero.id)
        .subscribe((hero) => (this.selectedHero = hero));
    }
  }
}
