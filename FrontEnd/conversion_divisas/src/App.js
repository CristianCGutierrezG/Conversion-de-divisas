import { useState, useEffect } from "react";
import Navbar from "./Components/Navbar";
import Calculo from "./Components/Calculo";

function App() {

  const [monedas, setMonedas] = useState([]);
  const [tasa, setTasa] = useState([]);


  const [datosConversion, setDatosConversion] = useState({
    monedaOrigen: "Euro",
    monedasDestino: ['Euro'],
    valor: 0,
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
          </div>
          <div className="col-5">
            <h2 style={{textAlign: "center"}}>tasa de cambio</h2>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
