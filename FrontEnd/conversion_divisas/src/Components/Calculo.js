import React from 'react';
import { useState } from "react";

const Calculo = ({monedas, tasa,  datos, setDatos}) => {

    const [divisa, setDivisa] = useState("");
    
    const handleChange = e => {
        setDatos({
            ...datos,
            [e.target.name]: e.target.value
        })
    }

    const handleChangeMultiple = e => {
        const options = [...e.target.selectedOptions];
        const values = options.map(option => option.value);
        setDatos({
            ...datos,
            [e.target.name]: values
        })
    }

    const handleClick = () => {
        let origen;
        let destino = [];
        let value = [];

        //Determinar a que moneda se hace referencia
        monedas.forEach((mon)=>{
            if (mon.nombre === datos.monedaOrigen){
                origen= mon.id_moneda;
            }
            datos.monedasDestino.forEach((element) =>{
                if ( mon.nombre === element){
                    destino = [...destino ,mon.id_moneda];
                }
            })
        })
    
        //Determinar de tasa de cambio entre un grupo de monedas
        tasa.forEach(tas=>{
            destino.forEach((element)=>{
                if (tas.moneda_origen === origen && tas.moneda_destino === element){
                    value = [...value, tas.tasa_cambio];
                }
            })
        })
    
        let final = [];
        let i=0;
        value.forEach(val =>{
                final = [...final, `${datos.monedaOrigen} -> ${datos.monedasDestino[i]} = ${datos.valor * val} `]
                i++;
        })
        
        setDivisa(final.join("     "));
        
    } 
    
    return(
        <div className="container">
            <>
                <div className="row">
                    <div className="col-6">
                        <label htmlFor="valor" className='form-label' style={{color: "blue"}}>Moneda de origen</label>
                        <input  type="number" step="0.01" name='valor'id='valor' onChange={handleChange} className='form-control' />
                        <select name="monedaOrigen" id="monedaOrigen" defaultValue="Euro" onChange={handleChange} className='form-select' >
                            {monedas.map(mon => (
                                <option key={mon.id_moneda} value={mon.nombre}>{mon.nombre}</option>            
                            ))}
                        </select>
                    </div>
                    <div className="col-6">
                        <label  className='form-label' style={{color: "blue"}}>Moneda de destino</label>
                        <select name="monedasDestino" id="monedasDestino" onChange={ handleChangeMultiple} className='form-select' multiple>
                            {monedas.map(mon => (
                                <option key={mon.id_moneda} value={mon.nombre}>{mon.nombre}</option>            
                            ))}
                        </select>
                        </div>
                </div>
                <div className="row">
                    <button className='btn btn-primary' onClick={handleClick}>Convertir</button>
                </div>
                <div className="row">
                    <input type="text" value={divisa}/>
                </div>
            </>
        </div>
    );
}

export default Calculo;