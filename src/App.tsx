import { useState } from 'react';
import { Catalogo } from './Catalogo';
import { productos, type Producto } from './datos';
import { Encabezado } from './Encabezado';
import { Layout } from './Layout';
import { PiePagina } from './PiePagina';
import { Filtros } from './Filtros';

const categorias = ['todas', ...new Set(productos.map((p) => p.categoria))]

function App() {
  // Estado #1 depende del filtro
  const [categoria, setCategoria] = useState('todas');
  // Estado #2 carrito
  const [carrito, setCarrito] = useState<Producto[]>([]);

  const productosVisibles = categoria === 'todas' ? productos: productos.filter((p) => p.categoria === categoria);
  const total = carrito.reduce((suma, p) => suma + p.precio, 0);

  function agregar(producto: Producto) {
    setCarrito([...carrito, producto]);
  }

  return (
    <Layout encabezado= {<Encabezado piezas={carrito.length}/>} pie={<PiePagina piezas={carrito.length} total={total} />}>
      <section className='portada'>
        <h1>Catálogo de temporada</h1>
        <Filtros categorias={categorias} activa={categoria} onCambiar={setCategoria}/>
        <Catalogo productos = {productosVisibles} onAgregar={agregar}/>

      </section>
    </Layout>
  );
}

export default App