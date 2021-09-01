import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hero } from '../../interfaces/heroes';
import { HeroesService } from '../../services/heroes.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styles: [],
})
export class HeroComponent implements OnInit {
  hero: Hero | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private heroesService: HeroesService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.heroesService.getById(id)))
      .subscribe((hero) => (this.hero = hero));
  }
}
