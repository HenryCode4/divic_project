import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import {ConfigModule} from '@nestjs/config'
import { PrismaService } from 'prisma/prisma.service';
import { APP_GUARD } from '@nestjs/core';
import { AccessTokenGuard } from './auth/guards/accessToken.guard';



@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    PrismaModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
    }),
    AuthModule, 
    UserModule,
  ],
  controllers: [],
  providers: [PrismaService, {provide: APP_GUARD, useClass: AccessTokenGuard}]
  
})
export class AppModule {}
