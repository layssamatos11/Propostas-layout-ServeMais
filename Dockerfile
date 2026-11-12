FROM node:22-alpine AS build
WORKDIR /src

COPY portal/package.json portal/package-lock.json portal/
COPY proposta-1/package.json proposta-1/package-lock.json proposta-1/
COPY proposta-2/package.json proposta-2/package-lock.json proposta-2/
COPY proposta-3/package.json proposta-3/package-lock.json proposta-3/
COPY proposta-4/package.json proposta-4/package-lock.json proposta-4/
COPY proposta-5/package.json proposta-5/package-lock.json proposta-5/

RUN for app in portal proposta-1 proposta-2 proposta-3 proposta-4 proposta-5; do \
      npm ci --prefix "/src/$app"; \
    done

COPY portal portal
COPY proposta-1 proposta-1
COPY proposta-2 proposta-2
COPY proposta-3 proposta-3
COPY proposta-4 proposta-4
COPY proposta-5 proposta-5

RUN for app in portal proposta-1 proposta-2 proposta-3 proposta-4 proposta-5; do \
      npm run build --prefix "/src/$app"; \
    done

FROM nginx:1.27-alpine
COPY docker/nginx.conf /etc/nginx/nginx.conf
COPY docker/spa.conf /etc/nginx/spa.conf
COPY --from=build /src/portal/dist /srv/portal
COPY --from=build /src/proposta-1/dist /srv/proposta-1
COPY --from=build /src/proposta-2/dist /srv/proposta-2
COPY --from=build /src/proposta-3/dist /srv/proposta-3
COPY --from=build /src/proposta-4/dist /srv/proposta-4
COPY --from=build /src/proposta-5/dist /srv/proposta-5
EXPOSE 5170 5174 5175 5176 5177 5178
