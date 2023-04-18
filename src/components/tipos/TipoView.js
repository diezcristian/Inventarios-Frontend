import React, { useState, useEffect } from 'react'
import { crearTipoEquipo, getTiposEquipos } from '../../services/tipoEquipoService';

export const TipoView = () => {
  
  const [valoresForm, setValoresForm ] = useState({});
  const [tipoEquipos, setTipoEquipo] = useState([]);
  const { nombre = '', estado = ''} = valoresForm;


  const listartipoEquipo = async () =>{
    try {
      const resp = await getTiposEquipos();
      setTipoEquipo(resp.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect( () =>{
    listartipoEquipo()
  },[]);

  const handleOnChange = (e) => {
    setValoresForm({...valoresForm, [e.target.name]: e.target.value});
  }

  const hancleCrearTipo = async (e) => {
    e.preventDefault();
    console.log(valoresForm);
    try {
      const resp = await crearTipoEquipo(valoresForm);
      console.log(resp.data);
      setValoresForm({ nombre: '', estado: '' })
    } catch (error) {
      console.log(error);
    }
  }

  return (
      <div className='container-fluid'>
        <form onSubmit={ (e) => hancleCrearTipo(e)}>
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
      tipoEquipos.map( tipoEquipo =>{
        return <tr>
          <td>{tipoEquipo.nombre}</td>
          <td>{tipoEquipo.estado}</td>
          <td>{tipoEquipo.fechaCreacion}</td>
        </tr>
      } )
    }  
  </tbody>
</table>
      </div>
  )
}

