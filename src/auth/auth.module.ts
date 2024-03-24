import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'prisma/prisma.service'; // Import PrismaService
import {JwtModule} from '@nestjs/jwt';


@Module({
  imports: [JwtModule],
  controllers: [AuthController],
  providers: [AuthService, PrismaService], // Include PrismaService as a provider
})
export class AuthModule {}