FROM nginx:1.25-alpine

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Static site will be copied into this path during image build
COPY dist/ /usr/share/nginx/html/

EXPOSE 80 443

# Optional: create certs directory for mounting TLS materials
RUN mkdir -p /etc/nginx/certs

HEALTHCHECK --interval=30s --timeout=3s CMD wget -qO- http://127.0.0.1/ || exit 1

