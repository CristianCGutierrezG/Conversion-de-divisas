import React from 'react';
import { useState } from "react";

const NuevaDivisa = ({monedas, datos, setDatos}) => {

    const [divisa, setDivisa] = useState("");
    
    const handleChange = e => {
        setDatos({
            ...datos,
            [e.target.name]: e.target.value
        })
    }

    const handleNew = () => {
        if(datos.nombre === "" || datos.codigo_iso === ""){
            alert("Todos los campos son obligatorios")
            return
        }

        const requestInit = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(datos)
        }
        fetch('http://localhost:9000/moneda', requestInit)
        .then(res => res.text())
        .then(res => console.log(res))
        
        setDatos({
            codigo_iso: "",
            nombre: "",
        })

    } 

    const handleDelete = () => {
        let id;

        //Determinar a que moneda se hace referencia
        monedas.forEach((mon)=>{
            if (mon.nombre === datos.nombre){
                id = mon.id_moneda;
            }
        })
        const requestInit = {
            method: 'DELETE',
        }
        fetch('http://localhost:9000/moneda/' + id, requestInit)
        .then(res => res.text())
        .then(res => console.log(res))
    }
    
    
    return(
        <form>
            <div className="mb-3">
                <label htmlFor="nombre" className='form-label' style={{color: "blue"}}>Nombre moneda</label>
                <input value={datos.nombre} name="nombre" type='text' onChange={handleChange} className='form-control' />       
            </div>
            <div className="mb-3">
                <label htmlFor="codigo_iso" className='form-label' style={{color: "blue"}}>Codigo Iso</label>
                <input value={datos.codigo_iso} name="codigo_iso" type='text' onChange={handleChange} className='form-control' />       
            </div>
            <button onClick={handleNew} className='btn btn-primary'>Submit</button>
            <button onClick={handleDelete} className='btn btn-primary'>Delete</button>
        </form>
    );
}

export default NuevaDivisa;