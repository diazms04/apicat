import { Test, TestingModule } from '@nestjs/testing';
import { CatsService } from './cats.service';
import { ICatsApiClient } from '../interfaces/cats-api-client.interface';
import { IBreedMapper } from '../interfaces/breed-mapper.interface';
import { Breed } from '../../../domain/entities/breed.entity';
describe('CatsService', () => {
  let service: CatsService;
  let apiClient: ICatsApiClient;
  let mapper: IBreedMapper;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CatsService,
        {
          provide: 'ICatsApiClient',
          useValue: {
            getBreeds: jest.fn(),
            getBreedImages: jest.fn(),
            searchBreeds: jest.fn(),
          },
        },
        {
          provide: 'IBreedMapper',
          useValue: {
            mapBreed: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CatsService>(CatsService);
    apiClient = module.get<ICatsApiClient>('ICatsApiClient');
    mapper = module.get<IBreedMapper>('IBreedMapper');
  });

  it('should get all breeds', async () => {
    const fakeData = [{ id: '1', name: 'Persian' }] as any;
    const mapped = new Breed({ id: '1', name: 'Persian' });

    (apiClient.getBreeds as jest.Mock).mockResolvedValue(fakeData);
    (mapper.mapBreed as jest.Mock).mockReturnValue(mapped);

    const result = await service.getBreeds();
    expect(result).toEqual([mapped]);
    expect(apiClient.getBreeds).toHaveBeenCalled();
    expect(mapper.mapBreed).toHaveBeenCalledWith(fakeData[0], '');
  });

  it('should get a breed by id', async () => {
    const fakeData = [{ id: '1', name: 'Persian' }] as any;
    const fakeImage = [{ url: 'img.jpg' }] as any;
    const mapped = new Breed({ id: '1', name: 'Persian', imageUrl: 'img.jpg' });

    (apiClient.getBreeds as jest.Mock).mockResolvedValue(fakeData);
    (apiClient.getBreedImages as jest.Mock).mockResolvedValue(fakeImage);
    (mapper.mapBreed as jest.Mock).mockReturnValue(mapped);

    const result = await service.getBreedById('1');
    expect(result).toEqual(mapped);
    expect(apiClient.getBreeds).toHaveBeenCalled();
    expect(apiClient.getBreedImages).toHaveBeenCalledWith('1', 1);
  });

  it('should return null if breed not found', async () => {
    (apiClient.getBreeds as jest.Mock).mockResolvedValue([]);

    const result = await service.getBreedById('1');
    expect(result).toBeNull();
  });

  it('should search breeds', async () => {
    const fakeData = [{ id: '1', name: 'Persian' }] as any;
    const fakeImage = [{ url: 'img.jpg' }] as any;
    const mapped = new Breed({ id: '1', name: 'Persian', imageUrl: 'img.jpg' });

    (apiClient.searchBreeds as jest.Mock).mockResolvedValue(fakeData);
    (apiClient.getBreedImages as jest.Mock).mockResolvedValue(fakeImage);
    (mapper.mapBreed as jest.Mock).mockReturnValue(mapped);

    const result = await service.searchBreeds('Per');
    expect(result).toEqual([mapped]);
    expect(apiClient.searchBreeds).toHaveBeenCalledWith('Per');
    expect(apiClient.getBreedImages).toHaveBeenCalledWith('1', 1);
  });
});
