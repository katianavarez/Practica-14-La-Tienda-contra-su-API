import axios from "axios";
import { api } from "./api";
import type { Producto } from "../datos";

interface Sobre<T> {
    data : T;
}

export interface Pedido {
    correo: string;
    telefono: string;
    productos: string[];
}

export async function traerProductos(): Promise<Producto[]> {
    const response = await api.get<Sobre<Producto[]>>('/productos');
    return response.data.data;
}

export async function crearPedido(pedido:Pedido): Promise<{ folio: string, total: number }> {
    try {
        const response = await api.post<Sobre<{ folio: string, total: number }>>('/pedidos', pedido);
        return response.data.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            const mensaje = error.response.data.message;
            throw new Error(Array.isArray(mensaje) ? mensaje[0] : mensaje);
        }
        throw new Error("No se logró guardar el pedido.");
    }
}