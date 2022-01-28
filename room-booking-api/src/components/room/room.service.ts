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
    const createdCompany = new this.roomModel(createCompanyDto);
    return createdCompany.save();
  }

  async findAll(): Promise<Room[]> {
    return this.roomModel.find().exec();
  }

  async delete(id: string) {
    this.roomModel.deleteOne({ _id: id }).exec();
  }

  async findAvailableRooms(startDate: Date, endDate: Date): Promise<Room[]> {
    const bookings = await this.bookingService.findAvailability(
      startDate,
      endDate,
    );
    const bookedRooms = bookings.map((e) => e.room);
    const allRooms = await this.findAll();

    let availableRooms = [];
    for (var room of allRooms) {
      if (bookedRooms.find((r) => r.name === room.name) === undefined) {
        availableRooms.push(room);
      }
    }
    return availableRooms;
  }
}
