# CLAUDE.md — everydat-i18n

Paquete i18n compartido de Everydat 2027 (`@everydat/i18n`). Privado, sin build: se consume
por `file:` desde `everydat-admin` (y previsiblemente desde `everydat-mobile`).
Ecosistema y convenciones transversales: `../everydat-design/CLAUDE.md`.

```
src/es.json  src/en.json  src/fr.json   — diccionarios (es es el idioma de referencia)
src/index.ts                            — punto de entrada del paquete
```

---

## Convenciones

- **Los tres diccionarios se tocan a la vez.** Añadir una clave solo en `es.json` deja
  huecos silenciosos en `en`/`fr`.
- Las claves de dominio (nombre, apellidos, teléfono, dirección…) se centralizan aquí para
  no repetir la misma traducción en cada módulo del admin. En el consumidor, el patrón es
  un objeto `FIELDS` envuelto en `useMemo`.
- Español de España en `es.json`.
- Al cambiar algo aquí, comprobar el consumidor: `everydat-admin` lo enlaza por ruta de
  fichero, así que un cambio se ve sin reinstalar, pero un renombrado de clave rompe en
  tiempo de ejecución, no de compilación.
