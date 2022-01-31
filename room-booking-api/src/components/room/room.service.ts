import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Room, RoomDocument } from './schemas/room.schema';
import { CreateRoomDto } from './dto/create-room.dto';
import { BookingService } from '../booking/booking.service';

@Injectable()
export class RoomService {
  constructor(
    @InjectModel(Room.name) private roomModel: Model<RoomDocument>,
    private bookingService: BookingService,
  ) {}

  async create(createCompanyDto: CreateRoomDto): Promise<Room> {
    const createdCompany = await this.roomModel.create(createCompanyDto);
    return createdCompany;
  }

  async findAll(): Promise<Room[]> {
    return this.roomModel.find().exec();
  }

  async delete(id: string) {
    const result = await this.roomModel.deleteOne({ _id: id }).exec();
    return result.deletedCount > 0;
  }

  async findAvailableRooms(startDate: Date, endDate: Date): Promise<Room[]> {
    const bookings = await this.bookingService.findAvailability(
      startDate,
      endDate,
    );
    const bookedRooms = bookings.map((e) => e.room);
    const allRooms = await this.findAll();

    const availableRooms = [];
    for (const room of allRooms) {
      if (bookedRooms.find((r) => r.name === room.name) === undefined) {
        availableRooms.push(room);
      }
    }
    return availableRooms;
  }
}
