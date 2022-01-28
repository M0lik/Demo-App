import { IsDate } from "class-validator";
import { Type } from "class-transformer";

export class CreateBookingDto {
  user: string;
  
  slot: string;
  
  room: string;
  
  @Type(() => Date)
  @IsDate()
  start: Date;

  @Type(() => Date)
  @IsDate()
  end: Date;
}
