import { Controller, Get, Param, Query } from '@nestjs/common';
import { CatsService } from '../infrastructure/http/services/cats.service';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  // devolver lista de todas las razas
  @Get('breeds')
  getBreeds() {
    return this.catsService.getBreeds();
  }

  // buscar razas según el texto que se envie
  @Get('breeds/search')
  searchBreeds(@Query('q') query: string) {
    return this.catsService.searchBreeds(query);
  }

  // devolver información de una raza según el id
  @Get('breeds/:breed_id')
  getBreedById(@Param('breed_id') breedId: string) {
    return this.catsService.getBreedById(breedId);
  }
}
