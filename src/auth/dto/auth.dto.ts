import { IsNotEmpty, IsString, IsEmail, Length } from 'class-validator';

export class AuthDto {
  @IsNotEmpty()
  @IsString()
  public name: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  public email: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 20, { message: 'Passowrd has to be at between 3 and 20 chars' })
  public password: string;
}
export class AuthSigninDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  public email: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 20, { message: 'Passowrd has to be at between 3 and 20 chars' })
  public password: string;
}


export class AuthBiometricDto {
    @IsNotEmpty()
    @IsString()
    public biometricKey: string;
}