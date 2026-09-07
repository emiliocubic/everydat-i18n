// Añade (o sobreescribe) claves en los tres diccionarios a partir de un JSON de
// entrada: { es: {...}, en: {...}, fr: {...} }, con rutas punteadas o anidadas.
// Uso: node scripts/anadir-claves.mjs fichero.json
import fs from 'node:fs'

const [, , fichero] = process.argv
if (!fichero) {
  console.error('Uso: node scripts/anadir-claves.mjs claves.json')
  process.exit(1)
}

const entrada = JSON.parse(fs.readFileSync(fichero, 'utf8'))

function fusionar(destino, origen) {
  for (const [k, v] of Object.entries(origen)) {
    if (v !== null && typeof v === 'object' && !Array.isArray(v)) {
      if (destino[k] === null || typeof destino[k] !== 'object') destino[k] = {}
      fusionar(destino[k], v)
    } else {
      destino[k] = v
    }
  }
}

for (const idioma of ['es', 'en', 'fr']) {
  if (!entrada[idioma]) continue
  const ruta = new URL(`../src/${idioma}.json`, import.meta.url)
  const dic = JSON.parse(fs.readFileSync(ruta, 'utf8'))
  fusionar(dic, entrada[idioma])
  fs.writeFileSync(ruta, JSON.stringify(dic, null, 2) + '\n')
  console.log(`${idioma}: ok`)
}
