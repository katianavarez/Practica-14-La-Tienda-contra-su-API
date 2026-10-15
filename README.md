# Práctica 13 – La tienda: composición, eventos y estado

## Preguntas

### ¿Por qué el Layout no necesita saber que es una tienda?

Porque el layout nada más es como para acomodar las cosas (encabezado arriba, pie abajo, contenido en medio), no necesita saber qué vas a poner en cada lugar, solo le mandas los props y él lo pone donde corresponda.

### ¿Qué pasa si escribes onClick={onAgregar(producto)} sin la flecha?

Sin la flecha la función no se ejecuta cuando le das click, sino cuando aparece la tarjeta, entonces agrega el producto, cambia el estado, se vuelve a pintar la tarjeta y se vuelve a ejecutar y se hace un ciclo infinito. Ya con la flecha se le pasa una función que se ejecuta solo cuando haces click.

### ¿Por qué con carrito.push(...) el contador no se mueve y no sale ningún error?

Porque push modifica el mismo arreglo que ya estaba en el estado. React compara el arreglo nuevo con el anterior y como ve que es el mismo piensa que no cambió nada y no sale error porque push en js sí se agrega al arreglo pero la pantalla no lo nota, entonces por eso usamos setCarrito([...carrito, producto]) que crea el arreglo nuevo para que react se de cuenta que cambió.



# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.
