src/
├─ app/
│  ├─ App.tsx              # Punto de arranque de la app
│  └─ App.routes.tsx       # Definición central de todas las rutas
├─ auth/
│  ├─ pages/
│  │  └─ LoginPage.tsx
│  ├─ components/
│  │  └─ LoginForm.tsx
│  ├─ store/
│  │  └─ useAuthStore.ts
│  ├─ services/
│  │  └─ auth.api.ts       # Lógica para comunicarte con tu backend
│  └─ routes.tsx           # Rutas específicas de Auth
├─ dashboard/
│  ├─ pages/
│  │  └─ DashboardPage.tsx
│  ├─ components/
│  │  └─ Stats.tsx
│  ├─ store/
│  │  └─ useDashboardStore.ts
│  └─ services/
│     └─ stats.api.ts
├─ layout/
│  └─ MainLayout.tsx       # Layout para páginas privadas
│  └─ PublicLayout.tsx     # Layout para páginas públicas
├─ utils/
│  └─ roles.ts              # Helpers para verificar roles
├─ constants/
│  └─ roles.ts              # Definición de roles y otros datos
├─ types/
│  └─ global.ts             # Tipos generales, si los necesitas
├─ index.css                # Tailwind y otros globales
├─ main.tsx                 # Punto de arranque de React
├─ vite.config.ts           # Config de Vite (si usas Vite)
├─ tsconfig.json            # Config de TypeScript
├─ tailwind.config.js       # Config de Tailwind
└─ postcss.config.js        # Config de PostCSS