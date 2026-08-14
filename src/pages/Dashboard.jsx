import React, { useState, useEffect } from 'react';
import { supabase } from '../services/supabase';
import FormularioVale from '../components/FormularioVale';
import TablaVales from '../components/TablaVales';

export default function Dashboard() {
  const [vales, setVales] = useState([]);
  const [cargando, setCargando] = useState(false);

  const obtenerVales = async () => {
    setCargando(true);
    const { data, error } = await supabase
      .from('vales')
      .select('*')
      .order('id', { ascending: false });

    if (!error) setVales(data || []);
    setCargando(false);
  };

  useEffect(() => {
    obtenerVales();
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 p-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-6">
        <header className="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Sistema de Vales iMOB</h1>
            <p className="text-sm text-slate-500">Panel Modular de Control</p>
          </div>
          <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-semibold">
            ● Supabase Conectado
          </span>
        </header>

        {/* Componente 1: Formulario */}
        <FormularioVale onValeCreado={obtenerVales} />

        {/* Componente 2: Tabla */}
        <TablaVales vales={vales} cargando={cargando} />
      </div>
    </div>
  );
}