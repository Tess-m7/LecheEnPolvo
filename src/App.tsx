import { useState } from "react";

interface Categoria {
  id: number;
  nombre: string;
  consumo: number;
}

const categorias: Categoria[] = [
  { id: 1, nombre: "Copa de leche", consumo: 0.016 },
  { id: 2, nombre: "Almuerzo", consumo: 0.007 },
  { id: 3, nombre: "CL y Almuerzo", consumo: 0.023 },
  { id: 4, nombre: "2 CL y Almuerzo", consumo: 0.032 },
  { id: 5, nombre: "Internado", consumo: 0.046 },
];

export default function App() {
  const [categoria, setCategoria] = useState<number>(1);
  const [comensales, setComensales] = useState<string>("");
  const [dias, setDias] = useState<string>("");
  const [resultados, setResultados] = useState<{ categoria: string; comensales: number; dias: number; total: string }[]>([]);

  const calcular = () => {
    const seleccionada = categorias.find((cat) => cat.id === categoria);
    if (!seleccionada) return;

    const com = Number(comensales);
    const d = Number(dias);
    if (isNaN(com) || isNaN(d)) return;

    const total = seleccionada.consumo * com * d;
    setResultados(prev => [...prev, {
      categoria: seleccionada.nombre,
      comensales: com,
      dias: d,
      total: total.toFixed(3)
    }]);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Cálculo de Leche en Polvo</h1>

        <div className="flex flex-col gap-4">
          <div>
            <label className="block mb-1">Categoría:</label>
            <select
              value={categoria}
              onChange={(e) => setCategoria(Number(e.target.value))}
              className="w-full p-2 border rounded"
            >
              {categorias.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.id}. {cat.nombre}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1">Cantidad de comensales:</label>
            <input
              type="number"
              value={comensales}
              onChange={(e) => setComensales(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block mb-1">Cantidad de días hábiles:</label>
            <input
              type="number"
              value={dias}
              onChange={(e) => setDias(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>

          <button
            onClick={calcular}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Calcular
          </button>
        </div>

        {resultados.length > 0 && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-center mb-2">Resultados:</h2>
            <table className="w-full text-sm border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-2 border">Categoría</th>
                  <th className="p-2 border">Comensales</th>
                  <th className="p-2 border">Días</th>
                  <th className="p-2 border">Total (kg)</th>
                </tr>
              </thead>
              <tbody>
                {resultados.map((r, index) => (
                  <tr key={index} className="text-center">
                    <td className="p-2 border">{r.categoria}</td>
                    <td className="p-2 border">{r.comensales}</td>
                    <td className="p-2 border">{r.dias}</td>
                    <td className="p-2 border">{r.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
