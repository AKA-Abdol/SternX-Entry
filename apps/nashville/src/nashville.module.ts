import { Module } from '@nestjs/common';
import { NashvilleController } from './nashville.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'GALLATIN_GRPC',
        transport: Transport.GRPC,
        options: {
          package: 'gallatin',
          protoPath: join(__dirname, '../gallatin/proto/gallatin.proto'),
        },
      },
    ]),
  ],
  controllers: [NashvilleController],
})
export class NashvilleModule {}
