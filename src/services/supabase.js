import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// =====================================================
// FUNCIONES DE SERVICIO (COLABORADOR 3)
// =====================================================

// 1. Función para obtener la lista de vales desde Supabase
export const obtenerValesBD = async () => {
  const { data, error } = await supabase
    .from('vales')
    .select('*')
    .order('id', { ascending: false });

  if (error) {
    console.error('Error al obtener vales:', error.message);
    return [];
  }
  return data;
};

// 2. Función para insertar un nuevo vale en Supabase
export const crearValeBD = async (concepto, monto) => {
  const { data, error } = await supabase
    .from('vales')
    .insert([{ concepto, monto: parseFloat(monto), estatus: 'Pendiente' }])
    .select();

  if (error) {
    console.error('Error al crear vale:', error.message);
    return { exito: false, error };
  }
  return { exito: true, data };
};