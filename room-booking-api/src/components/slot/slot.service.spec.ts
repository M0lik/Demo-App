import { Test, TestingModule } from '@nestjs/testing';
import { BookingService } from '../booking/booking.service';
import { Booking } from '../booking/schemas/booking.schema';
import { SlotService } from './slot.service';
import { getModelToken } from '@nestjs/mongoose';
import { Slot } from './schemas/slot.schema';
import { MongoMock } from '../../mock/mongoMock';
import { CreateSlotDto } from './dto/create-slot.dto';

const createData: CreateSlotDto = {
  company: '61efce6dec6862b4eb5da3f3',
  name: 'slotName',
};
const createData2: CreateSlotDto = {
  company: '61efce6dec6862b4eb5da3f3',
  name: 'slotName2',
};

describe('SlotService', () => {
  let service: SlotService;
  const mongoMockSlot: MongoMock = new MongoMock();
  const mongoMockBooking: MongoMock = new MongoMock();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookingService,
        {
          provide: getModelToken(Booking.name),
          useValue: mongoMockBooking,
        },
        SlotService,
        {
          provide: getModelToken(Slot.name),
          useValue: mongoMockSlot,
        },
      ],
    }).compile();

    service = module.get<SlotService>(SlotService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should add data', async () => {
    await service.create(createData);
    expect(mongoMockSlot.data).toEqual([{ ...createData, _id: '0' }]);
  });

  it('should find all data', async () => {
    await service.create(createData2);
    const res = await service.findAll();

    expect(res).toEqual([
      { ...createData, _id: '0' },
      { ...createData2, _id: '1' },
    ]);
  });

  it('should find by id', async () => {
    const res = await service.findById('1');
    expect(res).toEqual({ ...createData2, _id: '1' });
  });

  it('should fail to find by id', async () => {
    const res = await service.findById('6');
    expect(res).toBeNull();
  });

  it('should findAvailableSlots', async () => {
    // let book = new Booking();
    // book.slot = new Slot();
    // book.slot.name = 'slotName2';
    // jest
    // .spyOn(bookingService, 'findAvailabilityOnCompany')
    // .mockImplementation(
    //   async (startDate: Date, endDate: Date): Promise<Booking[]> => [book],
    // );
    // const res = await service.findAvailableSlots(new Date(), new Date(), '61efce6dec6862b4eb5da3f3');
    // expect(res).toBeNull();
    //Stuck on
    // $match: {
    //   _id: { $nin: slots },
    //   company: new Types.ObjectId(companyId),
    // },
    // mock
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
