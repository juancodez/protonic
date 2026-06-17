# 🔬 PROTONIC — Roadmap del Proyecto
> Design System construido sobre React Aria, con capa agéntica como extensión final
> Basado en la conversación con Cristian Achiardi Morales

---

## 🧭 La idea central (antes de empezar)

Cristian no propuso una auditoría agéntica sobre React Aria. Propuso **construir un Design System**, usando React Aria como cimiento de accesibilidad.

> *"Sería para armar una librería de componentes react. Podrías usar esa de base y customizarla. Partes un proyecto en el código, y vas modificando los componentes."*
> — Cristian Achiardi Morales

**Lo que NO es este proyecto:**
- ❌ No es modificar React Aria "porque sí"
- ❌ No es una auditoría de IA sobre una librería ajena
- ❌ No es empezar por la parte agéntica

**Lo que SÍ es este proyecto:**
- ✅ Consumir React Aria como capa de comportamiento/accesibilidad
- ✅ Construir PROTONIC como capa de diseño encima (tokens, API, variantes)
- ✅ Convertirlo en una librería reutilizable y documentada
- ✅ Agregar la capa agéntica **al final**, como extensión — no como núcleo

---

## 🗺️ El pipeline completo

```
React Aria (comportamiento + accesibilidad, sin estilos)
    ↓
Button accesible · Dialog accesible · Select accesible · Table accesible
    ↓
PROTONIC Design System (tu capa de diseño)
    ↓
Button · Card · Modal · DataTable · Dashboard Widgets
    ↓
Aplicaciones reales (tu dashboard, tus proyectos)
```

### ¿Por qué React Aria como base?

Resolver accesibilidad desde cero es difícil. Adobe ya resolvió:
- Navegación por teclado
- Focus management
- Screen readers
- ARIA attributes
- Keyboard shortcuts
- Formularios accesibles

Esto te libera para concentrarte en lo que realmente es diseño de producto: **API del componente, diseño visual, tokens, variantes, DX (Developer Experience)**.

### La pregunta que guía todo el proyecto

No es "¿cómo hago un botón?". Es:

```jsx
// Esto es solo el componente
<Button />

// Esto es la API — el verdadero trabajo de Design System
<Button
  variant="primary"
  size="large"
  loading
>
  Save
</Button>
```

> ¿Cuál es la mejor API posible para este componente?
> Eso es diseño de producto para desarrolladores.

---

## 🎯 Las 3 fases de Protonic

```
FASE 1                    FASE 2                       FASE 3
React + TypeScript   →    PROTONIC Design System   →   Capa Agéntica
+ React Aria               (Tokens, Theme,               (Auditor, A11y,
+ Componentes base          Components, Storybook)        Docs, Review Agents)
```

---

## ⚙️ FASE 1 — Fundamentos Técnicos + Componentes Base
**Objetivo:** Dominar React Aria lo suficiente para construir 4 componentes accesibles que sirvan de cimiento a Protonic.

> ⚠️ Esta fase es 100% técnica. No hay diseño de marca todavía — eso es Fase 2. Acá el foco es entender la mecánica de React Aria y producir componentes funcionales y accesibles.

### 1.0 Setup del repositorio
- [ ] Crear repo en GitHub: `protonic` (o el nombre que prefieras)
- [ ] Inicializar proyecto: `npm create vite@latest protonic -- --template react-ts`
- [ ] Instalar dependencias base:
  ```bash
  npm install react-aria react-aria-components
  npm install -D typescript @types/react @types/react-dom
  ```
- [ ] Configurar estructura de carpetas:
  ```
  /src
    /components       ← cada componente con su carpeta
      /Button
        Button.tsx
        Button.types.ts
        Button.stories.tsx (más adelante, Fase 2)
        index.ts
    /tokens            ← preparado para Fase 2, vacío por ahora
    /lib               ← utilidades compartidas (cn(), helpers)
  ```
- [ ] Configurar TypeScript estricto (`strict: true` en `tsconfig.json`)
- [ ] Configurar ESLint + Prettier para consistencia desde el día 1

### 1.1 Repaso de React + TypeScript orientado a componentes
- [ ] Repasar **props tipadas con interfaces/types** (no `any`)
- [ ] Repasar **composición de componentes** (children, render props)
- [ ] Entender **forwardRef** — necesario porque muchos componentes de React Aria requieren pasar refs al DOM
- [ ] Entender **Generics en TypeScript** a nivel básico (React Aria los usa mucho en sus tipos)
- [ ] Repasar hooks: `useState`, `useRef`, `useContext` (React Aria expone varios hooks propios que siguen este patrón)

### 1.2 Entender la arquitectura de React Aria
- [ ] Leer la documentación oficial: [react-aria.adobe.com](https://react-aria.adobe.com/)
- [ ] Entender la diferencia entre las **3 capas** que ofrece React Aria:
  - **React Aria Hooks** (`useButton`, `useSelect`) → solo lógica, máxima flexibilidad, más código
  - **React Aria Components** (`<Button>`, `<Select>`) → componentes ya armados sin estilos, recomendado para empezar
  - **React Spectrum** → componentes con el diseño de Adobe ya aplicado (no lo vamos a usar, es la capa de diseño de Adobe, no la nuestra)
- [ ] Decisión: **usar React Aria Components** (la capa intermedia) como base de Protonic — da estructura sin atarte a hooks de bajo nivel todavía
- [ ] Entender el patrón de **render props** que usa React Aria para exponer estados (`isHovered`, `isPressed`, `isFocusVisible`, `isDisabled`)

### 1.3 Construir: Button accesible
- [ ] Importar `Button` desde `react-aria-components`
- [ ] Crear `Button.tsx` envolviendo el `Button` de React Aria
- [ ] Definir el primer borrador de API (se refina en Fase 2, pero ya pensando en casos de uso):
  ```tsx
  interface ProtonicButtonProps {
    variant?: 'primary' | 'secondary' | 'destructive';
    size?: 'small' | 'medium' | 'large';
    isLoading?: boolean;
    isDisabled?: boolean;
    children: React.ReactNode;
  }
  ```
- [ ] Verificar que el `Button` de React Aria expone correctamente: `onPress` (no `onClick` — React Aria normaliza mouse/touch/teclado en este evento)
- [ ] Probar estados con teclado: Tab para foco, Enter/Espacio para activar
- [ ] Probar `isDisabled` y confirmar que el botón no es focuseable cuando está deshabilitado
- [ ] Checklist de accesibilidad mínima a verificar:
  - [ ] Focus visible (anillo de foco, aunque sea default por ahora)
  - [ ] Funciona con teclado sin mouse
  - [ ] `aria-disabled` se aplica correctamente cuando `isDisabled`
  - [ ] El texto del botón es leído correctamente por un lector de pantalla (probar con VoiceOver/NVDA si es posible)

### 1.4 Construir: Dialog accesible
- [ ] Importar `Dialog`, `Modal`, `ModalOverlay`, `DialogTrigger` desde `react-aria-components`
- [ ] Crear `Modal.tsx` (Protonic le va a decir "Modal" aunque React Aria lo llame "Dialog" — esa es una decisión de naming que documentamos en Fase 2)
- [ ] Entender el patrón de composición: `DialogTrigger` → `Button` (trigger) + `ModalOverlay` → `Modal` → `Dialog`
- [ ] Implementar el cierre con:
  - [ ] Tecla `Escape`
  - [ ] Click fuera del modal (overlay)
  - [ ] Botón de cierre explícito
- [ ] Checklist de accesibilidad:
  - [ ] El foco se mueve automáticamente dentro del modal al abrirse (focus trap)
  - [ ] El foco vuelve al elemento que abrió el modal al cerrarse
  - [ ] El foco queda **atrapado** dentro del modal mientras está abierto (no se puede tabular hacia el resto de la página)
  - [ ] El modal tiene `aria-modal="true"` y un `aria-labelledby` apuntando al título

### 1.5 Construir: Select accesible
- [ ] Importar `Select`, `SelectValue`, `Popover`, `ListBox`, `ListBoxItem` desde `react-aria-components`
- [ ] Crear `Select.tsx` con un set de opciones de prueba (ej: lista de países o categorías)
- [ ] Entender el patrón: `Select` (contenedor) → `Button` (trigger visual) → `Popover` → `ListBox` → `ListBoxItem` (cada opción)
- [ ] Implementar navegación con teclado:
  - [ ] Flechas arriba/abajo para moverse entre opciones
  - [ ] Enter para seleccionar
  - [ ] Escape para cerrar sin seleccionar
  - [ ] Escribir una letra para saltar a la opción que empieza con esa letra (typeahead — React Aria lo da gratis)
- [ ] Checklist de accesibilidad:
  - [ ] `aria-expanded` cambia correctamente al abrir/cerrar
  - [ ] Cada opción tiene el rol correcto (`option`) dentro del `listbox`
  - [ ] La opción seleccionada se anuncia correctamente al lector de pantalla

### 1.6 Construir: Table accesible
- [ ] Importar `Table`, `TableHeader`, `Column`, `TableBody`, `Row`, `Cell` desde `react-aria-components`
- [ ] Crear `Table.tsx` con datos de prueba (mínimo 3 columnas, 5 filas)
- [ ] Implementar **sorting** por columna usando las props que expone React Aria (`allowsSorting`, `sortDescriptor`)
- [ ] Implementar selección de filas (`selectionMode="multiple"` o `"single"`)
- [ ] Checklist de accesibilidad:
  - [ ] Navegación completa por teclado (flechas para moverse entre celdas, Tab para salir de la tabla)
  - [ ] Roles ARIA correctos: `table`, `row`, `columnheader`, `cell`
  - [ ] El estado de ordenamiento se anuncia (`aria-sort`)
  - [ ] Las filas seleccionadas se anuncian correctamente

### 1.7 Cierre de Fase 1
- [ ] Tener los 4 componentes (`Button`, `Modal`, `Select`, `Table`) funcionando sin estilos, 100% accesibles, en el repo de Protonic
- [ ] Cada componente debe poder usarse en una página de prueba simple (`App.tsx`) sin errores de consola
- [ ] Documentar en un `NOTES.md` cualquier limitación o duda encontrada con React Aria, para no perderla antes de pasar a Fase 2
- [ ] Pedirle a Claude (Claudio) que **extraiga y resuma las consideraciones de accesibilidad** que React Aria ya maneja en estos 4 componentes — esto te da un documento de referencia para cuando empieces a aplicarle estilos en Fase 2 (para no romper algo que ya funciona)

---

## 🎨 FASE 2 — PROTONIC Design System
**Objetivo:** Construir la capa de diseño encima de los componentes accesibles de Fase 1: tokens, theming, API definitiva y documentación visual.

> Esta fase se conecta directamente con las Fases 3 y 4 de tu roadmap general (Sistema de Tokens y Construir desde los Contratos). Acá las vas a aplicar a un proyecto técnico real.

### 2.1 Definir los contratos de marca de Protonic
- [ ] Definir qué valores debe comunicar Protonic visualmente (¿técnico/confiable? ¿moderno/minimalista?)
- [ ] Tomar decisiones justificadas: border radius, tipografía, paleta de color
- [ ] Documentar estas decisiones antes de tocar código de estilos

### 2.2 Sistema de tokens
- [ ] Crear tokens primitivos (`/src/tokens/primitives.ts` o `.css`)
- [ ] Crear tokens semánticos que referencien a los primitivos
- [ ] Definir tokens de spacing, color, radius, tipografía, sombras

### 2.3 Theming
- [ ] Decidir mecanismo de theming: CSS custom properties + Tailwind, o CSS-in-JS
- [ ] Aplicar los tokens semánticos a cada uno de los 4 componentes de Fase 1
- [ ] Soporte mínimo de modo claro/oscuro (opcional, pero valioso para portfolio)

### 2.4 API definitiva de componentes
- [ ] Revisar la API borrador de cada componente (definida en Fase 1) y ajustarla con **Class Variance Authority (CVA)**
- [ ] Asegurar consistencia de naming entre componentes (si `Button` usa `size`, `Select` y `Modal` también deben usar `size` con los mismos valores)
- [ ] Documentar cada prop: qué hace, cuándo usarla, valores posibles

### 2.5 Construir componentes nuevos (no vienen de React Aria directo)
- [ ] **Card** → composición propia (no es un componente de React Aria), usando tokens de Protonic
- [ ] **DataTable** → extensión de la `Table` de Fase 1 con funcionalidades de producto (paginación, filtros)
- [ ] **Dashboard Widgets** → composiciones de Card + otros átomos, pensadas para un caso de uso real

### 2.6 Documentación visual
- [ ] Instalar y configurar **Storybook**
- [ ] Crear una story por componente mostrando todas sus variantes
- [ ] Documentar accesibilidad heredada de React Aria en cada story (qué viene resuelto de fábrica)

---

## 🤖 FASE 3 — Capa Agéntica (extensión, no núcleo)
**Objetivo:** Una vez que Protonic tiene contratos y componentes sólidos, usar IA para mantenerlos y escalarlos — no para diseñarlos desde cero.

> ⚠️ Esta fase solo tiene sentido después de cerrar Fase 2. Es la misma regla de tu roadmap general: sin contratos definidos, la IA no tiene nada que hacer cumplir.

### Posibles agentes a construir sobre Protonic
- [ ] **Component Auditor Agent** → revisa que los componentes nuevos sigan las convenciones de naming y API ya establecidas
- [ ] **Accessibility Agent** → verifica que cualquier componente nuevo no rompa las garantías de accesibilidad heredadas de React Aria
- [ ] **Documentation Agent** → genera o actualiza automáticamente la documentación de Storybook cuando cambia una API
- [ ] **Design Review Agent** → compara un componente nuevo contra los tokens y contratos definidos, señalando inconsistencias

### Estructura final del proyecto

```
PROTONIC
├── Design System          (Fase 2)
├── React Components       (Fases 1-2)
├── Accessibility Layer     (heredada de React Aria, Fase 1)
├── AI Component Generator  (Fase 3)
├── Documentation Agent     (Fase 3)
├── Audit Agent              (Fase 3)
└── Design Review Agent      (Fase 3)
```

---

## 💡 Por qué este proyecto tiene sentido como portfolio

Protonic, completado hasta Fase 2 (mínimo) o Fase 3 (ideal), demuestra:

- **Frontend moderno**: React + TypeScript + arquitectura de componentes real
- **Accesibilidad**: no como checkbox, sino entendida desde la base (React Aria)
- **Design Systems**: tokens, contratos, API de componentes pensada como producto
- **IA aplicada con criterio**: agentes que mantienen un sistema ya sólido, no que lo reemplazan

> *"Construí tu propio Design System encima de React Aria para aprender arquitectura de componentes y accesibilidad, y después si querés agregale toda la parte agéntica."*

Esa es la traducción completa de lo que te propuso Cristian.

---

— Roadmap derivado de la conversación con Cristian Achiardi Morales
