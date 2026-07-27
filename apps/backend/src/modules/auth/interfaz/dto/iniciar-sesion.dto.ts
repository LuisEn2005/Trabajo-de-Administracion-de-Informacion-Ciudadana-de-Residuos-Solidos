import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class IniciarSesionDto {
  @IsEmail()
  @MaxLength(150)
  email!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(100)
  password!: string;
}
