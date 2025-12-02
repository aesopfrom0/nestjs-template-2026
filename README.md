# NestJS Template 2026

인디해커를 위한 빠른 배포가 가능한 NestJS Serverless 템플릿 프로젝트입니다.

## 주요 기능

- 🚀 **AWS Lambda 배포** - Serverless Framework 기반
- 🗄️ **MongoDB + Mongoose** - MongoDB Atlas 지원
- 🔐 **인증 시스템** - JWT, Google OAuth, Apple Sign In
- 📦 **Rich Service, Thin Repository** 패턴
- ⚙️ **환경별 설정** - local, dev, prod 분리
- 🔧 **TypeScript** - 타입 안전성
- ✅ **Validation** - class-validator, class-transformer

## 기술 스택

- **Runtime**: Node.js 24.x (Volta 관리)
- **Framework**: NestJS 11
- **Database**: MongoDB + Mongoose
- **Auth**: Passport.js (JWT, OAuth)
- **Serverless**: AWS Lambda + API Gateway
- **Deployment**: Serverless Framework 4.x

## 시작하기

### 필수 조건

- Node.js 24.x (Volta 자동 설치)
- Yarn 1.22.x
- MongoDB Atlas 계정 또는 로컬 MongoDB
- AWS CLI 설정 (배포용)

### 설치

```bash
# 의존성 설치
yarn install

# 환경변수 설정
cp .env.example .env.local
# .env.local 파일을 편집하여 필요한 값 설정
```

### 환경변수 설정

`.env.local` 파일을 생성하고 다음 값들을 설정하세요:

```bash
NODE_ENV=local
PORT=26000
MONGODB_URI=your-mongodb-uri
JWT_SECRET=your-jwt-secret

# Google OAuth (선택사항)
# GOOGLE_CLIENT_ID=your-google-client-id
# GOOGLE_CLIENT_SECRET=your-google-client-secret
# GOOGLE_IOS_CLIENT_ID=your-google-ios-client-id
# GOOGLE_CALLBACK_URL=http://localhost:26000/auth/google/callback

# Apple Sign In (선택사항)
# APPLE_CLIENT_ID=your-apple-client-id
```

### 실행

```bash
# 로컬 개발 서버 (포트 26000)
yarn start:local

# Serverless Offline (Lambda 에뮬레이션)
yarn sls:offline

# 빌드
yarn build

# 프로덕션 모드
yarn start:prod
```

## 배포

```bash
# 개발 환경 배포
yarn deploy:dev

# 프로덕션 환경 배포
yarn deploy:prod

# 로그 확인 (실시간)
yarn logs:dev:tail
yarn logs:prod:tail
```

## API 엔드포인트

### 인증 (Auth)

- `POST /auth/register` - 회원가입
- `POST /auth/login` - 로그인
- `GET /auth/google` - Google OAuth 시작
- `GET /auth/google/callback` - Google OAuth 콜백
- `POST /auth/apple` - Apple Sign In (구현 필요)
- `GET /auth/me` - 현재 사용자 정보 (JWT 필요)

### 사용자 (Users)

- `POST /users` - 사용자 생성
- `GET /users` - 전체 사용자 조회
- `GET /users/:id` - 특정 사용자 조회
- `PATCH /users/:id` - 사용자 정보 수정
- `DELETE /users/:id` - 사용자 삭제

## 프로젝트 구조

```
src/
├── main.ts                    # 로컬 실행용 엔트리포인트
├── lambda.ts                  # Lambda 핸들러
├── bootstrap.ts               # 공통 앱 설정
├── app.module.ts              # 루트 모듈
├── config/                    # 환경 설정
│   ├── configuration.ts
│   └── validate-schema.ts
├── common/                    # 공통 유틸리티
│   ├── constant/
│   └── decorator/
├── provider/                  # 인프라 제공자
│   └── database/
├── auth/                      # 인증 모듈
│   ├── strategies/
│   ├── guards/
│   └── dto/
└── users/                     # 사용자 모듈
    ├── schemas/
    ├── dto/
    ├── users.repository.ts    # Thin Repository
    └── users.service.ts       # Rich Service
```

## 아키텍처 패턴

### Rich Service, Thin Repository

```typescript
// Service: 비즈니스 로직 집중
class UsersService {
  async create(dto: CreateUserDto) {
    // 중복 검사
    const existing = await this.repository.findByEmail(dto.email);
    if (existing) throw new ConflictException();

    // 비밀번호 해싱
    const hashed = await bcrypt.hash(dto.password, 10);

    return this.repository.create({ ...dto, password: hashed });
  }
}

// Repository: 데이터 접근만
class UsersRepository {
  async findByEmail(email: string) {
    return this.userModel.findOne({ email }).exec();
  }
}
```

## 새 프로젝트 시작하기

1. 이 템플릿 복사
2. `package.json`의 `name`, `description` 수정
3. 포트 번호 변경 (2YXXX 규칙)
4. `.env.local`, `.env.dev`, `.env.prod` 생성
5. MongoDB Atlas에서 새 DB 생성
6. 불필요한 인증 전략 제거 (선택사항)
7. `yarn install` 및 로컬 실행 테스트
8. AWS에 배포

## 참고 문서

- [NestJS Documentation](https://docs.nestjs.com/)
- [Mongoose Documentation](https://mongoosejs.com/docs/)
- [Serverless Framework](https://www.serverless.com/framework/docs)
- [MongoDB Atlas](https://www.mongodb.com/docs/atlas/)

## License

UNLICENSED
