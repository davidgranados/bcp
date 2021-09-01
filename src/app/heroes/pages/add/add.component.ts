import { Component, OnInit } from '@angular/core';
import { Hero, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styles: [
    `
      img {
        width: 100%;
        border-radius: 10px;
      }
    `,
  ],
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
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.hero = this.getCleanHero();
    if (this.router.url.includes('add')) {
      return;
    }
    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.heroesService.getById(id)))
      .subscribe((hero) => (this.hero = hero));
  }

  ngOnInit(): void {}

  showSnackBar(message: string): void {
    this._snackBar.open(message, 'X', {
      duration: 5000,
    });
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

  save(): void {
    if (this.hero.id) {
      this.heroesService.update(this.hero).subscribe((res) => this.showSnackBar('Hero Updated!'));
    } else {
      this.heroesService
        .create(this.hero)
        .subscribe((hero) => {
            this.router.navigate(['/heroes', hero.id, 'edit']);
            this.showSnackBar('Hero Created!');
        }
        );
    }
  }

  delete(): void {
    if (this.hero.id) {
      this.heroesService.delete(this.hero.id).subscribe(() => {
        this.router.navigate(['/heroes/list']);
      });
    }
  }
}
