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

## 🧭 주요 페이지

- 거래 페이지: `/trade`
- 주문 완료 페이지: `/complete`
