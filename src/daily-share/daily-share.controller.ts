import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { DailyShareService } from './daily-share.service';

@Controller('daily-share')
export class DailyShareController {
  constructor(private readonly dailyShareService: DailyShareService) {}

  @Get()
  findAll() {
    return this.dailyShareService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dailyShareService.findOne(Number(id));
  }

  @Post()
  create(@Body() body: any) {
    return this.dailyShareService.create(body);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.dailyShareService.update(Number(id), body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dailyShareService.remove(Number(id));
  }
}
