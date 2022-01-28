import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Company } from '../../company/schemas/company.schema';

export type SlotDocument = Slot & Document;

@Schema()
export class Slot {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Company' })
  company: Company;

  @Prop({
    unique: true,
  })
  name: string;
}

export const SlotSchema = SchemaFactory.createForClass(Slot);
