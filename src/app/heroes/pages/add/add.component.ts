import { Component, OnInit } from '@angular/core';
import { Hero, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styles: [],
})
export class AddComponent implements OnInit {
  publishers = [
    { id: 'DC Comics', desc: 'DC - Comics' },
    { id: 'Marvel Comics', desc: 'Marvel - Comics' },
  ];

  hero: Hero;

  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.hero = this.getCleanHero();
    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.heroesService.getById(id)))
      .subscribe((hero) => (this.hero = hero));
  }

  getCleanHero(): Hero {
    return {
      superhero: '',
      alter_ego: '',
      characters: '',
      first_appearance: '',
      alt_img: '',
      publisher: Publisher.MarvelComics,
    };
  }

  ngOnInit(): void {}

  save(): void {
    if (this.hero.id) {
      this.heroesService.update(this.hero).subscribe((res) => console.log(res));
    } else {
      this.heroesService
        .create(this.hero)
        .subscribe((hero) => this.router.navigate(['/heroes', hero.id, '/edit']));
    }
  }
}
