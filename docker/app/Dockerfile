# ---------- Builder ----------
FROM node:20-alpine AS builder
WORKDIR /app

# 의존성 설치
COPY package.json pnpm-lock.yaml ./
RUN corepack enable \
  && corepack prepare pnpm@10.14.0 --activate \
  && pnpm install --frozen-lockfile

# 소스 복사 및 빌드
COPY . .
RUN npm run build

# ---------- Runtime ----------
FROM nginx:1.27-alpine

# 기본 conf 교체(404시 SPA fallback만)
RUN rm -f /etc/nginx/conf.d/default.conf
COPY docker/nginx/default.conf /etc/nginx/conf.d/default.conf

# 정적 파일 복사
COPY --from=builder /app/dist/ /usr/share/nginx/html/

EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s CMD wget -qO- http://127.0.0.1/ || exit 1