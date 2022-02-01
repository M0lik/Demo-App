import { Test, TestingModule } from '@nestjs/testing';
import { RoomService } from './room.service';
import { Room } from './schemas/room.schema';
import { MongoMock } from '../../mock/mongoMock';
import { getModelToken } from '@nestjs/mongoose';
import { BookingService } from '../booking/booking.service';
import { Booking } from '../booking/schemas/booking.schema';
import { CreateRoomDto } from './dto/create-room.dto';

const createData: CreateRoomDto = {
  name: 'testRoom',
};
const createData2: CreateRoomDto = {
  name: 'testRoom2',
};

describe('RoomService', () => {
  let service: RoomService;
  let bookingService: BookingService;
  const mongoMockRoom: MongoMock = new MongoMock();
  const mongoMockBooking: MongoMock = new MongoMock();

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
    bookingService = module.get<BookingService>(BookingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be call the create method in the model', () => {
    expect(service.create).toBeDefined();
  });

  it('should add data', async () => {
    await service.create(createData);
    expect(mongoMockRoom.data).toEqual([{ ...createData, _id: '0' }]);
  });

  it('should find all data', async () => {
    await service.create(createData2);
    const res = await service.findAll();

    expect(res).toEqual([
      { ...createData, _id: '0' },
      { ...createData2, _id: '1' },
    ]);
  });

  it('should find available rooms', async () => {
    const book = new Booking();
    book.room = new Room();
    book.room.name = 'testRoom2';

    jest
      .spyOn(bookingService, 'findAvailability')
      .mockImplementation(async (): Promise<Booking[]> => [book]);

    const res = await service.findAvailableRooms(new Date(), new Date());

    expect(res).toEqual([{ ...createData, _id: '0' }]);
  });

  it('should delete data by id', async () => {
    expect(await service.findAll()).toEqual([
      { ...createData, _id: '0' },
      { ...createData2, _id: '1' },
    ]);

    const res = await service.delete('1');
    expect(res).toBeTruthy();

    expect(await service.findAll()).toEqual([{ ...createData, _id: '0' }]);
  });

  it('should fail to delete', async () => {
    expect(await service.findAll()).toEqual([{ ...createData, _id: '0' }]);

    const res = await service.delete('3');
    expect(res).toBeFalsy();

    expect(await service.findAll()).toEqual([{ ...createData, _id: '0' }]);
  });
});
