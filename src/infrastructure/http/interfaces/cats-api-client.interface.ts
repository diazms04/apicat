import {
  BreedApiResponse,
  ImageApiResponse,
} from '../../../domain/entities/breed.entity';

// definir lo que el client de cats debe hacer
export interface ICatsApiClient {
  getBreeds(): Promise<BreedApiResponse[]>;
  getBreedImages(breedId: string, limit?: number): Promise<ImageApiResponse[]>;
  searchBreeds(query: string): Promise<BreedApiResponse[]>;
}
