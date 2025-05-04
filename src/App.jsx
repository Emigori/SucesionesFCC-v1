import { useState } from "react";
import "./App.css";

function App() {
  const [limiteSuperior, setLimiteSuperior] = useState("");
  const [limiteInferior, setLimiteInferior] = useState("");
  const [formula, setFormula] = useState("");
  const [resultados, setResultados] = useState([]);
  const [suma, setSuma] = useState(0);
  const [producto, setProducto] = useState(1);
  const [error, setError] = useState("");

  const obtenerVariable = (formula) => {
    const match = formula.match(/[a-zA-Z]/);
    return match ? match[0] : "k";
  };

  const evaluarFormula = (form, variable, valor) => {
    try {
      const expresion = form.replaceAll(variable, `(${valor})`);
      return eval(expresion);
    } catch {
      return null;
    }
  };

  const generarSucesion = () => {
    const m = Number(limiteInferior);
    const n = Number(limiteSuperior);

    if (!formula || isNaN(m) || isNaN(n)) {
      setError("Llena todos los campos correctamente.");
      setResultados([]);
      return;
    }

    if (m > n) {
      setError("El límite inferior no puede ser mayor que el superior.");
      setResultados([]);
      return;
    }

    const variable = obtenerVariable(formula);
    const nuevosResultados = [];
    let sumaTemp = 0;
    let productoTemp = 1;

    for (let i = m; i <= n; i++) {
      const valor = evaluarFormula(formula, variable, i);
      if (valor === null || isNaN(valor)) {
        setError("Error al evaluar la fórmula. Asegúrate de que sea válida (ej: 1/k, k+2, k*2, etc.)");
        setResultados([]);
        return;
      }
      nuevosResultados.push(`Término ${variable}=${i}: ${valor.toFixed(3)}`);
      sumaTemp += valor;
      productoTemp *= valor;
    }

    setResultados(nuevosResultados);
    setSuma(sumaTemp);
    setProducto(productoTemp);
    setError("");
  };

  return (
    <div className="container">
      <div className="card">
        <h1>FCC Toolkit - Sucesiones</h1>
        <div className="inputs">
          <input
            type="number"
            placeholder="Límite superior"
            value={limiteSuperior}
            onChange={(e) => setLimiteSuperior(e.target.value)}
          />
          <input
            type="number"
            placeholder="Límite inferior"
            value={limiteInferior}
            onChange={(e) => setLimiteInferior(e.target.value)}
          />
          <input
            type="text"
            placeholder="Fórmula (k)"
            value={formula}
            onChange={(e) => setFormula(e.target.value)}
          />
          <button onClick={generarSucesion}>Generar</button>
        </div>
        {error && <p className="error">{error}</p>}
        <div className="resultados">
          {resultados.map((linea, i) => (
            <p key={i}>{linea}</p>
          ))}
          {resultados.length > 0 && (
            <>
              <p><strong>Suma = {suma.toFixed(3)}</strong></p>
              <p><strong>Multiplicación = {producto.toExponential(4)}</strong></p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

