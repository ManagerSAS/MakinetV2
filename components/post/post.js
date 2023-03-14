import API from '../API/API'

const forms = '/api/v1/forms'

export default {    
    async login( dataUSer ){
        const response = await API.post( forms + '/login', dataUSer)
        return response
    },
    async CrearNuevoProducto( data ){
        const response = await API.post( forms + '/CrearProductos', data)
        return response.data
    },
    async BuscarProductos(){
        const response = await API.post( forms + '/BuscarProductos')
        return response.data
    },
    async BuscarClientes(){
        const response = await API.post( forms + '/BuscarClientes')
        return response.data
    },
    async CrearClientes(data){
        const response = await API.post( forms + '/CrearCliente',data)
        return response.data
    },
    async infoUser(user){
        const response = await API.post( forms + '/infoUser',user)
        return response.data
    },
    
}
