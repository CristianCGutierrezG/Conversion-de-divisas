import { useState, useEffect } from "react";
import Navbar from "./Components/Navbar";
import Calculo from "./Components/Calculo";
import NuevaDivisa from "./Components/NuevaDivisa";

function App() {

  const [monedas, setMonedas] = useState([]);
  const [tasa, setTasa] = useState([]);


  const [datosConversion, setDatosConversion] = useState({
    monedaOrigen: "Euro",
    monedasDestino: ['Euro'],
    valor: 0,
  });

  const [datosMoneda, setDatosMoneda] = useState({
    codigo_iso: "",
    nombre: "",
  });

  useEffect(() => {
    const getMonedas = () => {
      fetch('http://localhost:9000/moneda')
      .then(res => res.json())
      .then(res => setMonedas(res))
    }
    const getTasa = () => {
      fetch('http://localhost:9000/tasa_de_cambio')
      .then(res => res.json())
      .then(res => setTasa(res))
    }
    getMonedas();
    getTasa();
  }, [])
  

  return (
    <>
      <Navbar brand='Conversion de Divisas'></Navbar>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h2 style={{textAlign: "center"}}>Calculo de divisa</h2>
            <Calculo monedas={monedas} tasa={tasa} datos={datosConversion} setDatos={setDatosConversion}/>
          </div>
        </div>
        <div className="row">
          <div className="col-7">
            <h2 style={{textAlign: "center"}}>nueva divisa</h2>
            <NuevaDivisa monedas={monedas} datos={datosMoneda} setDatos={setDatosMoneda}/>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
