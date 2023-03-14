<template>
    <v-container >
        <v-row justify="center" align="center" class="mb-10">
            <v-col cols="12" md="6" lg="5">
                <img height="40" class="ya-5" src="/img/logo.png">
                <div style="font-size: 15px;line-height: 1.5rem;font-weight: 500; font-family: 'Poppins', sans-serif">
                    <p>
                        <span style="font-size: 18px; font-weight: 700;"> Agencia de mercadeo, publicidad <br>  y capacitaciones Manager S.A.S<br> </span>
                        NIT 901.367.256-2 <br>
                        Calle 18 #41A - 04 <br>
                        Celurar: 314 744 7724 <br>
                        ventas@agenciamamanger.com<br>
                        www.agenciamanager.com
                    </p>
                </div>
            </v-col>
            <v-col  cols="12" md="6" lg="5">
                <div class="roundedCard elevation-5 Bg-inf-clientes">
                    <v-row align="end">
                        <v-col >
                            <div style="font-size:20px; font-weight: bold;" justify="center" align="center">
                                COTIZACIÓN N°0191
                            </div>
                            <div class="mx-6 mt-3" >
                              <div style="display: flex; align-items: "  >
                                <span style="min-width: 80px; margin-top: 10px;">Cliente:</span>
                                <v-select
                                  v-model="Cliente"
                                  single-line
                                  outlined
                                  dense 
                                  :style="{fontSize:'14px',margin: '0',padding:'0px', height: '30px', marginBottom: '20px',fontSize: '12px' }"
                                  @change="BuscarCliente(Cliente)"
                                  :items="clientes.map(cliente => cliente.nombre)"
                                ></v-select>
                              </div>
                                <div  v-for="(inf, index) in infClientes" :key="index" style="line-height: .5em;">
                                   <p> Nit: {{ inf.Nit }}</p>
                                   <p> Ciudad: {{ inf.Ciudad }}</p>
                                   <p> Teléfono: {{ inf.Telefono }}</p>
                                   <p> Fecha de doc:  {{ fechaActual }}  </p>
                                </div>
                                <div  style="display: flex; align-items: center;">
                                    <span style="min-width: 80px;margin-top: 10px;">Fecha ven:</span>
                                    <v-text-field
                                      v-model="fechaVencimineto"
                                      single-line
                                      label="Fecha ven"
                                      class="pa-0"
                                      outlined
                                      dense 
                                      type="date"
                                      :style="{fontSize:'14px',margin: '0',padding:'0px', height: '28px', fontSize: '12px', padding:'0' }"
                                    ></v-text-field>
                                  </div>
                            </div>
                        </v-col>
                    </v-row>
                </div> 
            </v-col>
          </v-row>
          <v-alert
            v-model="alert"
            dense
            border="left"
            :type="typeAlert"
          >
            {{mensajeAlert}}
          </v-alert>
          <v-divider></v-divider>
          <v-row align="center" justify="center">
            <v-col cols="12" xl="9" >
              <v-data-table style="max-width: 100%;" :dense="true" class="table-class" align="center" justify="center" :headers="headers" :items="items" hide-default-footer >
                <template v-slot:[`item.ref`]="{ item }" >
                  <v-text-field
                    :style="{fontSize:'14px',margin: '0',padding:'0px', width: '35px' }"
                    v-model="item.ref"
                    disabled
                    dense
                    hide-details
                    @input="calcularTotal(item)"
                  ></v-text-field>
                </template>
                <template v-slot:[`item.nombre`]="{ item }">
                  <v-select
                    v-model="item.nombre"
                    :style="{fontSize:'14px',margin: '0',padding:'0px', width: '150px' }"
                    :menu-props="{ transition: 'scale-transition', bottom: true }"
                    :items="[...productos.map(producto => producto.nombre), 'Otro']"
                    dense
                    hide-details
                    single-line
                    outlined
                    @change="item.nombre === 'Otro' ? showDialog = true : BuscarProducto(item)"
                    @input="item.nombre === 'Otro' ? showDialog = true : calcularTotal(item)"
                  ></v-select>
                </template>
                <template v-slot:[`item.descripcion`]="{ item }">
                  <v-textarea
                    v-model="item.descripcion"
                    dense
                    :style="{fontSize:'14px',margin: '0',padding:'0px', width: '280px', paddingTop: '15px', paddingLeft: '-5px' }"
                    single-line
                    outlined
                    hide-details
                    rows="3"
                    @input="calcularTotal(item)"
                  ></v-textarea>
                </template>
                <template v-slot:[`item.valorUnitario`]="{ item }">
                  <v-text-field
                    v-model="item.valorUnitario"
                    dense
                    single-line
                    outlined
                    hide-details
                    v-bind:prefix="'$'"
                    :style="{fontSize:'14px',margin: '0',padding:'0px', width: '90px' }"
                    appearance="none"
                    @input="calcularTotal(item)"
                    type="text"
                    min="0"
                    ></v-text-field>
                    <!-- :rules="[v => !!v || 'La Valor es requerida', v => /^\d+$/.test(v) || 'Ingrese un número válido']" -->
                </template>
                <template v-slot:[`item.cantidad`]="{ item }">
                  <v-text-field
                    v-model="item.cantidad"
                    dense
                    single-line
                    outlined
                    hide-details
                    :style="{fontSize:'14px',margin: '0',padding:'0px', width: '80px' }"
                    @input="calcularTotal(item)"
                    :rules="[v => !!v || 'La cantidad es requerida', v => /^\d+$/.test(v) || 'Ingrese un número válido']"
                    min="0"
                  ></v-text-field>
                </template>
                <template v-slot:[`item.subtotal`]="{ item }">
                  <v-text-field
                    v-model="item.subtotal"
                    dense
                    v-bind:prefix="'$'"
                    disabled
                    :style="{fontSize:'14px',margin: '0',padding:'0px', width: '90px' }"
                    @input="calcularTotal(item)"
                    hide-details
                    min="0"
                  ></v-text-field>
                </template>
                <template v-slot:[`item.valorIVA`]="{ item }">
                  <v-select
                    v-model="item.valorIVA"
                    dense
                    :menu-props="{ transition: 'scale-transition', bottom: true }"
                    :items="TypeIva"
                    single-line
                    v-bind:suffix="'%'"
                    hide-details
                    outlined
                    :style="{fontSize:'14px',margin: '0',padding:'0px', width: '90px' }"
                    @input="calcularTotal(item)"
                    type="number"
                    min="0"
                  ></v-select>
                </template>
                
                <template v-slot:[`item.valorTotal`]="{ item }">
                  <v-text-field 
                    v-bind:prefix="'$'"
                    hide-details
                    v-model="item.valorTotal" 
                    disabled
                    dense
                    :style="{fontSize:'14px',margin: '0',padding:'0px', width: '80px' }"
                  >
                  </v-text-field>
                </template>
                <template v-slot:[`item.actions`]="{ item }">
                  <v-icon
                    small
                    dense
                    @click="deleteItem(item)"
                  >
                    mdi-delete
                  </v-icon>
                </template>
              </v-data-table>
            <v-row>
              <div class="fondoComentariosCotizaciones pa-5 mt-5 ">
                  <span>OBSERVACIONES:</span>
                  <v-select
                    v-model="observacionSeleccionada"
                    :items="observacionesDisponibles"
                    @change="agregarObservacionSeleccionada"
                  ></v-select>
                  <template v-if="mostrarNuevoCampo">
                    <v-text-field
                      v-model="nuevaObservacion"
                      label="Otra observación"
                      @keyup.enter="agregarObservacionPersonalizada"
                    ></v-text-field>
                  </template>
                  <ul v-for="(observaciones, index) in observacionesSeleccionadas" :key="index">
                    <li>{{ observaciones }}</li>
                  </ul>
              </div>
            </v-row>
            <v-row align="end" justify="end">
              <v-col cols="4" align="star" justify="star" style="line-height: .5rem;">
                <p>Subtotal:  {{ valorsubtotal | currency }}</p>
                <div  style="display: flex; margin-bottom: 20px;">
                  <span style="min-width: 80px;margin-top: 10px;">Valor Descuento:</span>
                  <v-text-field
                    v-model="descuento"
                    single-line
                    class="pa-0"
                    outlined
                    dense 
                    @input="actualizarTotales(descuento)"
                    v-bind:prefix="'$'"
                    :style="{fontSize:'12px',margin: '0',padding:'0px', height:'28px', width: '90px' }"
                  ></v-text-field>
                </div>
                <p>Valor IVA: {{ iva | currency }}</p>
                <p>Valor Total: {{ valorTotal | currency }}</p>
              </v-col>  
            </v-row>
            <div class="text-center pt-2 mb-5"> 
              <v-btn color="#0C2C3F" hide-details dense class="white--text text-capitalize" @click="agregarItem">Agregar</v-btn>
              <v-btn color="#0C2C3F" hide-details dense class="white--text text-capitalize" @click="generarPDF">generar PDF</v-btn>
            </div>  
            </v-col>
          </v-row>
          <v-dialog v-model="showDialog" max-width="500">
            <v-card>
              <v-alert
                v-model="alertdialog"
                dense
                border="left"
                :type="typeAlertdialog"
              >
                {{mensajeAlertdialog}}
              </v-alert>
              <v-card-title>Ingrese el nombre del producto:</v-card-title>
              <v-card-text>
                <v-text-field 
                hide-details
                  dense
                  class="my-2" 
                  v-model="nuevoProducto" 
                  outlined
                  label="nombre del producto"
                >
                </v-text-field>
                <v-text-field 
                  hide-details
                  dense
                  class="my-2" 
                  v-model="DescProducto" 
                  outlined
                  label="nombre del producto"
                >
                </v-text-field>
                <v-text-field 
                  hide-details
                  dense
                  class="my-2" 
                  v-model="valorProducto" 
                  outlined
                  label="nombre del producto"
                >
                </v-text-field>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="#0C2C3F" class="white--text text-capitalize" @click="agregarNuevoProducto">Guardar</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
    </v-container>
  </template>
<script>
import axios from "axios"
import post from '../../../../post/post'
export default {
  data() {
    return {
      showDialog: false,
      nuevoProducto: "",
      DescProducto:'',
      valorProducto:'',
      typeAlert:'',
      alert: false,
      mensajeAlert:'',
      typeAlertdialog:'',
      alertdialog: false,
      mensajeAlertdialog:'',
      DatosCotizacion:'',
      observacionSeleccionada: null,
      observacionesSeleccionadas: [],
      mostrarNuevoCampo: false,
      nuevaObservacion: '',
      observacionesDisponibles: [
        'Se solicita para iniciar cualquier servicio por medio de una orden o correo electrónico de un directivo perteneciente a la empresa y con la autonomía de contratación',
        'Se solicita un abono del 50% para iniciar con el contrato',
        'Otro'
      ],
      headers: [
        { text: "Ref", value: "ref",width: '15px', },
        { text: "Nombre", value: "nombre" },
        { text: "Descripción", value: "descripcion" },
        { text: "Valor unitario", value: "valorUnitario" },
        { text: "Cantidad", value: "cantidad" },
        { text: "Subtotal", value: "subtotal" },
        {text: "Valor IVA", value: "valorIVA" },
        { text: "Total", value: "valorTotal" },
        { text: "", value: "actions" },
      ],
      items: [
        {ref:0,
          nombre: '',
          descripcion: '',
          valorUnitario: 0,
          valorIVA: 0,
          subtotal:0,
          cantidad: 0,
          valorTotal: 0,
        } // 
      ],
      iva: 0,
      valorTotal: 0,
      valorsubtotal :0,
      descuento:0,
      TypeIva:[
        '0',
        '8',
        '19',
      ],
      productos: [],
      clientes: [],
      infClientes:[],
      fechaActual: new Date().toISOString().substr(0, 10),
      fechaVencimineto:''
    };
  },
  created(){
    const infoCliente = {
      Nit: '',
      nombre: '',
      Ciudad: '',
      Telefono: '', 
    };
    this.infClientes.push(infoCliente)
  },
  filters: {
    currency(value) {
      return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(value);
    }
  },
  mounted(){
    this.Crearproductos()
    this.BuscarClientes()
  },
  methods: {
    async BuscarClientes(){
        const response = await post.BuscarClientes()
        response.results.forEach((element) => {
          this.clientes.push({
            Nit: element.nit,
            nombre: element.nombre_cliente,
            Ciudad: element.ciudad,
            Telefono:element.telefono,
          })
        })
    },
    async Crearproductos(){
        const response = await post.BuscarProductos()
        response.results.forEach((element) => {
          this.productos.push({
            ref: element.id,
            nombre: element.nombre,
            descripcion: element.descripcion,
            ValorUnitario: element.ValorUnitario
          })
        })
    },
    async agregarNuevoProducto() {
      if(this.nuevoProducto !==''&& this.DescProducto !==''&& this.valorProducto !==''){
        const data = {
          // ref: "XXX",
          nombre: this.nuevoProducto,
          descripcion: this.DescProducto,
          valorUnitario: this.valorProducto,
        };
        const response = await post.CrearNuevoProducto(data)
        if(response.error === false){
          this.alertdialog= true
          this.mensajeAlertdialog='Nuevo producto creado'
          this.typeAlertdialog = 'success'
          this.Crearproductos()
          setTimeout(() => {
              this.alertdialog = false
              this.mensajeAlertdialog =''
              this.typeAlertdialog = ''
              this.showDialog = false
              this.nuevoProducto= ""
              this.DescProducto='',
              this.valorProducto=''
            }, 1000);
        }else{
          this.alertdialog= true
          this.mensajeAlertdialog='se presento un error intenta nuevamente'
          this.typeAlertdialog = 'error'
          setTimeout(() => {
            this.alertdialog = false
            this.mensajeAlertdialog =''
            this.typeAlertdialog = ''
          }, 3000);
        }
      }else{
        this.alertdialog= true
        this.mensajeAlertdialog='Verifica que los datos esten completos'
        this.typeAlertdialog = 'error'
        setTimeout(() => {
          this.alertdialog = false
          this.mensajeAlertdialog =''
          this.typeAlertdialog = ''
        }, 3000);
      }
    },
    deleteItem(item) {
      const index = this.items.indexOf(item); // Obtener el índice del elemento a eliminar
      if (index !== -1) {
        this.items.splice(index, 1); // Eliminar el elemento del arreglo
      }
    },
    agregarObservacionSeleccionada() {
      if (this.observacionSeleccionada !== 'Otro') {
        this.observacionesSeleccionadas.push(this.observacionSeleccionada)
        this.eliminarObservacionDisponible(this.observacionSeleccionada)
        this.observacionSeleccionada = null
      } else {
        this.mostrarNuevoCampo = true
      }
    },
    agregarObservacionPersonalizada() {
      if (this.nuevaObservacion.trim() !== '') {
        this.observacionesSeleccionadas.push(this.nuevaObservacion)
        this.nuevaObservacion = ''
        this.observacionSeleccionada = ''
        this.mostrarNuevoCampo = false
      }
    },
    eliminarObservacionDisponible(observacion) {
      const index = this.observacionesDisponibles.indexOf(observacion)
      if (index !== -1) {
        this.observacionesDisponibles.splice(index, 1)
      }
    },
    async generarPDF() {
      const comentarios = this.observacionesSeleccionadas
      const items = this.items
      const cliente = this.infClientes
      const fechas = [
        {fechaActual:this.fechaActual,fechaVencimineto:this.fechaVencimineto}
      ]
      const ValoresTotales =[
        { 
          valorsubtotal : this.valorsubtotal ,
          descuento: this.descuento,
          iva: this.iva,
          valorTotal: this.valorTotal,
        }
      ]
      if (ValoresTotales.length || fechas.length) {
        if (ValoresTotales[0].valorsubtotal === 0 || ValoresTotales[0].valorTotal ===0) {
          if (ValoresTotales[0].valorTotal ===0) {
            this.alert= true
            this.mensajeAlert='Por favor verifique los valores'
            this.typeAlert = 'error'
            setTimeout(() => {
              this.alert = false
              this.mensajeAlert =''
              this.typeAlert = ''
            }, 3000);
          }
        } else if (fechas[0].fechaVencimineto === '') {
          this.alert= true
          this.mensajeAlert='Por favor verifique la fecha de vencimiento'
          this.typeAlert = 'error'
          setTimeout(() => {
            this.alert = false
            this.mensajeAlert =''
            this.typeAlert = ''
          }, 3000);
        }else if (cliente[0].nombre === '') {
          this.alert= true
          this.mensajeAlert='Por favor verifique el cliente'
          setTimeout(() => {
              this.alert = false
              this.mensajeAlert =''
              this.typeAlert = 'error'
            }, 3000);
        }else if (items[0].nombre === '') {
          this.alert= true
          this.mensajeAlert='Por favor verifique que haya agregado productos'
          this.typeAlert = 'error'
          setTimeout(() => {
              this.alert = false
              this.mensajeAlert =''
              this.typeAlert = ''
            }, 3000);
        }else if (comentarios.length===0) {
          this.alert= true
          this.mensajeAlert='Por favor verifique que haya agregado comentarios'
          this.typeAlert = 'error'
          setTimeout(() => {
              this.alert = false
              this.mensajeAlert =''
              this.typeAlert = ''
            }, 3000);
        }else{
          const datas = [  
            {comentarios: comentarios},
            {items: items},
            {fechas: fechas},
            {cliente: cliente},
            {ValoresTotales: ValoresTotales}
          ]
          this.alert= true
          this.mensajeAlert='Por favor espere.. se esta procesando la información'
          this.typeAlert = 'warning'
          axios({
          url: 'https://api.makinet.app/api/v1/forms/GenerarPdf',
          method: 'POST',
          headers:{
              "Access-Control-Allow-Origin": "*"
          },
          data: {data:datas},
          responseType: 'blob'
        }).then(response => {
          if (response.data && response.data.size>100000) {
            // crea un objeto URL para el blob
            const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
            // crea un enlace <a> y simula un clic para descargar el archivo
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'Cotizacion.pdf');
            document.body.appendChild(link);
            link.click();
            // limpia el objeto URL cuando ya no se necesita
            window.URL.revokeObjectURL(url);
            this.alert= true
            this.mensajeAlert='Se genero el pdf correctamente'
            this.typeAlert = 'success'
            setTimeout(() => {
                this.alert = false
                this.mensajeAlert =''
                this.typeAlert = ''
                // window.location.href = "/PanelAdmonLider";
              }, 3000);
          } else {
            this.alert= true
            this.mensajeAlert='Por favor intente nuevamente'
            this.typeAlert = 'error'
            setTimeout(() => {
                this.alert = false
                this.mensajeAlert =''
                this.typeAlert = ''
                location.reload();
              }, 3000);
          }
      }).catch(error => {
        console.log(error);
      }); 
        }
      }
        
    },
    BuscarProducto(item){
      const productoSeleccionado = this.productos.find(producto => producto.nombre === item.nombre);
      console.log(productoSeleccionado)
      if (productoSeleccionado) {
        item.ref= productoSeleccionado.ref
        item.nombre = productoSeleccionado.nombre;
        item.descripcion = productoSeleccionado.descripcion;
        item.valorUnitario = productoSeleccionado.ValorUnitario;
      }
    },
    BuscarCliente(item){
      this.infClientes = []
      const clienteSelect = this.clientes.find(cliente => cliente.nombre === item);
      const infoCliente = {
          Nit: clienteSelect.Nit,
          nombre: clienteSelect.nombre,
          Ciudad: clienteSelect.Ciudad,
          Telefono: clienteSelect.Telefono,  
        };
      this.infClientes.push(infoCliente)
      },
    calcularTotal(item) {
      const valorUnitario = parseFloat(item.valorUnitario) || 0;  
      const valorIVA = parseFloat(item.valorIVA) || 0;
      const cantidad = parseFloat(item.cantidad) || 0;
      const valorsubtotal= (valorUnitario*cantidad)
      item.subtotal = valorsubtotal.toLocaleString('es-CO');
      const valortotal = valorsubtotal * (1 + valorIVA/100);
      item.valorTotal = valortotal.toLocaleString('es-CO');
      this.actualizarTotales();
    },
    actualizarTotales() {
      let iva = 0;
      let valorTotal = 0;
      let subtotal = 0;
      this.items.forEach(item => {
        const valorUnitario = parseFloat(item.valorUnitario) || 0;
        const valorIVA = parseFloat(item.valorIVA) || 0;
        const cantidad = parseFloat(item.cantidad) || 0;
        const descuento = parseFloat(this.descuento) || 0; // agregar el descuento
        const subtotalSinDescuento = valorUnitario * cantidad; // calcular el subtotal sin descuento
        const valorsubtotal = subtotalSinDescuento - descuento; // restar el descuento del subtotal
        subtotal += valorsubtotal; // agregar el subtotal
        const ivaItem = subtotalSinDescuento * (valorIVA/100); // calcular el IVA del item
        iva += ivaItem; // acumular el IVA del item en el total
        const valorItem = valorsubtotal + ivaItem; // calcular el valor total del item
        valorTotal += valorItem; // acumular el valor total del item en el total
      });
      this.valorsubtotal = subtotal; // asignar el valor del subtotal
      this.iva = iva; // asignar el valor del IVA
      this.valorTotal = valorTotal; // asignar el valor total
    },
    agregarItem() {
      const nuevoItem = {
          ref:0,
          nombre: '',
          descripcion: '',
          valorUnitario: 0,
          valorIVA: 0,
          descuento:0,
          cantidad: 0,
          valorTotal: 0, 
      };
      this.items.push(nuevoItem);
      this.actualizarTotales();
      // deshabilitar la edición del último item agregado
      const ultimoItem = this.items[this.items.length -2 ];
      ultimoItem.editable = false;
    },
  }
}
</script>