import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { AuthBiometricDto, AuthDto, AuthSigninDto } from './dto/auth.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import {jwtSecret} from '../utils/constants';
import { Request, Response } from 'express';
import { log } from 'console';

//this is where the logic is done
@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private jwt: JwtService){}

    async signup(dto:AuthDto){
        //confirming validation from dto
        const {name, email, password} = dto;

        const foundUser = await this.prisma.user.findUnique({where: {email}})

        if(foundUser){
            throw new BadRequestException("Email already exist");
        }
        
        const hashedPassword = await this.hashPassword(password)

        await this.prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        })
        
        return {message: 'signup was successful'}
    }



    async signin(dto:AuthSigninDto, req:Request, res: Response){
        const {email, password} = dto

        const foundUser = await this.prisma.user.findUnique({where: {email}})

        if(!foundUser){
            throw new BadRequestException("Wrong credentials");
        }

        const isMatch = await this.comparePasswords({
            password, 
            hash: foundUser.password 
        })

        if(!isMatch){
            throw new BadRequestException("Wrong credentials");
        }

        //sign jwt  and return user
        const token = await this.signToken({
            id: foundUser.id,
            email: foundUser.email
        })
        
        if(!token){
            throw new ForbiddenException()
        }

        //token is passed to the cookie
        res.cookie('token', token)

        return res.send({message: 'Logged in successfully'})
    }

    

    //
    async biometric(biometricKey: string, req: Request, res: Response) {
        const foundUser = await this.prisma.user.findUnique({ where: { biometricKey } });
            
        if (!foundUser) {
            throw new BadRequestException("Wrong credentials");
        }

        // You may want to perform additional checks or validations here before comparing biometric keys

        const isMatch = await this.compareBiometric({
            biometricKey, 
            backendBiometricKey: foundUser.biometricKey 
        });

        if (!isMatch) {
            throw new BadRequestException("Wrong credentials");
        }

        const token = await this.signToken({
            id: foundUser.id,
            email: foundUser.email
        });

        if (!token) {
            throw new ForbiddenException();
        }

        res.cookie('token', token);

        return res.send({ message: 'Logged in successfully' });
    }



    //sign out will be to clean token from the client 
    async signout( req: Request, res: Response){
        res.clearCookie('token')
        return res.send({message: 'Logged out successfully'});
    }


    //hashing the password here
    async hashPassword(password: string){
        const saltOrRounds = 10;
        return await bcrypt.hash(password, saltOrRounds);
       
    }

    //password compare for login
    async comparePasswords(args: {password: string, hash: string}){
        return await bcrypt.compare(args.password, args.hash);
    }


    //compare biometric with this function
    // async compareBiometric(args: {biometricKey: string}){
    //     return await args.biometric;
    // }

    async compareBiometric(args: { biometricKey: string; backendBiometricKey: string }): Promise<boolean> {
        // Compare the biometricKey with the value from the backend
        return args.biometricKey === args.backendBiometricKey;
    }

    //sign token using jwt
    async signToken(args: {id: string, email: string}){
        const payload = args

        return this.jwt.signAsync(payload, {secret: jwtSecret})
    }
}
