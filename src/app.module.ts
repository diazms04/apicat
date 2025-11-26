import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { CatsController } from './controllers/cats.controller';

// servicios
import { CatsService } from './infrastructure/http/services/cats.service';

// cliente y mappers
import { CatsApiClient } from './infrastructure/http/services/cats-api.client';
import { BreedMapper } from './infrastructure/http/services/breed.mapper';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],

  controllers: [CatsController],

  providers: [
    // servicio cats
    CatsService,

    // peticiones a la api cats
    {
      provide: 'ICatsApiClient',
      useClass: CatsApiClient,
    },
    // convertir formato de los datos
    {
      provide: 'IBreedMapper',
      useClass: BreedMapper,
    },
  ],
})
export class AppModule {}
