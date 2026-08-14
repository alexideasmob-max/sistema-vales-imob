import React, { useState } from 'react';

export default function App() {
  const [vales, setVales] = useState([
    { id: 1, folio: 'V-001', concepto: 'Material de Limpieza', monto: 1250, estatus: 'Aprobado' },
    { id: 2, folio: 'V-002', concepto: 'Gasolina Camión 3', monto: 850, estatus: 'Pendiente' },
    { id: 3, folio: 'V-003', concepto: 'Papelería de Oficina', monto: 420, estatus: 'Aprobado' },
  ]);

  const [concepto, setConcepto] = useState('');
  const [monto, setMonto] = useState('');

  const agregarVale = (e) => {
    e.preventDefault();
    if (!concepto || !monto) return;

    const nuevoVale = {
      id: Date.now(),
      folio: `V-00${vales.length + 1}`,
      concepto,
      monto: parseFloat(monto),
      estatus: 'Pendiente'
    };

    setVales([...vales, nuevoVale]);
    setConcepto('');
    setMonto('');
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 p-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Encabezado */}
        <header className="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Sistema de Vales iMOB</h1>
            <p className="text-sm text-slate-500">Panel de Control & Registro de Solicitudes</p>
          </div>
          <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-semibold">
            ● Base Lista
          </span>
        </header>

        {/* Formulario de registro */}
        <section className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h2 className="text-lg font-semibold mb-4 text-slate-700">Crear Nuevo Vale</h2>
          <form onSubmit={agregarVale} className="flex gap-4 items-end">
            <div className="flex-1">
              <label className="block text-xs font-medium text-slate-600 mb-1">Concepto / Motivo</label>
              <input 
                type="text" 
                value={concepto}
                onChange={(e) => setConcepto(e.target.value)}
                placeholder="Ej. Compra de herramientas"
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
              + Agregar
            </button>
          </form>
        </section>

        {/* Tabla de Registros */}
        <section className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs text-slate-500 font-semibold uppercase">
                <th className="p-4">Folio</th>
                <th className="p-4">Concepto</th>
                <th className="p-4">Monto</th>
                <th className="p-4">Estatus</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {vales.map((vale) => (
                <tr key={vale.id} className="hover:bg-slate-50">
                  <td className="p-4 font-mono font-medium text-slate-600">{vale.folio}</td>
                  <td className="p-4 text-slate-800 font-medium">{vale.concepto}</td>
                  <td className="p-4 text-slate-900 font-bold">${vale.monto.toLocaleString()}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-md text-xs font-semibold ${
                      vale.estatus === 'Aprobado' 
                        ? 'bg-emerald-50 text-emerald-600' 
                        : 'bg-amber-50 text-amber-600'
                    }`}>
                      {vale.estatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

      </div>
    </div>
  );
}