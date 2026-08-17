import React, { useState } from 'react';
import { supabase } from '../services/supabase';

export default function FormularioVale({ onValeCreado }) {
  const [concepto, setConcepto] = useState('');
  const [monto, setMonto] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const agregarVale = async (e) => {
    e.preventDefault();
    
    if (!concepto || !monto) {
      setErrorMsg('Todos los campos son obligatorios');
      return;
    }

    const valorMonto = parseFloat(monto);
    if (valorMonto <= 0) {
      setErrorMsg('El monto debe ser mayor a $0');
      return;
    }

    const { error } = await supabase
      .from('vales')
      .insert([{ concepto, monto: valorMonto, estatus: 'Pendiente' }]);

    if (error) {
      alert('Error al guardar en Supabase');
    } else {
      setConcepto('');
      setMonto('');
      setErrorMsg('');
      if (onValeCreado) onValeCreado();
    }
  };

  return (
    <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
      <h2 className="text-lg font-semibold mb-4 text-slate-700">Registrar Nuevo Vale de Fabrica</h2>
      
      {errorMsg && (
        <p className="text-xs text-red-500 font-medium mb-3">
          {errorMsg}
        </p>
      )}

      <form onSubmit={agregarVale} className="flex gap-4 items-end pb-4">
        <div className="flex-1">
          <label className="block text-xs font-medium text-slate-600 mb-1">Concepto / Motivo</label>
          <input 
            type="text" 
            value={concepto}
            onChange={(e) => setConcepto(e.target.value)}
            placeholder="Ej. Reparación de maquinaria"
            required
            className="w-full border border-slate-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        
        <div className="w-36 relative">
          <label className="block text-xs font-medium text-slate-600 mb-1">Monto ($)</label>
          <input 
            type="number" 
            value={monto}
            onChange={(e) => setMonto(e.target.value)}
            placeholder="0.00"
            className="w-full border border-slate-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <small className="text-[10px] text-slate-500 absolute -bottom-5 left-0 whitespace-nowrap">
            Ingresa el monto en MXN
          </small>
        </div>

        <button 
          type="submit"
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-4 py-2 rounded-lg text-sm transition-colors h-[38px]"
        >
          Guardar Registro
        </button>
      </form>
    </section>
  );
}