import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString, MinLength} from 'class-validator'

@InputType()
export class BiometricInInput {

  @IsNotEmpty()
  @IsString()
  @Field()
  @MinLength(6, { message: 'ID must be at most 6 characters long' })
  biometricKey: string
}
