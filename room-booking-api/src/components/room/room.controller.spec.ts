import { Test, TestingModule } from '@nestjs/testing';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';
import { getModelToken } from '@nestjs/mongoose';
import { MongoMock } from '../../mock/mongoMock';
import { Room } from './schemas/room.schema';
import { BookingService } from '../booking/booking.service';
import { Booking } from '../booking/schemas/booking.schema';

describe('RoomController', () => {
  let controller: RoomController;
  const mongoMockRoom: MongoMock = new MongoMock();
  const mongoMockBooking: MongoMock = new MongoMock();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoomController],
      providers: [
        RoomService,
        {
          provide: getModelToken(Room.name),
          useValue: mongoMockRoom,
        },
        BookingService,
        {
          provide: getModelToken(Booking.name),
          useValue: mongoMockBooking,
        },
      ],
    }).compile();

    controller = module.get<RoomController>(RoomController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
