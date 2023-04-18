import React, { useState, useEffect } from 'react'
import { crearEstadosEquipo, getEstadosEquipos } from '../../services/estadoEquipoService';

export const EstadoView = () => {

  const [valoresForm, setValoresForm ] = useState({});
  const [estados, setEstados] = useState([]);
  const { nombre = '', estado = ''} = valoresForm;


  const listarEstados = async () =>{
    try {
      const resp = await getEstadosEquipos();
      setEstados(resp.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect( () =>{
    listarEstados()
  },[]);

  const handleOnChange = (e) => {
    setValoresForm({...valoresForm, [e.target.name]: e.target.value});
  }

  const hancleCrearEstado = async (e) => {
    e.preventDefault();
    console.log(valoresForm);
    try {
      const resp = await crearEstadosEquipo(valoresForm);
      console.log(resp.data);
      setValoresForm({ nombre: '', estado: '' })
    } catch (error) {
      console.log(error);
    }
  }

  return (
      <div className='container-fluid'>
        <form onSubmit={ (e) => hancleCrearEstado(e)}>
          <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input required name='nombre' value={nombre} type="text" className="form-control" 
              onChange={(e) => handleOnChange(e)}/>
          </div>
          <div className="mb-3">
              <label className='form-Label'>Estado</label>
              <select required name='estado' value={estado} className="form-select" 
                onChange={(e) => handleOnChange(e)}>
                <option selected>-- Selecione --</option>
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
              </select>
          </div>
          <button className="btn btn-primary">Submit</button>
        </form>

        <table class="table">
  <thead>
    <tr>
      <th scope="col">Nombre</th>
      <th scope="col">Estado</th>
      <th scope="col">fecha de creacion</th>
    </tr>
  </thead>
  <tbody>

    {
      estados.map( estado =>{
        return <tr>
          <td>{estado.nombre}</td>
          <td>{estado.estado}</td>
          <td>{estado.fechaCreacion}</td>
        </tr>
      } )
    }  
  </tbody>
</table>
      </div>
  )
}
