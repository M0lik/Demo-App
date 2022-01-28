import { Module } from '@nestjs/common';
import { SlotController } from './slot.controller';
import { MongooseModule } from '@nestjs/mongoose';

import { SlotService } from './slot.service';
import { Slot, SlotSchema } from './schemas/slot.schema';
import { CompanyModule } from '../company/company.module';
import { BookingModule } from '../booking/booking.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Slot.name, schema: SlotSchema }]),
    CompanyModule,
    BookingModule,
  ],
  providers: [SlotService],
  controllers: [SlotController],
})
export class SlotModule {}
