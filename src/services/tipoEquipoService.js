import { axiosInstance } from '../helpers/axios-config';

const getTiposEquipos = () => {
    return axiosInstance.get('tipo-equipo', {
        headers: {
            'Content-type': 'application/json'
        }
    });
}

const crearTipoEquipo = (data) => {
    return axiosInstance.post('tipo-equipo', data, {
        headers: {
            'Content-type': 'application/json'
        }
    });
}

const editTipoEquipo = (tipoequipoId, data) => {
    return axiosInstance.put(`estado-equipo/${tipoequipoId}`, data, {
        headers: {
            'Content-type': 'application/json'
        }
    });
}

const getTipoEquipoPorId = (tipoequipoId) => {
    return axiosInstance.get(`estado-equipo/${tipoequipoId}`, {
        headers: {
            'Content-type': 'application/json'
        }
    });
}

export {
    getTiposEquipos, crearTipoEquipo, editTipoEquipo, getTipoEquipoPorId
}