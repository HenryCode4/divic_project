import { ForbiddenException, Injectable } from '@nestjs/common';
import { SignUpInput } from './dto/signup-input'; 
import { UpdateAuthInput } from './dto/update-auth.input';
import { PrismaService } from 'prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import {ConfigService} from '@nestjs/config';
import * as argon from 'argon2';
import { SignInInput } from './dto/signin-input';
import { BiometricInInput } from './dto/biometric-response';

@Injectable()
export class AuthService {
  //configService to read env file, jwt to help sign token
  constructor(private prisma:PrismaService, private jwtService:JwtService, private configService:ConfigService){}
  async signup(signUpInput: SignUpInput) {
    try {
      const hashedPassword = await argon.hash(signUpInput.password);
  
      // Create a new user in the database
      const user = await this.prisma.user.create({
        data: {
          name: signUpInput.name,
          email: signUpInput.email,
          password: hashedPassword
        }
      });
  
      // Create tokens for the user
      const { accessToken, refreshToken } = await this.createTokens(user.id, user.email);
  
      // Update the refresh token for the user
      await this.updateRefreshToken(user.id, refreshToken);
  
      // Return tokens or any other data as needed
      return { accessToken, refreshToken, user };
    } catch (error) {
      // Handle any errors that occur during signup process
      console.error('Error during signup:', error);
      throw new Error('Failed to sign up');
    }
  }

  async biometric(biometricInInput: BiometricInInput) {
    const user = await this.prisma.user.findUnique({
      where: {biometricKey: biometricInInput.biometricKey}})
      
      if(!user){
        throw new ForbiddenException('Access Denied')
      }


      const {accessToken, refreshToken} = await this.createTokens(user.id, user.email)
  
      await this.updateRefreshToken(user.id, refreshToken)
      return {accessToken, refreshToken, user}
  
    }
  async signin(signInInput: SignInInput) {
    const user = await this.prisma.user.findUnique({
      where: {email: signInInput.email}})
      
      if(!user){
        throw new ForbiddenException('Access Denied')
      }

      const isMatch = await argon.verify(user.password, signInInput.password)

      if(!isMatch){
        throw new ForbiddenException('Access Denied')
      }

      const {accessToken, refreshToken} = await this.createTokens(user.id, user.email)
  
      await this.updateRefreshToken(user.id, refreshToken)
      return {accessToken, refreshToken, user}
  
    }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthInput: UpdateAuthInput) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }


  // in here we will create our access token and jwt token
  async createTokens(userId: string, email: string){
    const accessToken = this.jwtService.sign({
      userId,
      email,
    }, {expiresIn: '10s', secret: this.configService.get('ACCESS_TOKEN_SECRET')});
    const refreshToken = this.jwtService.sign({
      userId,
      email,
      accessToken,
    }, {expiresIn: '7d', secret: this.configService.get('REFRESH_TOKEN_SECRET')})

    return {accessToken, refreshToken}
  }

  async updateRefreshToken(userId: string, refreshToken: string){
    const hashedRefreshToken = await argon.hash(refreshToken)
    await this.prisma.user.update({where: {id:userId}, data: {refreshToken: hashedRefreshToken}})
  }

  async logout(userId: string){
    await this.prisma.user.updateMany({
      where: {
        id: userId,
        refreshToken: {not: null},
      },
      data: {refreshToken: null}
    })
    return {loggedOut: true}
  }
}
