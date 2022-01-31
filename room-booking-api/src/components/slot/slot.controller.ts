import { Controller, Get, Post, Param, Body, Delete } from '@nestjs/common';
import { SlotService } from './slot.service';
import { CreateSlotDto } from './dto/create-slot.dto';
import { Slot } from './schemas/slot.schema';
import { GetSlotsDto } from './dto/get-slots.dto';

@Controller('slot')
export class SlotController {
  constructor(private slotService: SlotService) {}

  @Post()
  async create(@Body() createSlotDto: CreateSlotDto) {
    return this.slotService.create(createSlotDto);
  }

  @Get()
  async findAll(): Promise<Slot[]> {
    return this.slotService.findAll();
  }

  @Post('/findAvailableSlots')
  async findAvailableSlots(@Body() getSlots: GetSlotsDto): Promise<Slot[]> {
    return this.slotService.findAvailableSlots(
      getSlots.startDate,
      getSlots.endDate,
      getSlots.companyId,
    );
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<string> {
    await this.slotService.delete(id);
    return `id ${id} removed`;
  }
}
