# 🌱 실시간 호가 및 주문 시스템

> 안녕하세요. 커밋나우의 과제를 진행하려는 여러분을 모두 환영합니다!
> 본 과제를 해결하고 더 성장한 자신을 마주하는 기회가 되길 바랍니다! 🙌

# 📜 과제의 내용

과제의 내용은 아래 링크를 통해 커밋나우 홈페이지에서 확인할 수 있습니다.

> [과제내용 보러가기](https://commitnow.dev/assignment/실시간-호가-및-주문-시스템-eYBcsbfy)

과제의 설명과 요구사항을 잘 참고하여, 구현해 주세요.

# 💡 가이드

어떻게 해야할지 모르겠다면, 아래 문서를 참고해 주세요!

> [가이드](./ASSIGNMENT_GUIDE.md)

## ✨ 현재 구현 포인트

- 실시간 호가 조회: `TanStack Query` + 1초 폴링
- API 모킹: `MSW` (개발 환경에서만 활성화)
- 주문 모달: 네이티브 `<dialog>` 기반
- 상태 관리: `Zustand` (`selectedQuote`, `orderResult`, `theme`)
- 다국어: `react-i18next` (`en`, `kr`)
- API 타입 안정성: `openapi-fetch` + `openapi-typescript`
- 테스트: `Vitest`(unit) + `Playwright`(e2e)

## 🚀 실행 가이드

### 1) Node 버전 맞추기

이 프로젝트는 `.nvmrc` 기준으로 Node 버전을 고정합니다.

```bash
nvm use
```

`nvm`이 없다면 [nvm 공식 문서](https://github.com/nvm-sh/nvm)를 참고해 설치해 주세요.

### 2) 의존성 설치

패키지 매니저는 `pnpm`을 사용합니다.

```bash
pnpm install
```

### 3) 개발 서버 실행

```bash
pnpm dev
```

실행 후 브라우저에서 안내되는 로컬 주소(기본: `http://localhost:5173`)로 접속합니다.

### 4) 프로덕션 빌드

```bash
pnpm build
```

### 5) 빌드 결과 미리보기

```bash
pnpm preview
```

### 6) 미사용 코드 점검 (knip)

```bash
pnpm knip
```

### 6-1) OpenAPI 타입 생성

```bash
pnpm generate:api-types
```

`src/shared/api/openapi/orderbook.openapi.yaml` 변경 시 위 명령으로 `schema.ts`를 재생성해 주세요.

### 7) 단위 테스트 (Vitest)

```bash
# 1회 실행
pnpm test

# watch 모드
pnpm test:watch

# UI 모드
pnpm test:ui

# coverage
pnpm test:coverage
```

### 8) E2E 테스트 (Playwright)

```bash
# 헤드리스 실행
pnpm test:e2e

# 브라우저 창 표시 실행
pnpm test:e2e:headed

# UI 모드 실행
pnpm test:e2e:ui

# UI 모드 + 브라우저 창 표시(디버깅)
pnpm test:e2e:ui:headed
```

## 🧪 품질 점검 명령어

```bash
pnpm lint
pnpm test
pnpm test:e2e
pnpm build
```

## 🚢 CI/CD

- CI: `.github/workflows/ci.yml`
  - 트리거: 모든 브랜치 push, PR
  - 병렬 Job:
    - `quality`: `lint` → `format` → `typecheck` → `knip` → `test` → `build`
    - `e2e`: Playwright 설치 후 `test:e2e`
- CD: `.github/workflows/cd.yml`
  - 트리거: `release-*` 태그 push (예: `release-dev`, `release-staging`, `release-prod`)
  - 단계:
    - 태그 기반 환경 결정
    - 정적 자산 `dist/assets`를 S3 업로드(설정된 경우)
    - Docker 이미지 ECR 푸시
    - ECS 서비스 배포

### Asset CDN (Vite 기준)

정적 에셋(JS/CSS/이미지)은 CDN에서 서빙할 수 있도록 구성되어 있습니다.  
배포 시 커밋 SHA가 포함된 경로를 사용해 에셋을 분리합니다.

```text
asset_prefix = {CDN_ORIGIN}/assets/{repository_name}/{sha}/
```

#### 무중단 배포(Zero-Downtime)

- 배포마다 고유 경로(`{sha}`)를 사용하므로 이전 배포 에셋과 충돌하지 않습니다.
- 롤링 배포 중 구버전/신버전이 각자 자기 경로의 에셋을 사용합니다.
- CDN 캐시 무효화 없이도 안전하게 신규 배포를 반영할 수 있습니다.

#### 경로 구조

| 항목         | 경로 예시                                                     |
| ------------ | ------------------------------------------------------------- |
| asset prefix | `https://cdn.example.com/assets/frontend-assignment/abc1234/` |
| 앱 에셋 URL  | `{asset_prefix}assets/index-xxxxx.js`                         |
| S3 업로드    | `s3://bucket/assets/{repo}/{sha}/assets/`                     |

#### 동작 흐름

1. 빌드 시 `--base={asset_prefix}`로 Vite base 경로를 주입합니다.
2. `dist/assets`를 `assets/{repo}/{sha}/assets` 경로로 S3에 업로드합니다.
3. 앱 HTML은 `{asset_prefix}assets/...` 경로를 참조해 CDN에서 에셋을 로드합니다.

### Docker 이미지 구성 (Vite 기준)

이 저장소는 Vite 빌드 산출물 `dist`를 컨테이너에서 서빙합니다.  
컨테이너는 아래 방식으로 구성됩니다.

- 빌드 스테이지: `pnpm build`로 `dist` 생성
- 런타임 스테이지:
  - `node:22-alpine`
  - non-root 유저(`appuser`, uid `1001`) 실행
  - 포트 `3000` 노출
  - `server.mjs`로 `dist` 정적 파일 서빙 (SPA fallback 포함)

Vite 산출물에 맞춘 Node 정적 서버를 사용합니다.

### CD에 필요한 변수/시크릿

- 공통
  - `vars.AWS_REGION` (옵션, 기본 `ap-northeast-2`)
  - `secrets.AWS_ACCESS_KEY_ID`
  - `secrets.AWS_SECRET_ACCESS_KEY`
- 환경별(`dev`/`staging`/`prod`)
  - `secrets.ECR_REPOSITORY_<ENV>`
  - `secrets.ECS_CLUSTER_<ENV>`
  - `secrets.ECS_SERVICE_<ENV>`
  - `vars.ENVIRONMENT_URL_<ENV>`
  - `vars.CDN_ORIGIN_<ENV>` (옵션)
  - `vars.S3_BUCKET_<ENV>` (옵션)

`<ENV>`는 `DEV`, `STAGING`, `PROD` 형식으로 등록합니다.

### 배포 직전 체크리스트

- [ ] 배포 태그가 규칙에 맞는지 확인 (`release-dev`, `release-staging`, `release-prod`)
- [ ] 환경별 시크릿이 모두 등록되어 있는지 확인
  - `ECR_REPOSITORY_<ENV>`, `ECS_CLUSTER_<ENV>`, `ECS_SERVICE_<ENV>`
  - `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`
- [ ] 환경별 변수 확인
  - `ENVIRONMENT_URL_<ENV>`
  - `CDN_ORIGIN_<ENV>` (CDN 사용 시)
  - `S3_BUCKET_<ENV>` (에셋 업로드 사용 시)
- [ ] S3 업로드 경로가 기대와 일치하는지 확인
  - `s3://{S3_BUCKET}/{assets/{repo}/{sha}}/assets`
- [ ] ECS 배포 대상 확인
  - 서비스명(`ECS_SERVICE_<ENV>`)과 클러스터(`ECS_CLUSTER_<ENV>`)가 올바른지
  - task definition의 컨테이너 이름(`app`)과 포트(`3000`)가 현재 이미지와 일치하는지
- [ ] 로컬 사전 검증
  - `pnpm lint && pnpm run typecheck && pnpm test && pnpm build`

## 🧭 주요 페이지

- 거래 페이지: `/trade`
- 주문 완료 페이지: `/complete`
