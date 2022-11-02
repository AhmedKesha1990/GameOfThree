import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class InitGameDTO {
    @IsNumber()
    @IsNotEmpty()
    playerOneId: number
    
    @IsNumber()
    @IsNotEmpty()
    playerTwoId
}