import { Controller, Get, Post, Param, Body, Delete } from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { GetRoomsDto } from './dto/get-rooms.dto';
import { Room } from './schemas/room.schema';

@Controller('room')
export class RoomController {
  constructor(private company: RoomService) {}

  @Post()
  async create(@Body() createRoomDto: CreateRoomDto) {
    return this.company.create(createRoomDto);
  }

  @Get()
  async findAll(): Promise<Room[]> {
    return this.company.findAll();
  }

  @Post('/findAvailableRooms')
  async findAvailableRooms(@Body() getRoomsDto: GetRoomsDto): Promise<Room[]> {
    return this.company.findAvailableRooms(getRoomsDto.startDate, getRoomsDto.endDate);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<string> {
    await this.company.delete(id);
    return `id ${id} removed`;
  }
}
