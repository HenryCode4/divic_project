import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

//@Global prevents from calling it everywhere
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}