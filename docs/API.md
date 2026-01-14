# NAVI API 명세서

## 개요

- **Base URL**: `http://localhost:3000/api`
- **인증 방식**: JWT (Bearer Token)
- **응답 형식**: JSON

---

## 공통 응답 형식

### 성공 응답
```json
{
  "success": true,
  "data": { ... }
}
```

### 에러 응답
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "에러 메시지"
  }
}
```

### 공통 에러 코드
| 코드 | HTTP Status | 설명 |
|------|-------------|------|
| UNAUTHORIZED | 401 | 인증 필요 |
| FORBIDDEN | 403 | 권한 없음 |
| NOT_FOUND | 404 | 리소스 없음 |
| VALIDATION_ERROR | 400 | 입력값 오류 |
| INTERNAL_ERROR | 500 | 서버 오류 |

---

# 1. 인증 (Auth)

## 1.1 회원가입

**POST** `/auth/signup`

### Request Body
```json
{
  "email": "user@example.com",
  "password": "password123",
  "phone": "01012345678",
  "name": "홍길동",
  "nickname": "길동이",
  "gender": "male",
  "birthDate": "1990-01-15",
  "userType": "patient_caregiver",
  "userStatus": "fighting",
  "region": "서울시 강남구",
  "hospital": "서울대병원",
  "patient": {
    "name": "홍아들",
    "gender": "male",
    "birthDate": "2015-03-20",
    "cancerTypeId": 1,
    "cancerStage": "stage_2",
    "diagnosisDate": "2024-01-15",
    "recoveryDate": null
  }
}
```

### Request Fields
| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| email | string | ✅ | 이메일 |
| password | string | ✅ | 비밀번호 (8자 이상) |
| phone | string | ✅ | 전화번호 |
| name | string | ✅ | 실명 |
| nickname | string | ✅ | 닉네임 (2-12자) |
| gender | string | | male / female |
| birthDate | string | | 생년월일 (YYYY-MM-DD) |
| userType | string | ✅ | patient_caregiver / recovered_caregiver / patient / recovered |
| userStatus | string | ✅ | fighting / recovered |
| region | string | | 거주지역 |
| hospital | string | | 이용 병원 |
| patient | object | | 환자 정보 (보호자인 경우) |

### Response (201 Created)
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "nickname": "길동이",
      "userType": "patient_caregiver"
    },
    "accessToken": "jwt_token_here",
    "refreshToken": "refresh_token_here"
  }
}
```

---

## 1.2 로그인

**POST** `/auth/login`

### Request Body
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

### Response (200 OK)
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "nickname": "길동이",
      "userType": "patient_caregiver",
      "profileImage": "https://..."
    },
    "accessToken": "jwt_token_here",
    "refreshToken": "refresh_token_here"
  }
}
```

---

## 1.3 토큰 갱신

**POST** `/auth/refresh`

### Request Body
```json
{
  "refreshToken": "refresh_token_here"
}
```

### Response (200 OK)
```json
{
  "success": true,
  "data": {
    "accessToken": "new_jwt_token",
    "refreshToken": "new_refresh_token"
  }
}
```

---

## 1.4 로그아웃

**POST** `/auth/logout`

### Headers
```
Authorization: Bearer {accessToken}
```

### Response (200 OK)
```json
{
  "success": true,
  "data": {
    "message": "로그아웃 되었습니다."
  }
}
```

---

# 2. 사용자 (Users)

## 2.1 내 정보 조회

**GET** `/users/me`

### Headers
```
Authorization: Bearer {accessToken}
```

### Response (200 OK)
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "email": "user@example.com",
    "phone": "01012345678",
    "name": "홍길동",
    "nickname": "길동이",
    "gender": "male",
    "birthDate": "1990-01-15",
    "profileImage": "https://...",
    "userType": "patient_caregiver",
    "userStatus": "fighting",
    "region": "서울시 강남구",
    "hospital": "서울대병원",
    "createdAt": "2024-01-01T00:00:00Z",
    "patient": {
      "name": "홍아들",
      "gender": "male",
      "birthDate": "2015-03-20",
      "cancerType": "백혈병",
      "cancerStage": "stage_2",
      "diagnosisDate": "2024-01-15"
    },
    "stats": {
      "followersCount": 10,
      "followingCount": 5,
      "dailySharesCount": 30
    }
  }
}
```

---

## 2.2 프로필 수정

**PATCH** `/users/me`

### Headers
```
Authorization: Bearer {accessToken}
```

### Request Body
```json
{
  "nickname": "새닉네임",
  "profileImage": "https://...",
  "region": "서울시 서초구"
}
```

### Response (200 OK)
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "nickname": "새닉네임",
    "profileImage": "https://...",
    "updatedAt": "2024-01-15T10:00:00Z"
  }
}
```

---

## 2.3 다른 사용자 프로필 조회

**GET** `/users/:userId`

### Headers
```
Authorization: Bearer {accessToken}
```

### Response (200 OK)
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "nickname": "다른유저",
    "profileImage": "https://...",
    "userType": "patient",
    "userStatus": "fighting",
    "cancerType": "백혈병",
    "diagnosisDate": "2024-01-15",
    "stats": {
      "followersCount": 20,
      "followingCount": 15,
      "dailySharesCount": 45
    },
    "isFollowing": false
  }
}
```

---

## 2.4 닉네임 중복 확인

**GET** `/users/check-nickname?nickname={nickname}`

### Response (200 OK)
```json
{
  "success": true,
  "data": {
    "available": true
  }
}
```

---

# 3. 하루공유 (Daily Shares)

## 3.1 하루공유 작성

**POST** `/daily-shares`

### Headers
```
Authorization: Bearer {accessToken}
```

### Request Body
```json
{
  "mood": "good",
  "content": "오늘은 기분이 좋아요!",
  "imageUrl": "https://...",
  "isPrivate": false
}
```

### Request Fields
| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| mood | string | ✅ | very_good / good / normal / bad / very_bad |
| content | string | | 일기 내용 (최대 100자) |
| imageUrl | string | | 이미지 URL |
| isPrivate | boolean | | 비공개 여부 (기본: false) |

### Response (201 Created)
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "mood": "good",
    "content": "오늘은 기분이 좋아요!",
    "imageUrl": "https://...",
    "isPrivate": false,
    "createdAt": "2024-01-15T10:00:00Z"
  }
}
```

---

## 3.2 하루공유 목록 조회

**GET** `/daily-shares`

### Headers
```
Authorization: Bearer {accessToken}
```

### Query Parameters
| 파라미터 | 타입 | 필수 | 설명 |
|----------|------|------|------|
| filter | string | | all / caregiver / patient (기본: all) |
| date | string | | 조회 날짜 (YYYY-MM-DD, 기본: 오늘) |
| page | number | | 페이지 번호 (기본: 1) |
| limit | number | | 페이지당 개수 (기본: 20) |

### Response (200 OK)
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "uuid",
        "user": {
          "id": "uuid",
          "nickname": "길동이",
          "profileImage": "https://...",
          "userType": "patient_caregiver",
          "userStatus": "fighting"
        },
        "mood": "good",
        "content": "오늘은 기분이 좋아요!",
        "imageUrl": "https://...",
        "emotionsCount": 5,
        "myEmotion": "heart",
        "createdAt": "2024-01-15T10:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "totalCount": 100,
      "totalPages": 5
    }
  }
}
```

---

## 3.3 하루공유 상세 조회

**GET** `/daily-shares/:id`

### Headers
```
Authorization: Bearer {accessToken}
```

### Response (200 OK)
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "user": {
      "id": "uuid",
      "nickname": "길동이",
      "profileImage": "https://...",
      "userType": "patient_caregiver"
    },
    "mood": "good",
    "content": "오늘은 기분이 좋아요!",
    "imageUrl": "https://...",
    "isPrivate": false,
    "emotions": [
      {
        "type": "heart",
        "count": 3
      },
      {
        "type": "cheer",
        "count": 2
      }
    ],
    "myEmotion": "heart",
    "createdAt": "2024-01-15T10:00:00Z"
  }
}
```

---

## 3.4 하루공유 수정

**PATCH** `/daily-shares/:id`

### Headers
```
Authorization: Bearer {accessToken}
```

### Request Body
```json
{
  "content": "수정된 내용입니다.",
  "isPrivate": true
}
```

### Response (200 OK)
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "content": "수정된 내용입니다.",
    "isPrivate": true,
    "updatedAt": "2024-01-15T12:00:00Z"
  }
}
```

---

## 3.5 하루공유 삭제

**DELETE** `/daily-shares/:id`

### Headers
```
Authorization: Bearer {accessToken}
```

### Response (200 OK)
```json
{
  "success": true,
  "data": {
    "message": "삭제되었습니다."
  }
}
```

---

## 3.6 오늘 작성 여부 확인

**GET** `/daily-shares/today/check`

### Headers
```
Authorization: Bearer {accessToken}
```

### Response (200 OK)
```json
{
  "success": true,
  "data": {
    "hasWrittenToday": true,
    "todayShare": {
      "id": "uuid",
      "mood": "good",
      "createdAt": "2024-01-15T10:00:00Z"
    }
  }
}
```

---

# 4. 공감 (Emotions)

## 4.1 공감하기

**POST** `/daily-shares/:dailyShareId/emotions`

### Headers
```
Authorization: Bearer {accessToken}
```

### Request Body
```json
{
  "emotionType": "heart"
}
```

### Request Fields
| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| emotionType | string | ✅ | celebrate / pray / cheer / sad / happy / heart |

### Response (201 Created)
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "emotionType": "heart",
    "createdAt": "2024-01-15T10:00:00Z"
  }
}
```

---

## 4.2 공감 취소

**DELETE** `/daily-shares/:dailyShareId/emotions`

### Headers
```
Authorization: Bearer {accessToken}
```

### Response (200 OK)
```json
{
  "success": true,
  "data": {
    "message": "공감이 취소되었습니다."
  }
}
```

---

# 5. 팔로우 (Follows)

## 5.1 팔로우하기

**POST** `/follows/:userId`

### Headers
```
Authorization: Bearer {accessToken}
```

### Response (201 Created)
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "followingId": "user_uuid",
    "createdAt": "2024-01-15T10:00:00Z"
  }
}
```

---

## 5.2 언팔로우

**DELETE** `/follows/:userId`

### Headers
```
Authorization: Bearer {accessToken}
```

### Response (200 OK)
```json
{
  "success": true,
  "data": {
    "message": "언팔로우 되었습니다."
  }
}
```

---

## 5.3 팔로워 목록 조회

**GET** `/users/:userId/followers`

### Headers
```
Authorization: Bearer {accessToken}
```

### Query Parameters
| 파라미터 | 타입 | 필수 | 설명 |
|----------|------|------|------|
| page | number | | 페이지 번호 (기본: 1) |
| limit | number | | 페이지당 개수 (기본: 20) |

### Response (200 OK)
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "uuid",
        "nickname": "팔로워1",
        "profileImage": "https://...",
        "userType": "patient",
        "isFollowing": true
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "totalCount": 50,
      "totalPages": 3
    }
  }
}
```

---

## 5.4 팔로잉 목록 조회

**GET** `/users/:userId/following`

### Headers
```
Authorization: Bearer {accessToken}
```

### Response (200 OK)
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "uuid",
        "nickname": "팔로잉1",
        "profileImage": "https://...",
        "userType": "patient_caregiver",
        "isFollowing": true
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "totalCount": 30,
      "totalPages": 2
    }
  }
}
```

---

# 6. 암 종류 (Cancer Types)

## 6.1 암 종류 목록 조회

**GET** `/cancer-types`

### Response (200 OK)
```json
{
  "success": true,
  "data": [
    { "id": 1, "name": "백혈병" },
    { "id": 2, "name": "악성림프종" },
    { "id": 3, "name": "뇌종양" },
    { "id": 4, "name": "신경모세포종" },
    { "id": 5, "name": "생식세포종양" },
    { "id": 6, "name": "연부조직육종" },
    { "id": 7, "name": "악성골종양" },
    { "id": 8, "name": "악성흑색종" },
    { "id": 9, "name": "망막모세포종" },
    { "id": 10, "name": "신종양" },
    { "id": 11, "name": "간종양" },
    { "id": 12, "name": "기타" }
  ]
}
```

---

# 7. 파일 업로드 (Upload)

## 7.1 이미지 업로드

**POST** `/upload/image`

### Headers
```
Authorization: Bearer {accessToken}
Content-Type: multipart/form-data
```

### Request Body
```
file: (binary)
```

### Response (201 Created)
```json
{
  "success": true,
  "data": {
    "url": "https://supabase-storage-url/image.jpg"
  }
}
```

---

# API 엔드포인트 요약

| Method | Endpoint | 설명 | 인증 |
|--------|----------|------|------|
| POST | /auth/signup | 회원가입 | - |
| POST | /auth/login | 로그인 | - |
| POST | /auth/refresh | 토큰 갱신 | - |
| POST | /auth/logout | 로그아웃 | ✅ |
| GET | /users/me | 내 정보 조회 | ✅ |
| PATCH | /users/me | 프로필 수정 | ✅ |
| GET | /users/:userId | 사용자 프로필 조회 | ✅ |
| GET | /users/check-nickname | 닉네임 중복 확인 | - |
| POST | /daily-shares | 하루공유 작성 | ✅ |
| GET | /daily-shares | 하루공유 목록 | ✅ |
| GET | /daily-shares/:id | 하루공유 상세 | ✅ |
| PATCH | /daily-shares/:id | 하루공유 수정 | ✅ |
| DELETE | /daily-shares/:id | 하루공유 삭제 | ✅ |
| GET | /daily-shares/today/check | 오늘 작성 여부 | ✅ |
| POST | /daily-shares/:id/emotions | 공감하기 | ✅ |
| DELETE | /daily-shares/:id/emotions | 공감 취소 | ✅ |
| POST | /follows/:userId | 팔로우 | ✅ |
| DELETE | /follows/:userId | 언팔로우 | ✅ |
| GET | /users/:userId/followers | 팔로워 목록 | ✅ |
| GET | /users/:userId/following | 팔로잉 목록 | ✅ |
| GET | /cancer-types | 암 종류 목록 | - |
| POST | /upload/image | 이미지 업로드 | ✅ |
