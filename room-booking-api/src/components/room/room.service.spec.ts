import { Test, TestingModule } from '@nestjs/testing';
import { RoomService } from './room.service';
import { Room } from './schemas/room.schema';
import { MongoMock } from '../../mock/mongoMock';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { BookingService } from '../booking/booking.service';
import { Booking } from '../booking/schemas/booking.schema';

describe('RoomService', () => {
  let service: RoomService;
  let mongoMockRoom: MongoMock = new MongoMock();
  let mongoMockBooking: MongoMock = new MongoMock();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoomService,
        BookingService,
        {
          provide: getModelToken(Room.name),
          useValue: mongoMockRoom,
        },
        {
          provide: getModelToken(Booking.name),
          useValue: mongoMockBooking,
        },
      ],
    }).compile();

    service = module.get<RoomService>(RoomService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
