import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { Slot, SlotDocument } from './schemas/slot.schema';
import { CreateSlotDto } from './dto/create-slot.dto';
import { BookingService } from '../booking/booking.service';

@Injectable()
export class SlotService {
  constructor(
    @InjectModel(Slot.name) private slotModel: Model<SlotDocument>,
    private bookingService: BookingService,
  ) {}

  async create(createCompanyDto: CreateSlotDto): Promise<Slot> {
    const createdCompany = await this.slotModel.create(createCompanyDto);
    return createdCompany;
  }

  async findAll(): Promise<Slot[]> {
    return this.slotModel.find().populate('company').exec();
  }

  async findAvailableSlots(
    startDate: Date,
    endDate: Date,
    companyId: string,
  ): Promise<Slot[]> {
    const bookings = await this.bookingService.findAvailabilityOnCompany(
      startDate,
      endDate,
      companyId,
    );

    const slots = bookings.map((e) => e.slot);

    const filterSlots = await this.slotModel.aggregate([
      {
        $match: {
          _id: { $nin: slots },
          company: new Types.ObjectId(companyId),
        },
      },
    ]);

    return filterSlots;
  }

  async findById(id: string): Promise<Slot> {
    return this.slotModel.findById(id).exec();
  }

  async delete(id: string) {
    const result = await this.slotModel.deleteOne({ _id: id }).exec();
    return result.deletedCount > 0;
  }
}
