import { useState, type FormEvent } from "react";
import type { Producto } from "./datos";
import { crearPedido } from "./servicios/tienda";

interface FormularioPagoProps {
    carrito: Producto[];
    onPagado: (folio: string) => void;
}

export function FormularioPago({carrito, onPagado}: FormularioPagoProps) {
    const [correo, setCorreo] = useState('');
    const [telefono, setTelefono] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [enviando, setEnviando] = useState(false);

    async function pagar(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!correo.includes('@')) {
            setError('El correo debe tener @');
            return;
        }
        if (!/^\d{10}$/.test(telefono)) {
            setError('El teléfono debe tener 10 dígitos');
            return;
        }

        setError(null);
        setEnviando(true);
        try {
            const pedido = await crearPedido({ correo, telefono, productos: carrito.map((p) => p.id) });
            onPagado(pedido.folio);
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setEnviando(false);
        }
    }

    return (
        <form className="pago" onSubmit={pagar}>
            <h2>Pago</h2>
            <label>
                Correo
                <input type="text" value={correo} onChange={(e) => setCorreo(e.target.value)} />
            </label>
            <label>
                Teléfono
                <input type="text" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
            </label>
            {error && <p className="pago__error">{error}</p>}
            <button type="submit" disabled={enviando}>
                {enviando ? 'Enviando...' : 'Pagar'}
            </button>
        </form>
    );
}
