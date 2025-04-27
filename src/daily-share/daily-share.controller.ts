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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { CreateDailyShareDto } from './dto/create-daily-share.dto';
import { UpdateDailyShareDto } from './dto/update-daily-share.dto';
import { MyShareResponseDto } from './dto/my-share-response.dto';

@ApiTags('DailyShare') // Swagger 상단의 태그로 그룹 묶기
@Controller('daily-share')
export class DailyShareController {
  constructor(private readonly dailyShareService: DailyShareService) {}

  // 내 기분만 조회
  @Get('me')
  @ApiOperation({ summary: '내 기분 조회' })
  @ApiResponse({
    status: 200,
    description: '프로필·게시글·메시지·상태 반환',
    type: MyShareResponseDto,
  })
  getMyShare(): Promise<MyShareResponseDto> {
    return this.dailyShareService.findMyShare();
  }

  // 하루공유 게시글 관련
  @Get()
  @ApiOperation({ summary: '전체 게시글 조회', description: '전체 게시글 목록을 가져옵니다.' })
  @ApiResponse({ status: 200, description: '조회 성공' })
  findAll() {
    return this.dailyShareService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: '게시글 단건 조회', description: 'ID에 해당하는 게시글을 가져옵니다.' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: '조회 성공' })
  findOne(@Param('id') id: string) {
    return this.dailyShareService.findOne(Number(id));
  }

  @Post()
  @ApiOperation({ summary: '게시글 생성' })
  @ApiBody({ type: CreateDailyShareDto })
  create(@Body() body: CreateDailyShareDto) {
    return this.dailyShareService.create(body);
  }

  @Patch(':id')
  @ApiOperation({ summary: '게시글 수정' })
  @ApiBody({ type: UpdateDailyShareDto })
  update(@Param('id') id: string, @Body() body: UpdateDailyShareDto) {
    return this.dailyShareService.update(Number(id), body);
  }

  @Delete(':id')
  @ApiOperation({ summary: '게시글 삭제', description: 'ID에 해당하는 게시글을 삭제합니다.' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: '삭제 성공' })
  remove(@Param('id') id: string) {
    return this.dailyShareService.remove(Number(id));
  }
}