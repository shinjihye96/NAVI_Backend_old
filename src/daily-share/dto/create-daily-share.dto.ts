import { ApiProperty } from '@nestjs/swagger';

export class CreateDailyShareDto {
  @ApiProperty({ example: 3, description: '오늘의 기분 (1~5단계)' })
  moodStep: number;

  @ApiProperty({ example: '오늘 날씨가 너무 좋아요!', description: '기분에 대한 글' })
  content: string;

  @ApiProperty({ example: 'https://image.com/photo.jpg', description: '기분 이미지 URL', required: false })
  image?: string;
}