import { useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

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
  const [escuela, setEscuela] = useState<string>("");
  const [comensales, setComensales] = useState<string>("");
  const [dias, setDias] = useState<string>("");
  const [resultados, setResultados] = useState<{
    escuela: string;
    categoria: string;
    comensales: number;
    dias: number;
    total: string;
  }[]>([]);

  const calcular = () => {
    const seleccionada = categorias.find((cat) => cat.id === categoria);
    if (!seleccionada) return;

    const com = Number(comensales);
    const d = Number(dias);
    if (isNaN(com) || isNaN(d) || escuela.trim() === "") return;

    const total = seleccionada.consumo * com * d;
    setResultados((prev) => [
      ...prev,
      {
        escuela: escuela.trim(),
        categoria: seleccionada.nombre,
        comensales: com,
        dias: d,
        total: total.toFixed(3),
      },
    ]);

    setEscuela("");
    setComensales("");
    setDias("");
  };

  const exportarPDF = () => {
    const doc = new jsPDF();
    doc.text("Resumen de consumo de leche en polvo", 14, 16);
    autoTable(doc, {
      startY: 20,
      head: [["Escuela", "Categoría", "Comensales", "Días", "Total (kg)"]],
      body: resultados.map((r) => [r.escuela, r.categoria, r.comensales, r.dias, r.total]),
    });
    doc.save("resumen_leche.pdf");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-xl">
        <h1 className="text-2xl font-bold mb-4 text-center">Cálculo de Leche en Polvo</h1>

        <div className="flex flex-col gap-3 text-sm">
          <div>
            <label className="block mb-1">Número de escuela:</label>
            <input
              type="text"
              value={escuela}
              onChange={(e) => setEscuela(e.target.value)}
              className="w-full p-1.5 border rounded text-sm"
              placeholder="Ej: 123"
            />
          </div>

          <div>
            <label className="block mb-1">Categoría:</label>
            <select
              value={categoria}
              onChange={(e) => setCategoria(Number(e.target.value))}
              className="w-full p-1.5 border rounded text-sm"
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
              className="w-full p-1.5 border rounded text-sm"
            />
          </div>

          <div>
            <label className="block mb-1">Cantidad de días hábiles:</label>
            <input
              type="number"
              value={dias}
              onChange={(e) => setDias(e.target.value)}
              className="w-full p-1.5 border rounded text-sm"
            />
          </div>

          <button
            onClick={calcular}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 text-sm"
          >
            Agregar escuela
          </button>

          {resultados.length > 0 && (
            <button
              onClick={exportarPDF}
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 text-sm"
            >
              Exportar resumen en PDF
            </button>
          )}
        </div>

        {resultados.length > 0 && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-center mb-2">Resumen de Escuelas:</h2>
            <table className="w-full text-sm border border-gray-400">
              <thead>
                <tr className="bg-gray-300">
                  <th className="border p-1">Escuela</th>
                  <th className="border p-1">Categoría</th>
                  <th className="border p-1">Comensales</th>
                  <th className="border p-1">Días</th>
                  <th className="border p-1">Total (kg)</th>
                </tr>
              </thead>
              <tbody>
                {resultados.map((r, index) => (
                  <tr key={index}>
                    <td className="border p-1 text-center">{r.escuela}</td>
                    <td className="border p-1 text-center">{r.categoria}</td>
                    <td className="border p-1 text-center">{r.comensales}</td>
                    <td className="border p-1 text-center">{r.dias}</td>
                    <td className="border p-1 text-center">{r.total}</td>
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
