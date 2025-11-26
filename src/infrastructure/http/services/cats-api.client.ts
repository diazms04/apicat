import { Injectable } from '@nestjs/common';
import {
  BreedApiResponse,
  ImageApiResponse,
} from '../../../domain/entities/breed.entity';
import { ICatsApiClient } from '../interfaces/cats-api-client.interface';

@Injectable()
export class CatsApiClient implements ICatsApiClient {
  private readonly apiKey = process.env.CAT_API_KEY!;
  private readonly baseUrl = process.env.CAT_API_BASE_URL!;

  private getHeaders(): Record<string, string> {
    return { 'x-api-key': this.apiKey };
  }

  // traer  todas las razas de gatos desde la API externa en crudo
  async getBreeds(): Promise<BreedApiResponse[]> {
    const res = await fetch(`${this.baseUrl}/breeds`, {
      headers: this.getHeaders(),
    });

    if (!res.ok) throw new Error('Error fetching breeds');

    return (await res.json()) as BreedApiResponse[];
  }

  // traer las imagenes de una raza  por ID - 1 sola imagen
  async getBreedImages(
    breedId: string,
    limit = 1,
  ): Promise<ImageApiResponse[]> {
    const res = await fetch(
      `${this.baseUrl}/images/search?breed_ids=${breedId}&limit=${limit}`,
      {
        headers: this.getHeaders(),
      },
    );

    if (!res.ok) return [];
    return (await res.json()) as ImageApiResponse[];
  }

  // buscar las razas que coincidan con el texto ingresado
  async searchBreeds(query: string): Promise<BreedApiResponse[]> {
    const res = await fetch(
      `${this.baseUrl}/breeds/search?q=${encodeURIComponent(query)}`,
      {
        headers: this.getHeaders(),
      },
    );

    if (!res.ok) throw new Error('Error searching breeds');

    return (await res.json()) as BreedApiResponse[];
  }
}
