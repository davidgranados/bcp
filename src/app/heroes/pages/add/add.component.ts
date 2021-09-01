import { Component, OnInit } from '@angular/core';
import { Hero, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

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

  hero: Hero = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    alt_img: '',
    publisher: Publisher.MarvelComics,
  };

  constructor(private heroesService: HeroesService) {}

  ngOnInit(): void {}

  save(): void {
    if (this.hero.superhero.trim().length === 0) {
      return;
    }
    this.heroesService.create(this.hero).subscribe((res) => console.log(res));
  }
}
