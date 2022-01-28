import { Module } from '@nestjs/common';
import { RoomController } from './room.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Room, RoomSchema } from './schemas/room.schema';
import { RoomService } from './room.service';
import { BookingModule } from '../booking/booking.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Room.name, schema: RoomSchema }]),
    BookingModule
  ],
  providers: [RoomService],
  controllers: [RoomController],
})
export class RoomModule {}
