import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BookingModule } from './components/booking/booking.module';
import { MongooseModule } from '@nestjs/mongoose';
import { RoomModule } from './components/room/room.module';
import { SlotModule } from './components/slot/slot.module';
import { CompanyModule } from './components/company/company.module';
import { AuthModule } from './components/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/RoomBooking'),
    BookingModule,
    RoomModule,
    SlotModule,
    CompanyModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
