# NestJS Template 2026

인디해커를 위한 빠른 배포가 가능한 NestJS Serverless 템플릿 프로젝트입니다.

---

## 프로젝트 개요

**목적**: MongoDB + AWS Lambda 기반으로 빠르게 백엔드 API를 개발하고 배포할 수 있는 재사용 가능한 템플릿

**주요 기능**:
- JWT 기반 인증 시스템
- Google OAuth 2.0 소셜 로그인
- Apple Sign In 소셜 로그인
- MongoDB + Mongoose ORM
- AWS Lambda 배포 지원 (Serverless Framework)
- 로컬 개발 환경 (serverless-offline)
- 환경별 설정 관리 (local/dev/prod)
- TypeScript + NestJS 구조화된 백엔드
- Rich Service, Thin Repository 패턴

## 기술 스택

### 백엔드
- **Runtime**: Node.js 24.x (Volta 관리)
- **Framework**: NestJS 11
- **Database**: MongoDB Atlas (Mongoose)
- **인증**: Passport.js (JWT, Google OAuth, Apple Sign In)
- **Validation**: class-validator, class-transformer
- **환경 관리**: @nestjs/config, env-cmd, joi

### 인프라
- **호스팅**: AWS Lambda (Serverless Framework 4.x)
- **API Gateway**: AWS HTTP API (CORS 활성화)
- **메시지 큐**: AWS SQS (필요시 추가)
- **로컬 개발**: serverless-offline
- **리전**: ap-northeast-2 (서울)

### 개발 도구
- **패키지 매니저**: yarn 1.22.22
- **Node 버전 관리**: Volta (Node 24.x)
- **빌드**: TypeScript 5.x
- **테스트**: Jest
- **린트**: ESLint + Prettier

## 개발 환경 설정

### 필수 조건
- Node.js 버전: 24.x (Volta로 자동 관리)
- 패키지 매니저: yarn
- AWS CLI 설정 (배포용)
- MongoDB Atlas 계정 (M0 무료 티어 또는 Flex)

### 환경변수 설정

다음 환경변수 파일들을 생성해야 합니다:

```bash
# .env.local (로컬 개발용)
NODE_ENV=local
PORT=26000
MONGODB_URI=mongodb://localhost:27017/dbname  # 또는 MongoDB Atlas URI

JWT_SECRET=your-jwt-secret-key

# Google OAuth (선택사항)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_IOS_CLIENT_ID=your-google-ios-client-id
GOOGLE_CALLBACK_URL=http://localhost:26000/auth/google/callback

# Apple Sign In (선택사항)
APPLE_CLIENT_ID=your-apple-client-id
```

```bash
# .env.dev (개발 서버용)
NODE_ENV=dev
MONGODB_URI=your-mongodb-atlas-uri
JWT_SECRET=your-jwt-secret-key
# ... 나머지 설정
```

```bash
# .env.prod (프로덕션용)
NODE_ENV=prod
MONGODB_URI=your-mongodb-atlas-uri
JWT_SECRET=your-jwt-secret-key
# ... 나머지 설정
```

### 실행 방법

```bash
# 의존성 설치
yarn install

# 로컬 개발 서버 실행 (일반)
yarn start:local

# Serverless Offline으로 Lambda 환경 에뮬레이션
yarn sls:offline

# 빌드
yarn build

# Lambda 배포용 빌드
yarn build:sls

# 개발 환경 배포
yarn deploy:dev

# 프로덕션 환경 배포
yarn deploy:prod

# 테스트
yarn test

# 린트 + 포맷
yarn lint
yarn format
```

### 포트 규칙

- 기본 포트: **26000** (2026년 템플릿)
- 새 프로젝트 생성시: `2YXXX` 형식
  - `YY`: 연도 (25, 26, 27...)
  - `XXX`: 프로젝트 번호 (000, 002, 004... 짝수 권장)
  - 예: 2026년 첫 번째 프로젝트 = 26000
  - 예: 2026년 세 번째 프로젝트 = 26004 (백엔드), 26005 (프론트엔드)

## 프로젝트 구조

```
nestjs-template-2026/
├── src/
│   ├── main.ts                   # 로컬 실행용 엔트리포인트
│   ├── lambda.ts                 # Lambda 핸들러
│   ├── bootstrap.ts              # 공통 앱 설정
│   ├── app.module.ts             # 루트 모듈
│   ├── app.controller.ts
│   ├── app.service.ts
│   ├── config/
│   │   ├── configuration.ts      # 환경 설정
│   │   └── validate-schema.ts    # Joi 스키마 검증
│   ├── common/
│   │   ├── constant/
│   │   ├── decorator/            # 커스텀 데코레이터 (예: @CurrentUser)
│   │   ├── dto/
│   │   ├── filter/
│   │   ├── guard/
│   │   ├── interceptor/
│   │   └── pipe/
│   ├── provider/
│   │   └── database/
│   │       ├── database.module.ts
│   │       └── database.service.ts
│   ├── auth/                      # 인증 모듈
│   │   ├── auth.module.ts
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   ├── strategies/            # Passport 전략들
│   │   │   ├── jwt.strategy.ts
│   │   │   ├── google.strategy.ts
│   │   │   └── apple.strategy.ts
│   │   └── guards/
│   ├── users/                     # 사용자 모듈
│   │   ├── users.module.ts
│   │   ├── users.controller.ts
│   │   ├── users.service.ts
│   │   ├── users.repository.ts   # Thin Repository
│   │   ├── dto/
│   │   └── schemas/
│   │       └── user.schema.ts     # Mongoose 스키마
│   └── [domain]/                  # 도메인별 모듈
│       ├── [domain].module.ts
│       ├── [domain].controller.ts
│       ├── [domain].service.ts    # Rich Service (비즈니스 로직)
│       ├── [domain].repository.ts # Thin Repository (DB 접근)
│       ├── dto/
│       └── schemas/
├── test/                          # E2E 테스트
├── test-scripts/                  # 테스트용 스크립트 (읽기 전용)
├── serverless.yml                 # Serverless Framework 설정
├── tsconfig.json
├── tsconfig.build.json
├── nest-cli.json
├── .env.local
├── .env.dev
├── .env.prod
└── .nvmrc / package.json (volta)
```

## 코딩 컨벤션

### 일반 원칙
- `~/playbook/patterns.md` 기본 패턴 준수
- Rich Service, Thin Repository 패턴
- 모든 DTO는 class-validator로 검증
- 환경변수는 Joi로 검증

### 아키텍처 패턴

#### Rich Service, Thin Repository
```typescript
// ✅ Service: 비즈니스 로직 집중
@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async createUser(createUserDto: CreateUserDto) {
    // 비즈니스 로직: 이메일 중복 검사
    const existingUser = await this.usersRepository.findByEmail(createUserDto.email);
    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    // 비즈니스 로직: 비밀번호 해싱
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    return this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });
  }
}

// ✅ Repository: 단순 데이터 접근
@Injectable()
export class UsersRepository {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async create(createUserData: Partial<User>): Promise<User> {
    const user = new this.userModel(createUserData);
    return user.save();
  }
}
```

#### 파일 구조
- 각 도메인은 독립적인 모듈로 구성
- `module.ts` - `controller.ts` - `service.ts` - `repository.ts` - `dto/` - `schemas/`
- 공통 기능은 `common/` 디렉토리에 위치

#### 네이밍
- 파일명: kebab-case (user-profile.service.ts)
- 클래스명: PascalCase (UserProfileService)
- 변수/함수: camelCase (getUserProfile)
- 상수: UPPER_SNAKE_CASE (MAX_RETRY_COUNT)
- MongoDB 스키마: PascalCase (User, Occasion)

#### MongoDB ObjectId 처리
```typescript
// ✅ DTO에서 string으로 받기
export class CreateOccasionDto {
  @IsMongoId()
  userId: string;
}

// ✅ Service에서 ObjectId로 변환
import { Types } from 'mongoose';

const occasion = await this.occasionsRepository.create({
  userId: new Types.ObjectId(dto.userId),
});

// ✅ 응답에서 _id를 id로 매핑
@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  email: string;

  // toJSON 변환
  toJSON() {
    const obj = this.toObject();
    obj.id = obj._id.toString();
    delete obj._id;
    delete obj.__v;
    return obj;
  }
}
```

### 스타일
- ESLint + Prettier 자동 포맷팅
- import 순서: 외부 라이브러리 → @nestjs → 내부 모듈 → 상대경로
- 환경변수는 ConfigService로만 접근

## 주요 모듈/컴포넌트

### Bootstrap (src/bootstrap.ts)
- **위치**: `src/bootstrap.ts`
- **역할**: 로컬/Lambda 환경 모두에서 사용되는 공통 앱 설정
- **주의사항**:
  - Express 인스턴스를 옵션으로 받아 Lambda와 로컬 모두 지원
  - ValidationPipe, CORS, Cookie Parser 등 전역 설정 포함

### Lambda Handler (src/lambda.ts)
- **위치**: `src/lambda.ts`
- **역할**: AWS Lambda 핸들러 (@codegenie/serverless-express 사용)
- **주의사항**:
  - Cold start 최적화를 위해 handler 외부에서 bootstrap 실행
  - Express 인스턴스를 직접 전달

### Database Module
- **위치**: `src/provider/database/database.module.ts`
- **역할**: MongoDB 연결 설정 (Mongoose)
- **주의사항**:
  - ConfigService에서 MONGODB_URI 주입
  - MongooseModule.forRootAsync로 비동기 설정

### Auth Module
- **위치**: `src/auth/`
- **역할**: JWT, Google OAuth, Apple Sign In 인증
- **주의사항**:
  - Passport 전략은 strategies/ 폴더에 분리
  - JWT Guard는 기본 전역 가드로 사용 가능
  - 소셜 로그인 후 자체 JWT 발급

### Config Module
- **위치**: `src/config/`
- **역할**: 환경변수 로드 및 검증
- **주의사항**:
  - Joi 스키마로 필수 환경변수 검증 (앱 시작 시)
  - 환경별 .env 파일 자동 로드 (.env.${NODE_ENV})

## 제약사항 및 주의사항

### 데이터 보호
- ⚠️ 기존 프로덕션 데이터 수정/삭제 금지
- 테스트 데이터는 `test-` prefix 사용
- 테스트 스크립트는 읽기 전용 (Query만 사용)
- test-scripts/ 파일명: `YYMMDD-{설명}.js`

### 보안
- ⚠️ JWT_SECRET은 반드시 안전하게 관리
- ⚠️ .env 파일은 절대 커밋하지 않음 (.gitignore 확인)
- API 키, OAuth Secret은 환경변수로만 관리
- CORS는 프로덕션에서 특정 도메인만 허용하도록 설정
- class-validator로 모든 입력 검증

### MongoDB Atlas 요금제
- **개발/테스트**: M0 무료 티어 (512MB)
- **소규모 프로덕션**: Flex 요금제 (사용량 기반)
  - 여러 사이드 프로젝트를 하나의 클러스터로 관리 가능
  - DB 이름으로 프로젝트 구분 (예: dday-api-prod, subscan-prod)

### AWS Lambda 제약사항
- **메모리**: 기본 256MB (필요시 조정)
- **타임아웃**: 기본 30초
- **Cold Start**: 첫 요청은 느릴 수 있음 (bootstrap 캐싱으로 완화)
- **패키지 크기**: 가능한 한 작게 유지 (node_modules 최적화)

### 성능
- MongoDB 쿼리에 적절한 인덱스 설정
- Lambda Cold Start 최소화: handler 외부에서 초기화
- 불필요한 의존성 제거 (bundle size 관리)

## 배포

### 배포 프로세스

#### 1. 개발 환경 배포 (Dev)
```bash
# .env.dev 파일 확인
yarn deploy:dev
```

#### 2. 프로덕션 환경 배포 (Prod)
```bash
# .env.prod 파일 확인
yarn deploy:prod
```

#### 3. 로그 확인
```bash
# 개발 환경 로그 (실시간)
yarn logs:dev:tail

# 프로덕션 환경 로그
yarn logs:prod:tail
```

### 환경별 설정
- **로컬 (local)**:
  - 포트: 26000
  - DB: 로컬 MongoDB 또는 Atlas 개발용 클러스터
  - 실행: `yarn start:local` 또는 `yarn sls:offline`

- **개발 (dev)**:
  - AWS Lambda (dev stage)
  - DB: MongoDB Atlas M0/Flex (개발용)
  - API: `https://{api-id}.execute-api.ap-northeast-2.amazonaws.com/dev`

- **프로덕션 (prod)**:
  - AWS Lambda (prod stage)
  - DB: MongoDB Atlas Flex/Dedicated (프로덕션용)
  - API: `https://{api-id}.execute-api.ap-northeast-2.amazonaws.com/prod`
  - ⚠️ 배포 전 충분한 테스트 필수

### Serverless Framework 설정 (serverless.yml)

주요 설정값:
- **런타임**: nodejs22.x (Node.js 24.x 호환)
- **리전**: ap-northeast-2 (서울)
- **메모리**: 256MB (조정 가능)
- **타임아웃**: 30초
- **CORS**: 기본 활성화 (프로덕션에서는 제한 필요)

## 외부 의존성

### 필수 서비스
- **MongoDB Atlas**: 데이터베이스 (M0 무료 또는 Flex 요금제)
- **AWS**: Lambda, API Gateway, CloudWatch Logs

### 선택 서비스
- **AWS SQS**: 메시지 큐 (비동기 작업 처리 필요시)
- **Google Cloud Console**: OAuth 2.0 (소셜 로그인 사용시)
- **Apple Developer**: Sign In with Apple (소셜 로그인 사용시)

## 문제 해결

### 자주 발생하는 이슈

#### Lambda Cold Start가 너무 느림
- **증상**: 첫 요청이 5초 이상 걸림
- **원인**: 의존성이 너무 많거나, 초기화 코드가 비효율적
- **해결방법**:
  1. 불필요한 패키지 제거
  2. Dynamic import 활용
  3. Lambda 메모리 증가 (256MB → 512MB)
  4. Provisioned Concurrency 설정 (유료)

#### Serverless Offline에서 MongoDB 연결 실패
- **증상**: `MongooseError: Operation buffering timed out`
- **원인**: MongoDB URI가 잘못되었거나, 네트워크 문제
- **해결방법**:
  1. .env.local에서 MONGODB_URI 확인
  2. MongoDB Atlas IP 화이트리스트 확인 (0.0.0.0/0 추가)
  3. 로컬 MongoDB 사용 시 mongod 실행 여부 확인

#### JWT 인증이 작동하지 않음
- **증상**: 401 Unauthorized
- **원인**: JWT_SECRET 불일치, 토큰 형식 오류
- **해결방법**:
  1. Authorization 헤더 형식 확인: `Bearer {token}`
  2. JWT_SECRET 환경변수 일치 여부 확인
  3. 토큰 만료 시간 확인

#### Mongoose ObjectId 타입 오류
- **증상**: `Cast to ObjectId failed`
- **원인**: DTO에서 string을 ObjectId로 직접 저장하려고 시도
- **해결방법**:
  ```typescript
  // ❌ 잘못된 방법
  const user = await this.usersRepository.create({
    userId: dto.userId // string
  });

  // ✅ 올바른 방법
  import { Types } from 'mongoose';
  const user = await this.usersRepository.create({
    userId: new Types.ObjectId(dto.userId)
  });
  ```

## 참고 자료

### 공식 문서
- NestJS: https://docs.nestjs.com/
- Mongoose: https://mongoosejs.com/docs/
- Serverless Framework: https://www.serverless.com/framework/docs
- MongoDB Atlas: https://www.mongodb.com/docs/atlas/

### 참조 프로젝트
- **dday-api** (`~/dday-api`): 가장 최신 구조, JWT + Google + Apple 인증
- **nestjs-template-thin-repository** (`~/nestjs-template-thin-repository`): Rich Service, Thin Repository 패턴
- **topdown-api** (`~/topdown-api`): SQS 적용 사례

### 내부 문서
- 플레이북: `~/playbook/`
- 공통 패턴: `~/playbook/patterns.md`
- 기술 선호도: `~/playbook/tech-preferences.md`

## Claude 협업 팁

### 이 프로젝트에서 자주 하는 작업
1. **새 도메인 모듈 추가**:
   - `nest g module {domain}`
   - `nest g controller {domain}`
   - `nest g service {domain}`
   - Repository 파일 수동 생성
   - Mongoose Schema 작성

2. **환경변수 추가**:
   - `src/config/configuration.ts`에 추가
   - `src/config/validate-schema.ts`에 Joi 검증 추가
   - `.env.local`, `.env.dev`, `.env.prod`에 값 설정
   - `serverless.yml`의 `provider.environment`에 추가

3. **인증 전략 추가**:
   - `src/auth/strategies/` 에 전략 파일 생성
   - `auth.module.ts`에 등록
   - Controller에 Guard 적용

4. **SQS 추가** (필요시):
   - `~/topdown-api` 참조
   - AWS SQS 대기열 생성
   - Processor 작성
   - serverless.yml에 SQS 이벤트 설정

### 컨텍스트 제공 시 포함할 정보
- 에러 메시지 전문 (CloudWatch Logs 또는 로컬 콘솔)
- 관련 파일 경로 (module, controller, service, repository)
- 환경 (local/dev/prod)
- 요청/응답 예시 (가능한 경우)

### 새 프로젝트 시작할 때
1. 이 템플릿을 복사
2. package.json의 name, version 수정
3. 포트 번호 변경 (2YXXX 규칙)
4. .env 파일들 생성 및 설정
5. 불필요한 인증 전략 제거 (필요시)
6. MongoDB Atlas에서 새 DB 생성
7. AWS에 배포

---

**마지막 업데이트**: 2025-12-02
**담당자**: Aesop (인디해커)
**템플릿 버전**: 0.0.1
