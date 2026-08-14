import React, { useState } from 'react';
import { supabase } from '../services/supabase';

export default function FormularioVale({ onValeCreado }) {
  const [concepto, setConcepto] = useState('');
  const [monto, setMonto] = useState('');

  const agregarVale = async (e) => {
    e.preventDefault();
    if (!concepto || !monto) return;

    const { error } = await supabase
      .from('vales')
      .insert([{ concepto, monto: parseFloat(monto), estatus: 'Pendiente' }]);

    if (error) {
      alert('Error al guardar en Supabase');
    } else {
      setConcepto('');
      setMonto('');
      if (onValeCreado) onValeCreado();
    }
  };

  return (
    <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
      <h2 className="text-lg font-semibold mb-4 text-slate-700">Crear Nuevo Vale</h2>
      <form onSubmit={agregarVale} className="flex gap-4 items-end">
        <div className="flex-1">
          <label className="block text-xs font-medium text-slate-600 mb-1">Concepto / Motivo</label>
          <input 
            type="text" 
            value={concepto}
            onChange={(e) => setConcepto(e.target.value)}
            placeholder="Ej. Compra de material"
            className="w-full border border-slate-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        <div className="w-36">
          <label className="block text-xs font-medium text-slate-600 mb-1">Monto ($)</label>
          <input 
            type="number" 
            value={monto}
            onChange={(e) => setMonto(e.target.value)}
            placeholder="0.00"
            className="w-full border border-slate-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        <button 
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg text-sm transition-colors"
        >
          + Guardar
        </button>
      </form>
    </section>
  );
}