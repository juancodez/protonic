# CONTENT.md — Protonic Content Guidelines

> Layer 4 of the design system. Documents tone, vocabulary, and copy patterns
> for every component category. Mirrors the contracts.ts philosophy: every rule
> traces to a reason.

---

## Voice

**Warm precision.** Protonic serves Klaro, a fiscal AI for Spanish-speaking freelancers
in Germany. The user is navigating a complex, anxiety-inducing domain (taxes, compliance,
bureaucracy). Copy must be clear and confident — never clinical, never condescending.

| Axis | Do | Don't |
|---|---|---|
| Tone | Direct, calm, specific | Formal bureaucratic language |
| Personality | Clara-adjacent: helpful, honest | Over-promising or dismissive |
| Complexity | Plain words for complex concepts | Jargon without explanation |

---

## Language policy

**Primary: Spanish.** All Klaro-facing copy is Spanish (es-419 — Latin American neutral).
**Secondary: German.** Legal/tax terms appear in German because that is the source: ELSTER,
Freiberufler, EÜR. Write them in German, explain them in Spanish.
**English.** Reserved for developer-facing docs, code comments, and Storybook generic stories.

```
✅  "Factura vencida — plazo superado"
✅  "Tu Steuernummer no ha sido verificado aún."
❌  "Your invoice is overdue." (English in product copy)
❌  "Ihre Rechnung ist überfällig." (German where Spanish is expected)
```

---

## Status vocabulary

`status` is an axis in `src/tokens/axes.ts`. These four values carry fixed semantic meaning.
Use them consistently across Badge, Chip, Toast, and Input `errorMessage`.

| Value | Meaning | Example copy |
|---|---|---|
| `success` | Action completed / state verified | "Pagada", "Verificado", "Guardado" |
| `warning` | Attention needed, not blocking | "Por vencer", "Pendiente", "Revisa" |
| `error` | Blocking problem / data invalid | "Vencida", "Error al guardar", "Campo requerido" |
| `info` | Neutral context / in progress | "En proceso", "Clara está respondiendo…" |

**Rule:** Status copy must match the semantic value. Never use `success` styling for a
neutral state, or `info` for an error that the user must act on.

---

## Button copy

**Use verbs. Be specific. Match the consequence.**

```
✅  "Guardar cambios"       (specific, reversible)
✅  "Eliminar cuenta"       (specific, irreversible — use variant="destructive")
✅  "Enviar declaración"    (specific, consequential)
❌  "OK" / "Aceptar"        (vague — what is being accepted?)
❌  "Click aquí"            (describes the interaction, not the outcome)
❌  "Procesar"              (machine vocabulary — users don't "process" things)
```

**Loading state:** keep the verb, add context.
```
✅  "Guardando…"   (not "Cargando…" — that's for page loads, not saves)
✅  "Enviando…"
✅  "Verificando…"
❌  "Por favor espere…"    (passive, unhelpful)
```

**Destructive confirmation modal pattern:**
Primary button in a destructive Modal must restate the action:
```
✅  <Button variant="destructive">Eliminar cuenta</Button>
❌  <Button variant="destructive">Sí</Button>   (no context if user is distracted)
```

---

## Badge + Chip copy

**Badge:** system signal. One to three words max. No verbs.
```
✅  "Pagada" / "Vencida" / "Pendiente" / "Nuevo"
❌  "Esta factura ya fue pagada"   (too long — use a tooltip or description)
```

**Chip (dismissible filter):** noun or noun phrase describing the active filter.
```
✅  "Filtro: 2024" / "IVA incluido" / "Freelance"
❌  "Eliminar filtro 2024"    (the × button is the dismiss action — don't duplicate)
```

---

## Input + Select labels

Labels are short, sentence-case, no trailing colon.
```
✅  "Nombre completo"
✅  "Fecha de emisión"
✅  "Tipo de autónomo"
❌  "Nombre Completo:"    (title case + colon — not our convention)
❌  "Por favor ingresa tu nombre completo"    (instruction belongs in description, not label)
```

**Description (helper text):** one sentence max. Explains format or context.
```
✅  "Formato: TT.MM.JJJJ"
✅  "Tal como aparece en tu Steuerbescheid"
❌  "Este campo es obligatorio"    (conveys nothing; mark required with * instead)
```

**Error messages:** specific, actionable, no blame.
```
✅  "Ingresa una fecha válida (TT.MM.JJJJ)"
✅  "El correo ya está registrado — ¿quieres iniciar sesión?"
❌  "Campo inválido"      (what's invalid about it?)
❌  "Error 422"           (server code — translate it)
❌  "¡Debes completar esto!"  (blame + exclamation)
```

---

## Modal copy

**Title:** noun phrase, not a question.
```
✅  "Confirmar eliminación"
✅  "Detalles de factura"
❌  "¿Estás seguro?"    (question title — ambiguous heading for AT users)
```

**Body:** one short paragraph. State consequence for destructive actions.
```
✅  "Esta acción eliminará tu cuenta y todos los datos asociados. No se puede deshacer."
❌  "¿Seguro que deseas hacer esto?"    (no consequence stated)
```

---

## Toast copy

Auto-dismissing — copy must be readable in ~3 seconds.
```
✅  "Factura guardada"          (success — past tense, brief)
✅  "Error al conectar. Reintenta."  (error — cause + next step)
✅  "Clara está procesando…"    (info — ongoing state)
❌  "La operación se completó con éxito"  (too long, passive)
❌  "¡Listo!"  (too vague — what's ready?)
```

---

## Table copy

**Column headers:** noun or short noun phrase, title-case in Spanish is sentence-case.
```
✅  "Factura" / "Importe" / "Estado" / "Fecha"
❌  "Número de factura del cliente"    (too long for a column header)
```

**Empty state (no rows):** explain why + offer a next action.
```
✅  "No hay facturas aún. Crea tu primera factura →"
❌  "Sin resultados"    (no guidance, no next step)
```

**Loading row:** match the skeleton count to the expected result count (3 rows default).

---

## Clara (AI persona) copy

Clara is a fiscal AI — she is knowledgeable, honest about uncertainty, and never
pretends to be a human lawyer.

```
✅  "Según tu situación, podrías deducir el 30% de los gastos de oficina en casa."
✅  "No estoy segura — te recomiendo confirmar con un Steuerberater para este caso."
❌  "¡Excelente pregunta! Claro que puedo ayudarte con eso 😊"   (hollow affirmation)
❌  "Conforme al § 4 EStG, el contribuyente tiene derecho a..."  (legalese)
```

---

## Numbers + dates

Follow German locale for tax documents, Spanish phrasing for UI.

| Format | Use |
|---|---|
| Currency | `€1.250,00` (German locale: period as thousands, comma as decimal) |
| Dates in UI | `15 de enero de 2025` (long form for clarity) |
| Dates in tables | `15.01.2025` (German short form — familiar to users filing in Germany) |
| Percentages | `19 %` (space before %) |

---

## Agents that consume this file

- `/review-pr` — Layer 4 checks whether visible strings in the component match these patterns
- `/docs-agent` — uses status vocabulary and button copy rules when generating stories
- `aiHints` in metadata should reference terms from this file when relevant

**Source of truth for Clara's extended conversation guidelines:**
`C:\Users\tn\klaro-web\src\lib\clara\` (system prompt, persona, tone calibration)
