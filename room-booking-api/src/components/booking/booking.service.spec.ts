import { Test, TestingModule } from '@nestjs/testing';
import { BookingService } from './booking.service';
import { Booking } from './schemas/booking.schema';
import { MongoMock } from '../../mock/mongoMock';
import { getModelToken } from '@nestjs/mongoose';

describe('BookingService', () => {
  let service: BookingService;
  const mongoMock: MongoMock = new MongoMock();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookingService,
        {
          provide: getModelToken(Booking.name),
          useValue: mongoMock,
        },
      ],
    }).compile();

    service = module.get<BookingService>(BookingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
