import React from 'react';

export default function TablaVales({ vales = [], cargando }) {
  return (
    <section className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      {cargando ? (
        <p className="p-6 text-center text-slate-500 text-sm">Cargando datos de Supabase...</p>
      ) : (
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-xs text-slate-500 font-semibold uppercase">
              <th className="p-4">ID</th>
              <th className="p-4">Descripción del Gasto</th>
              <th className="p-4">Monto</th>
              <th className="p-4">Estado del Vale</th>
              <th className="p-4">Fecha</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {vales.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-6 text-center text-slate-400">
                  No hay vales registrados en el sistema.
                </td>
              </tr>
            ) : (
              vales.map((vale) => {
                const estatus = vale.estatus || 'Pendiente';

                let estatusColor = 'bg-slate-100 text-slate-600';
                if (estatus === 'Pendiente') {
                  estatusColor = 'bg-amber-100 text-amber-800';
                } else if (estatus === 'Aprobado') {
                  estatusColor = 'bg-emerald-100 text-emerald-800';
                }

                return (
                  <tr key={vale.id} className="hover:bg-slate-50">
                    <td className="p-4">
                      <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-mono font-medium text-xs">
                        #{vale.id}
                      </span>
                    </td>
                    <td className="p-4 text-slate-800 font-medium">{vale.concepto}</td>
                    <td className="p-4 text-slate-900 font-bold">$ {vale.monto} MXN</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-md text-xs font-semibold ${estatusColor}`}>
                        {estatus}
                      </span>
                    </td>
                    <td className="p-4 text-slate-500 text-xs">{vale.fecha || 'N/A'}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      )}
    </section>
  );
}
