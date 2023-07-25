import { IsString, IsInt, IsPositive, Min, MinLength } from "class-validator";

export class CreatePokemonDto {

    @IsInt()
    @IsPositive()
    @Min(1)
    no;

    @IsString()
    @MinLength(1)
    name;
}
