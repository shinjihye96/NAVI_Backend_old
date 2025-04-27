import { ApiProperty } from '@nestjs/swagger';
import { ShareStatus } from '../share-status.enum';

class ProfileDto {
    @ApiProperty({ example: 1 })
    id: number;

    @ApiProperty({ example: 'NAVI' })
    name: string;

    @ApiProperty({ example: 'https://...' })
    profileImage: string;
}

class PostDto {
    @ApiProperty({ example: '', description: '날씨만 등록했을 때는 moodStep이, 완료 시엔 content만' })
    moodStep?: string;

    @ApiProperty({ example: '오늘 기분이 좋아요!', description: '본문 내용', default: '' })
    content: string;

    @ApiProperty({ example: 'https://...', description: '이미지 URL', default: '' })
    image: string;

    @ApiProperty({ example: '2025-04-27T06:00:00.000Z' })
    createdAt: string;
}

export class MyShareResponseDto {
    @ApiProperty({ type: ProfileDto })
    profile: ProfileDto;

    @ApiProperty({ type: PostDto })
    post: PostDto;

    @ApiProperty({ example: '맑은 날씨를 다른 나비들에게 공유해주세요!' })
    message: string;

    @ApiProperty({ enum: ShareStatus })
    status: ShareStatus;
}