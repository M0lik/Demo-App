import { Controller, Get, Post, Param, Body, Delete } from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { Booking } from './schemas/booking.schema';

@Controller('booking')
export class BookingController {
  constructor(private booking: BookingService) {}

  @Post()
  async create(@Body() createBookingDto: CreateBookingDto) {
    return this.booking.create(createBookingDto);
  }

  @Get()
  async findAll(): Promise<Booking[]> {
    return this.booking.findAll();
  }

  @Get('/findUserBookings/:userId')
  async findUserBookings(@Param('userId') userId: string): Promise<Booking[]> {
    return this.booking.findUserBooking(userId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Booking> {
    return this.booking.findById(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<string> {
    await this.booking.delete(id);
    return `id ${id} removed`;
  }
}
