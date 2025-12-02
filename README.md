# MEMENTO

## 개요

### 아카이빙에 집중한 소셜 네트워크 서비스

- 인원: 5명
- 기간: 2025.08 ~
- 서비스 주소: https://memento.ai.kr

## 기술스택

### Language & Framework

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=20232A)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)
![SWC](https://img.shields.io/badge/SWC-FFCE45?logo=swc&logoColor=000000)

### 상태 관리 & 데이터

![Zustand](https://img.shields.io/badge/zustand-602c3c?logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAMAAAAolt3jAAAA8FBMVEVHcExXQzpKQDlFV16lpqyGh4tPPTdWT0weHRU7LRZGQzmxYjlaTkZsbmywVyxtXDSFhISXm6WWpcaytb6bm56gprY0LiiXmp2prLamsMa0XS42MSxkTUVDSkuyYzGihXdDV2GprbmedVxaRD1kTUWUdGFGOCN4a2OfpbI0SFFAMSddTkbCc0dWQiGFRypXQyJUQCBcTTWviDVXQyJcUDjlqCWxjkG+hBTiohtURD6lr8lORTtDVVZmPyxwSipaRSJDOzaWpsyYqMyYqM2dq8tPOjBERTs6QUKTcCeKaCJvViZdSDK4iSngoiDvqx7KkRuGEi1hAAAAOXRSTlMApZ78cB8hCAMQO/j/FOH4KlT1wFfJTjaY6SxtVexFn3Tn2sN6d671mVuJ+/PPN9CT6TfpS4C9jJaVLRihAAAAi0lEQVQIHXXBxRKCUAAF0Es/QMDubsVuGrv1///GBQ4bx3PwgwC8gFCRohs8QrQV0ZtKOZ9JcgBmU8MwqFa9kjNTUWB58f2jPOjU9juTBTbPq+vIar972MZjwPr1uDvqCFw2wQpQVm/t7Oo9gAgAFtrtZNtMFQFp7nkWU5IQECfjYbuQFvBFRJHgjw9L0A80UmaGpAAAAABJRU5ErkJggg==)
![TanStack Query](https://img.shields.io/badge/TanStack%20Query-FF4154?logo=reactquery&logoColor=white)

### UI & Icon

![Emotion](https://img.shields.io/badge/Emotion-DB7093?logo=emotion&logoColor=white)
![@solar-icons/react](https://img.shields.io/badge/%40solar--icons%2Freact-FFB400?logo=starship&logoColor=white)

### Build & Tooling

![pnpm](https://img.shields.io/badge/pnpm-F69220?logo=pnpm&logoColor=white)
![PWA](https://img.shields.io/badge/PWA-5A0FC8?logo=pwa&logoColor=white)

### 코드 품질

![ESLint](https://img.shields.io/badge/ESLint-4B32C3?logo=eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/Prettier-F7B93E?logo=prettier&logoColor=000000)

### 테스트

![Vitest](https://img.shields.io/badge/Vitest-6E9F18?logo=vitest&logoColor=white)
![React Testing Library](https://img.shields.io/badge/React%20Testing%20Library-E33332?logo=testinglibrary&logoColor=white)
![Storybook](https://img.shields.io/badge/Storybook-FF4785?logo=storybook&logoColor=white)

## 디렉토리 구조

```text
front-end/
├── public/                 # 정적 에셋 및 manifest 등 PWA 관련 파일
├── src/
│   ├── api/                # 서버 API 호출 관련 모듈
│   ├── components/         # 재사용 가능한 UI 컴포넌트
│   ├── hooks/              # 커스텀 훅
│   ├── layouts/            # 페이지 레이아웃 컴포넌트
│   ├── pages/              # 라우트 단위의 페이지 컴포넌트
│   ├── routes/             # 라우팅 설정
│   ├── store/              # 전역 상태(zustand) 관련 파일
│   ├── styles/             # 전역 스타일 및 테마
│   ├── types/              # TypeScript 타입 정의
│   └── utils/              # 공용 유틸 함수
├── mock/                   # 모킹 데이터 및 핸들러
├── docker/                 # 도커 관련 설정
├── vite.config.ts          # Vite 설정
└── package.json
```
