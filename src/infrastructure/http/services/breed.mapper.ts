import { Injectable } from '@nestjs/common';
import {
  Breed,
  BreedProps,
  BreedApiResponse,
} from '../../../domain/entities/breed.entity';
import { IBreedMapper } from '../interfaces/breed-mapper.interface';

@Injectable()
export class BreedMapper implements IBreedMapper {
  // tomar datos que vienen de la API y convertirlos al modelo interno
  mapBreed(data: BreedApiResponse, imageUrl = ''): Breed {
    const props: BreedProps = {
      id: data.id,
      name: data.name,
      origin: data.origin || 'Unknown',
      temperament: data.temperament || 'Unknown',
      weight: data.weight?.metric || 'Unknown',
      imageUrl,
    };

    // retornar datos tranformados
    return new Breed(props);
  }
}
