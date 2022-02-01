import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Booking, BookingDocument } from './schemas/booking.schema';
import { CreateBookingDto } from './dto/create-booking.dto';
import { Types } from 'mongoose';

@Injectable()
export class BookingService {
  constructor(
    @InjectModel(Booking.name) private bookingModel: Model<BookingDocument>,
  ) {}

  async create(createBookingDto: CreateBookingDto): Promise<Booking> {
    const createdBooking = new this.bookingModel(createBookingDto);
    return createdBooking.save();
  }

  async findAll(): Promise<Booking[]> {
    const tmp = await this.bookingModel
      .find()
      .populate({
        path: 'slot',
        populate: {
          path: 'company',
        },
      })
      .populate('room')
      .populate({
        path: 'user',
        populate: {
          path: 'company',
        },
      })
      .exec();
    return tmp;
  }

  async findUserBooking(userId: string): Promise<Booking[]> {
    const tmp = await this.bookingModel
      .find({ user: userId })
      .populate({
        path: 'slot',
        populate: {
          path: 'company',
        },
      })
      .populate('room')
      .populate({
        path: 'user',
        populate: {
          path: 'company',
        },
      })
      .exec();

    return tmp;
  }

  async findAvailabilityOnCompany(
    startDate: Date,
    endDate: Date,
    companyId: string,
  ): Promise<Booking[]> {
    const data = await this.bookingModel.aggregate([
      {
        $match: 
          {$or:[
            //overlap on begin
            {$and: [{start: {$lte : startDate}},{end: {$gte : startDate}}  ]},
            //overlap on end
            {$and: [{start: {$lte : endDate}},{end: {$gte : endDate}}  ]},
            //contain
            {$and: [{start: {$gte : startDate}},{end: {$lte : endDate}}  ]},
            //total overlap
            {$and: [{start: {$lte : startDate}},{end: {$gte : endDate}}  ]},
          ]},
      },
      {
        $lookup: {
          from: 'slots',
          localField: 'slot',
          foreignField: '_id',
          as: 'slotData',
        },
      },
      {
        $addFields: {
          companyId: '$slotData.company',
        },
      },
      { $unwind: '$companyId' },
      {
        $match: {
          companyId: new Types.ObjectId(companyId),
        },
      },
    ]);
    return data;
  }

  async findBookingsBetweenDate(startDate: Date, endDate: Date): Promise<Booking[]> {
    const searchParams = {};
    searchParams['start'] = { $gte: startDate };
    searchParams['end'] = { $lte: endDate };

    const tmp = await this.bookingModel
      .find({$or:[
        //overlap on begin
        {$and: [{start: {$lte : startDate}},{end: {$gte : startDate}}  ]},
        //overlap on end
        {$and: [{start: {$lte : endDate}},{end: {$gte : endDate}}  ]},
        //contain
        {$and: [{start: {$gte : startDate}},{end: {$lte : endDate}}  ]},
        //total overlap
        {$and: [{start: {$lte : startDate}},{end: {$gte : endDate}}  ]},
      ]})
      .populate('slot')
      .populate('room')
      .populate('user')
      .exec();
    return tmp;
  }

  async findById(id: string): Promise<Booking> {
    return this.bookingModel.findById(id).exec();
  }

  async delete(id: string) {
    this.bookingModel.deleteOne({ _id: id }).exec();
  }
}
