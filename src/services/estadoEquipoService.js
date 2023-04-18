import { axiosInstance } from '../helpers/axios-config';

const getEstadosEquipos = () => {
    return axiosInstance.get('estado-equipo', {
        headers: {
            'Content-type': 'application/json'
        }
    });
}

const crearEstadosEquipo = (data) => {
    return axiosInstance.post('estado-equipo', data, {
        headers: {
            'Content-type': 'application/json'
        }
    });
}

const editEstadosEquipo = (estadoequipoId, data) => {
    return axiosInstance.put(`estado-equipo/${estadoequipoId}`, data, {
        headers: {
            'Content-type': 'application/json'
        }
    });
}

const getEstadosEquiposPorId = (estadoequipoId) => {
    return axiosInstance.get(`estado-equipo/${estadoequipoId}`, {
        headers: {
            'Content-type': 'application/json'
        }
    });
}

export {
    getEstadosEquipos, crearEstadosEquipo, editEstadosEquipo, getEstadosEquiposPorId
}