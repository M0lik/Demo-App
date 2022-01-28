import { IsDate } from "class-validator";
import { Type } from "class-transformer";

export class GetSlotsDto {
  @Type(() => Date)
  @IsDate()
  startDate: Date;
  
  @Type(() => Date)
  @IsDate()
  endDate: any;
 
  companyId: string;
}
