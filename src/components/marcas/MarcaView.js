import React, { useState, useEffect } from 'react'
import { getMarcas, crearMarca, editMarca } from '../../services/marcaService';

export const MarcaView = () => {
  
  const [valoresForm, setValoresForm ] = useState({});
  const [marcas, setMarcas] = useState([]);
  const { nombre = '', estado = ''} = valoresForm;


  const listarMarcas = async () =>{
    try {
      const resp = await getMarcas();
      setMarcas(resp.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect( () =>{
    listarMarcas()
  },[]);

  const handleOnChange = (e) => {
    setValoresForm({...valoresForm, [e.target.name]: e.target.value});
  }

  const hancleCrearMarca = async (e) => {
    e.preventDefault();
    console.log(valoresForm);
    try {
      const resp = await crearMarca(valoresForm);
      console.log(resp.data);
      setValoresForm({ nombre: '', estado: '' })
    } catch (error) {
      console.log(error);
    }
  }

  return (
      <div className='container-fluid'>
        <form onSubmit={ (e) => hancleCrearMarca(e)}>
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
      marcas.map( marca =>{
        return <tr>
          <td>{marca.nombre}</td>
          <td>{marca.estado}</td>
          <td>{marca.fechaCreacion}</td>
        </tr>
      } )
    }  
  </tbody>
</table>
      </div>
  )
}
