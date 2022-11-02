import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class AddMovementDTO {
  @IsNumber()
  @IsNotEmpty()
  playerId
    
  @IsNumber()
  @IsNotEmpty()
  gameId
    
  @IsNumber()
  @IsNotEmpty()
  movementValue
    
  @IsNumber()
  @IsNotEmpty()
  oldValue
    
  @IsNumber()
  @IsNotEmpty()
  valueAdded
}
