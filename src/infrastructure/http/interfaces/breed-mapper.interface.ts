import { Breed } from '../../../domain/entities/breed.entity';
import { BreedApiResponse } from '../../../domain/entities/breed.entity';

// definir cómo debe funcionar el mapper de razas
export interface IBreedMapper {
  mapBreed(breed: BreedApiResponse, imageUrl: string): Breed;
}
