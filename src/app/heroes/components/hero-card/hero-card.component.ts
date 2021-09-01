import { Component, Input } from '@angular/core';
import { Hero } from '../../interfaces/heroes';

@Component({
  selector: 'app-hero-card',
  templateUrl: './hero-card.component.html',
  styles: [],
})
export class HeroCardComponent {
  @Input()
  hero: Hero | undefined;
}
