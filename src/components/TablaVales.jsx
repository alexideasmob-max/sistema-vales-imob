import React from 'react';

export default function TablaVales({ vales, cargando }) {
  return (
    <section className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      {cargando ? (
        <p className="p-6 text-center text-slate-500 text-sm">Cargando datos de Supabase...</p>
      ) : (
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-xs text-slate-500 font-semibold uppercase">
              <th className="p-4">ID</th>
              <th className="p-4">Concepto</th>
              <th className="p-4">Monto</th>
              <th className="p-4">Estatus</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {vales.length === 0 ? (
              <tr>
                <td colSpan="4" className="p-6 text-center text-slate-400">
                  No hay vales registrados aún.
                </td>
              </tr>
            ) : (
              vales.map((vale) => (
                <tr key={vale.id} className="hover:bg-slate-50">
                  <td className="p-4 font-mono font-medium text-slate-400">#{vale.id}</td>
                  <td className="p-4 text-slate-800 font-medium">{vale.concepto}</td>
                  <td className="p-4 text-slate-900 font-bold">${vale.monto}</td>
                  <td className="p-4">
                    <span className="px-2 py-1 rounded-md text-xs font-semibold bg-amber-50 text-amber-600">
                      {vale.estatus || 'Pendiente'}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </section>
  );
}