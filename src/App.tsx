import { useState } from 'react';
import { Catalogo } from './Catalogo';
import { Encabezado } from './Encabezado';
import { Layout } from './Layout';
import { PiePagina } from './PiePagina';
import { Filtros } from './Filtros';
import { useProductos } from './hooks/useProductos';
import type { Producto } from './datos';
import { MensajeError } from './MensajeError';
import { Cargando } from './Cargando';
import { FormularioPago } from './FormularioPago';

function App() {
  //Estado # 1 depende del filtro
  const { productos, cargando, error, reintentar } = useProductos();
  const [categoria, setCategoria] = useState('todas');
  const [carrito, setCarrito] = useState<Producto[]>([]);
  const [folio, setFolio] = useState<string | null>(null);


  const categorias = ['todas', ...new Set(productos.map(p => p.categoria))];
  const productosvisibles = categoria === 'todas' ? productos: productos.filter((p)=>p.categoria === categoria);
  const total = carrito.reduce((suma, p) => suma + p.precio, 0);

  function agregar(producto: Producto){
    setCarrito((anterior)=> [...anterior, producto]);
    setFolio(null);
  }

  function pagado(folioNuevo: string){
    setFolio(folioNuevo);
    setCarrito([]);
    reintentar();
  }

  return (
    <Layout 
      encabezado={<Encabezado piezas={carrito.length} />} 
      pie={<PiePagina piezas={carrito.length} total={total} />}>
      <section className='portada'>
        <h1>Catalogo de temporada</h1>
        <p>{productosvisibles.length} productos disponibles</p>
      </section>
        {cargando && <Cargando />}
        {error && <MensajeError mensaje = {error} onReintentar={reintentar} />}
        {!cargando && !error && (
          <>
          <Filtros categorias={categorias} activa={categoria} onCambiar={setCategoria} />
          <Catalogo productos={productosvisibles} onAgregar={agregar} />
          </>
        )}
        {folio && <p className='confirmacion'>Pedido confirmado con folio {folio}</p>}
        {carrito.length > 0 && <FormularioPago carrito={carrito} onPagado={pagado} />}
    </Layout>
  );
}

export default App