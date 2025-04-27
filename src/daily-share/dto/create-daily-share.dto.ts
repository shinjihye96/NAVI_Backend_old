import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { MoodType } from '../mood-type.enum';

export class CreateDailyShareDto {
  @ApiProperty({ 
    example: MoodType.SUN, 
    enum: MoodType,
    description: '오늘의 기분 (sun, sunAndCloud, cloud, rain, storm | 5단계)' 
  })
  @IsEnum(MoodType)
  moodStep: MoodType;

  @ApiProperty({ example: '오늘 날씨가 너무 좋아요!', description: '기분에 대한 글' })
  content: string;

  @ApiProperty({ example: 'https://image.com/photo.jpg', description: '기분 이미지 URL', required: false })
  image?: string;
}