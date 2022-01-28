import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Slot } from 'src/components/slot/schemas/slot.schema';
import { User } from 'src/components/user/schemas/user.schema';
import { Room } from '../../room/schemas/room.schema';

export type BookingDocument = Booking & Document;

@Schema()
export class Booking {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Room' })
  room: Room;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Slot' })
  slot: Slot;

  @Prop()
  start: Date;

  @Prop()
  end: Date;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
