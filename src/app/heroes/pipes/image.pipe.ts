import { Pipe, PipeTransform } from '@angular/core';
import { Hero } from '../interfaces/heroes';

@Pipe({
  name: 'image',
})
export class ImagePipe implements PipeTransform {
  transform(hero: Hero): string {
    return `assets/heroes/${hero.id}.jpg`;
  }
}
