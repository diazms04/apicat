import { Injectable, Inject } from '@nestjs/common';
import type { ICatsApiClient } from '../interfaces/cats-api-client.interface';
import type { IBreedMapper } from '../interfaces/breed-mapper.interface';
import { Breed } from '../../../domain/entities/breed.entity';

@Injectable()
export class CatsService {
  constructor(
    @Inject('ICatsApiClient')
    private readonly apiClient: ICatsApiClient,

    @Inject('IBreedMapper')
    private readonly mapper: IBreedMapper,
  ) {}

  // traer todas las razas desde la API externa y convertirlas al modelo interno
  async getBreeds(): Promise<Breed[]> {
    const data = await this.apiClient.getBreeds();

    return data.map((b) => this.mapper.mapBreed(b, b.image?.url ?? ''));
  }

  // buscar raza por  ID
  async getBreedById(breedId: string): Promise<Breed | null> {
    const breeds = await this.apiClient.getBreeds();
    const found = breeds.find((b) => b.id === breedId);

    if (!found) return null;

    const images = await this.apiClient.getBreedImages(breedId, 1);
    const imageUrl = images[0]?.url ?? '';

    return this.mapper.mapBreed(found, imageUrl);
  }

  // buscar razas que coincidan con el texto ingresado
  async searchBreeds(query: string): Promise<Breed[]> {
    const data = await this.apiClient.searchBreeds(query);

    return Promise.all(
      data.map(async (b) => {
        const images = await this.apiClient.getBreedImages(b.id, 1);
        const imageUrl = images[0]?.url ?? '';
        return this.mapper.mapBreed(b, imageUrl);
      }),
    );
  }
}
