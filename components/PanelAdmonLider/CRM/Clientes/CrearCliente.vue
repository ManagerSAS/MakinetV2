<template>
    <v-container>
        <v-card align="center" rounded elevation="4" max-width="600" class="pa-5">
            <v-alert
                v-model="alert"
                dense
                border="left"
                :type="typeAlert"
              >
                {{mensajeAlert}}
              </v-alert>
            <h3 style="color: #0C2C3F">Datos del cliente</h3>
            <v-form ref="formCreateCliente">
                <v-row>
                    <v-col cols="12" sm="12" md="12" > 
                        <v-text-field
                            v-model="nameEmpresa"
                            dense
                            label="Nombre de la empresa: "
                            prepend-icon="mdi-account"
                            hide-details
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12" md="6"> 
                        <v-text-field
                            v-model="NitEmpresa"
                            dense
                            label="NIT:"
                            prepend-icon="mdi-numeric"
                            hide-details
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12" md="6"> 
                        <v-text-field
                            v-model="DireccionEmpresa"
                            dense
                            label="Dirección Cliente:"
                            prepend-icon="mdi-map-marker-outline"
                            hide-details
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12" md="6"> 
                        <v-text-field
                            v-model="CiudadEmpresa"
                            dense
                            label="Ciudad:"
                            prepend-icon="mdi-city"
                            hide-details
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12" md="6"> 
                        <v-text-field
                            v-model="CorreoEmpresa"
                            dense
                            label="Correo Electronico:"
                            prepend-icon="mdi-email-outline"
                            hide-details
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12" md="6"> 
                        <v-text-field
                            v-model="WebEmpresa"
                            dense
                            label="Sitio Web:"
                            prepend-icon="mdi-web"
                            hide-details
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="12" md="6"> 
                        <v-text-field
                            v-model="CelEmpresa"
                            dense
                            label="Numero Telefonico:"
                            prepend-icon="mdi-phone"
                            hide-details
                        ></v-text-field>
                    </v-col>
                </v-row>
            </v-form>
            <v-row align="end" justify="end">
                <v-btn
                    class="ma-2 white--text text-capitalize"
                    color="#0C2C3F"
                    @click="crearCliente()"
                >
                    Crear Cliente
                </v-btn>
            </v-row>
        </v-card>
        <v-card class="my-5">
            <v-card-title>
                <v-spacer></v-spacer>
                <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Search"
                    solo
                    dense
                    hide-details
                ></v-text-field>
            </v-card-title>
            <v-data-table
            :headers="headers"
            :items="clientes"
            :search="search"
            ></v-data-table>
        </v-card>
    </v-container>
</template>
<script>
import post from '../../../post/post'
export default {
    data(){
        return{
            alert:false,
            typeAlert:'',
            mensajeAlert:'',
            nameEmpresa:'',
            NitEmpresa:'',
            DireccionEmpresa:'',
            CiudadEmpresa:'',
            CorreoEmpresa:'',
            WebEmpresa:'',
            CelEmpresa:'',
            search: '',
            headers: [
                { text: "Nit", value: "NitEmpresa" },
                { text: "Nombre Empresa", value: "nameEmpresa" },
                { text: "Correo", value: "CorreoEmpresa" },
                { text: "Numero telefonico", value: "CelEmpresa" },
                { text: "Sitio Web", value: "WebEmpresa" },
            ],
            clientes:[],
        }
    },
    mounted(){
        this.BuscarClientes()
    },
    methods:{
        async BuscarClientes(){
            const response = await post.BuscarClientes()
            response.results.forEach((element) => {
                this.clientes.push({
                    NitEmpresa: element.nit,
                    nameEmpresa: element.nombre_cliente,
                    CorreoEmpresa: element.email,
                    CelEmpresa:element.telefono,
                    WebEmpresa:element.Web
                })
            })
        },
        async crearCliente(){
            this.alert= true
            this.mensajeAlert='Se esta procesando la información, por favor espere...'
            this.typeAlert = 'warning'
            if(this.nameEmpresa !== '' &&this.NitEmpresa !== '' && this.DireccionEmpresa !== '' &&this.CiudadEmpresa !== '' &&this.CorreoEmpresa !== '' &&this.WebEmpresa !== '' && this.CelEmpresa!== ''){
                const datas ={
                    nameEmpresa:this.nameEmpresa,
                    NitEmpresa:this.NitEmpresa,
                    DireccionEmpresa:this.DireccionEmpresa,
                    CiudadEmpresa:this.CiudadEmpresa,
                    CorreoEmpresa:this.CorreoEmpresa,
                    WebEmpresa:this.WebEmpresa,
                    CelEmpresa:this.CelEmpresa,
                }
                const response = await post.CrearClientes(datas)
                if(response.error===false){
                    this.alert= true
                    this.mensajeAlert='Cliente creado con exitó'
                    this.typeAlert = 'success'
                    this.$refs.formCreateCliente.reset()
                    this.BuscarClientes()
                    setTimeout(() => {
                        this.alert = false
                        this.mensajeAlert =''
                        this.typeAlert = ''
                    }, 3000);

                }else{
                    this.alert= true
                    this.mensajeAlert='Intente nuevamente'
                    this.typeAlert = 'error'
                    setTimeout(() => {
                        this.alert = false
                        this.mensajeAlert =''
                        this.typeAlert = ''
                    }, 3000);
                }
            }else{
                this.alert= true
                this.mensajeAlert='Valide que todos los datos esten diligenciados correctamente'
                this.typeAlert = 'error'
                setTimeout(() => {
                    this.alert = false
                    this.mensajeAlert =''
                    this.typeAlert = ''
                }, 3000);
            }
        }
    }
}
</script>