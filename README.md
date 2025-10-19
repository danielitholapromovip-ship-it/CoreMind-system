# CoreMind System Bot

Multi-plataforma modular bot (CoreMind System) — scaffold listo para WhatsApp (Baileys), Telegram, Discord y Web.

## Características
- Estructura de plugins (src/plugins)
- Adaptadores: WhatsApp, Telegram, Discord
- Branding: logo SVG y banner
- Dockerfile + docker-compose

## Requisitos
- Node.js >=16.18
- ffmpeg en PATH (se usa ffmpeg-static, pero para transformaciones complejas mejor tener ffmpeg instalado)
- npm

## Instalación (local)
1. Copia el repositorio.
2. Crea `.env` basado en `.env.example` y rellena tokens.
3. `npm ci`
4. `npm start`
5. Para WhatsApp: revisa la consola para el QR.

## Docker
`docker-compose up -d --build`

## Plugins
Crea archivos en `src/plugins` con la forma del ejemplo `ping.js`.

## Nota legal / advertencias
- El adaptador de WhatsApp usa un cliente Web no-oficial (Baileys). WhatsApp puede suspender cuentas que usen clientes no-oficiales. Para uso serio considera WhatsApp Business API.
- Nunca compartas tus tokens/archivos de sesión públicamente.

## ¿Qué sigue?
- Añadir sistemas de base de datos (SQLite/Postgres) para persistencia.
- Añadir permisos/roles por plataforma.
- Agregar funciones avanzadas: stickers, descargas, integración OpenAI, autologs.

