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

@ApiTags('DailyShare') // Swagger 상단의 태그로 그룹 묶기
@Controller('daily-share')
export class DailyShareController {
  constructor(private readonly dailyShareService: DailyShareService) {}

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
  @ApiOperation({ summary: '게시글 생성', description: '새로운 하루공유 게시글을 생성합니다.' })
  @ApiBody({ description: '게시글 내용', type: Object }) // DTO가 있다면 그걸 넣는 게 좋아
  @ApiResponse({ status: 201, description: '생성 성공' })
  create(@Body() body: any) {
    return this.dailyShareService.create(body);
  }

  @Patch(':id')
  @ApiOperation({ summary: '게시글 수정', description: '기존 게시글을 수정합니다.' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ description: '수정 내용', type: Object }) // DTO 대체 가능
  @ApiResponse({ status: 200, description: '수정 성공' })
  update(@Param('id') id: string, @Body() body: any) {
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