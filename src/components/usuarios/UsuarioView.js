import React, { useState, useEffect } from 'react'
import { crearUsuario, getUsuarios } from '../../services/usuarioService';

export const UsuarioView = () => {
  
  const [valoresForm, setValoresForm ] = useState({});
  const [usuarios, setUsuarios] = useState([]);
  const { nombre = '', email = '', estado = ''} = valoresForm;



  const listarUsuarios = async () =>{
    try {
      const resp = await getUsuarios();
      setUsuarios(resp.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect( () =>{
    listarUsuarios()
  },[]);

  const handleOnChange = (e) => {
    setValoresForm({...valoresForm, [e.target.name]: e.target.value});
  }

  const hancleCrearUsuario = async (e) => {
    e.preventDefault();
    console.log(valoresForm);
    try {
      const resp = await crearUsuario(valoresForm);
      console.log(resp.data);
      setValoresForm({ nombre: '', email: '', estado: '' })
    } catch (error) {
      console.log(error);
    }
  }

  return (
      <div className='container-fluid'>
        <form onSubmit={ (e) => hancleCrearUsuario(e) }>
          <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input required name='nombre' value={nombre} type="text" className="form-control" 
              onChange={(e) => handleOnChange(e)}/>
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input required name='email' value={email} type="email" className="form-control" 
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
      <th scope="col">Email</th>
      <th scope="col">Estado</th>
      <th scope="col">fecha de creacion</th>
    </tr>
  </thead>
  <tbody>

    {
      usuarios.map( usuario =>{
        return <tr>
          <td>{usuario.nombre}</td>
          <td>{usuario.email}</td>
          <td>{usuario.estado}</td>
          <td>{usuario.fechaCreacion}</td>
        </tr>
      } )
    }  
  </tbody>
</table>
      </div>
  )
}
