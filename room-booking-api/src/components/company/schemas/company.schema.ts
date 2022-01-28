import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CompanyDocument = Company & Document;

@Schema()
export class Company {
  @Prop({
    unique: true,
  })
  name: string;
}

export const CompanySchema = SchemaFactory.createForClass(Company);
