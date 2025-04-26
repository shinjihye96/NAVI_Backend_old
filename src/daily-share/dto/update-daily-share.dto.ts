import { PartialType } from '@nestjs/swagger';
import { CreateDailyShareDto } from './create-daily-share.dto';

export class UpdateDailyShareDto extends PartialType(CreateDailyShareDto) {}