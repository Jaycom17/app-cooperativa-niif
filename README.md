# Descripción

Aplicación web para la gestión de declaraciones de rente y salas virtuales. Permite a los profesores crear y administrar salas donde los estudiantes pueden realizar el proceso de declaración de renta para personasno naturales.

## Tecnologías Utilizadas

- React
- TypeScript
- Tailwind CSS
- React Router DOM
- React Hook Form

## Requisitos Previos

- Node.js (versión 16.x o superior)
- npm o yarn

## Instalación

1. Clonar el repositorio

  ```bash
  git clone https://github.com/Jaycom17/app-cooperativa-niif.git
  ```

2. Instalar dependencias

  ```bash
  npm install
  # o
  yarn install
  ```

3. Iniciar la aplicación en modo desarrollo

```bash
npm run dev
# o
yarn dev
```

## Estructura del Proyecto

``` text
declaracion-app/
├── src/
│   ├── professor/       # Componentes y lógica del profesor
│   ├── components/      # Componentes compartidos
│   ├── models/         # Interfaces y tipos
│   └── ...
├── public/
└── ...
```

## Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Previsualiza la versión de producción