<template>
    <v-container class="mt-10">
        <v-row justify="center" align="center" class="mb-10">
            <v-col cols="12" md="6" lg="5">
                <img height="50" class="ya-5" src="/img/logo.png">
                <div style="line-height: 1.5rem;font-weight: 500;font-family: 'Poppins', sans-serif">
                    <p>
                        <span style="font-size: 20px; font-weight: 700;"> Agencia de mercadeo, publicidad <br>  y capacitaciones Manager S.A.S<br> </span>
                        NIT 901.367.256-2 <br>
                        Cll 18 #41A - 04 <br>
                        Cel: 314 744 7724 <br>
                        ventas@agenciamamanger.com
                    </p>
                </div>
            </v-col>
            <v-col  cols="12" md="6" lg="5">
                <div class="roundedCard elevation-5 Bg-inf-clientes">
                    <v-row >
                        <v-col>
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
                                   <p>Fecha de doc:  {{ fechaActual }}  </p>
                                </div>
                                <div  style="display: flex; align-items: center;">
                                    <span style="min-width: 80px;margin-top: 10px;">Fecha ven:</span>
                                    <v-text-field
                                      v-model="Cliente"
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
          <v-divider></v-divider>
          <v-row>
            <v-col cols="12" md="11">

              <v-data-table style="max-width: 100%;" :dense="true" class="table-class" align="center" justify="center" :headers="headers" :items="items" hide-default-footer >
                <template v-slot:[`item.ref`]="{ item }" >
                  <v-text-field
                    :style="{fontSize:'14px',margin: '0',padding:'0px', width: '35px' }"
                    v-model="item.ref"
                    disabled
                    dense
                    @input="calcularTotal(item)"
                  ></v-text-field>
                </template>
                <template v-slot:[`item.nombre`]="{ item }">
                  <v-select
                    v-model="item.nombre"
                    :style="{fontSize:'14px',margin: '0',padding:'0px', width: '150px' }"
                    :menu-props="{ transition: 'scale-transition', bottom: true }"
                    :items="productos.map(producto => producto.nombre)"
                    dense
                    single-line
                    outlined
                    @change="BuscarProducto(item)"
                    @input="calcularTotal(item)"
                  ></v-select>
                </template>
                <template v-slot:[`item.descripcion`]="{ item }">
                  <v-textarea
                    v-model="item.descripcion"
                    dense
                    :style="{fontSize:'14px',margin: '0',padding:'0px', width: '280px', paddingTop: '15px', paddingLeft: '-5px' }"
                    single-line
                    outlined
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
                    v-bind:prefix="'$'"
                    :style="{fontSize:'14px',margin: '0',padding:'0px', width: '90px' }"
                    appearance="none"
                    @input="calcularTotal(item)"
                    type="text"
                    :rules="[v => !!v || 'La cantidad es requerida', v => /^\d+$/.test(v) || 'Ingrese un número válido']"
                    min="0"
                  ></v-text-field>
                </template>
                <template v-slot:[`item.descuento`]="{ item }">
                  <v-select
                    v-model="item.descuento"
                    dense
                    :items="TypeDesc"
                    single-line
                    outlined
                    v-bind:suffix="'%'"
                    :style="{fontSize:'14px',margin: '0',padding:'0px', width: '90px' }"
                    @input="calcularTotal(item)"
                    type="number"
                    min="0"
                  ></v-select>
                </template>
                <template v-slot:[`item.valorIVA`]="{ item }">
                  <v-select
                    v-model="item.valorIVA"
                    dense
                    :menu-props="{ transition: 'scale-transition', bottom: true }"
                    :items="TypeIva"
                    single-line
                    v-bind:suffix="'%'"
                    outlined
                    :style="{fontSize:'14px',margin: '0',padding:'0px', width: '90px' }"
                    @input="calcularTotal(item)"
                    type="number"
                    min="0"
                  ></v-select>
                </template>
                <template v-slot:[`item.cantidad`]="{ item }">
                  <v-text-field
                    v-model="item.cantidad"
                    dense
                    single-line
                    outlined
                    :style="{fontSize:'14px',margin: '0',padding:'0px', width: '80px' }"
                    @input="calcularTotal(item)"
                    :rules="[v => !!v || 'La cantidad es requerida', v => /^\d+$/.test(v) || 'Ingrese un número válido']"
                    min="0"
                  ></v-text-field>
                </template>
                <template v-slot:[`item.valorTotal`]="{ item }">
                  <v-text-field 
                    v-bind:prefix="'$'"
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
            <v-divider></v-divider>
            <div class="text-center pt-2"> 
              <v-btn @click="agregarItem">Agregar</v-btn>
              <v-btn @click="generarPDF">generar PDF</v-btn>
            </div>
            <v-row align="end" justify="end">
              <v-col cols="4" align="star" justify="star" style="line-height: .5rem;">
                <p>Valor sin IVA:  {{ valorSinIVA | currency }}</p>
                <div  style="display: flex; margin-bottom: 20px;">
                  <span style="min-width: 80px;margin-top: 10px;">Valor Descuento:</span>
                  <v-text-field
                    v-model="descuento"
                    single-line
                    class="pa-0"
                    outlined
                    dense 
                    :style="{fontSize:'14px',margin: '0',padding:'0px', height: '28px', fontSize: '12px', padding:'0' }"
                  ></v-text-field>
                </div>
                <p>Valor IVA: {{ iva | currency }}</p>
                <p>Valor Total: {{ valorTotal | currency }}</p>
              </v-col>  
            </v-row>
            <v-divider></v-divider>
            <v-row>
              <div class="fondoComentariosCotizaciones pa-5">
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
            </v-col>
          </v-row>

    </v-container>
  </template>
<script>
import axios from "axios"
export default {
  data() {
    return {
      fechaActual: new Date().toISOString().substr(0, 10),
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
        {text: "Valor IVA", value: "valorIVA" },
        // { text: "Descuento", value: "descuento" },
        { text: "Cantidad", value: "cantidad" },
        { text: "Total", value: "valorTotal" },
        { text: "", value: "actions" },
      ],
      items: [
          {ref:0,
            nombre: '',
            descripcion: '',
            valorUnitario: 0,
            valorIVA: 0,
            descuento:0,
            cantidad: 0,
            valorTotal: 0,
          } // 
      ],
      valorSinIVA: 0,
      iva: 0,
      valorTotal: 0,
      descuento :0,
      TypeIva:[
        '0',
        '10',
        '19',
      ],
      TypeDesc:[
          '5',
          '10',
          '20',
      ],
      productos: [
        {
          ref: "001",
          nombre: "Producto 1",
          descripcion: "Descripción del producto 1",
          valorUnitario: 10,  
        },
        {
          ref: "002",
          nombre: "Producto 2",
          descripcion: "Descripción del producto 2",
          valorUnitario: 20,
        },
        {
          ref: "003",
          nombre: "Producto 3",
          descripcion: "Descripción del producto 3",
          valorUnitario: 30,
        },
      ],
      clientes: [
        {
          Nit: "901-367-256-2",
          nombre: "cliente 1",
          Ciudad: "Descripción del producto 1",
          Telefono: 10,  
        },
        {
          Nit: "10068203235",
          nombre: "cliente 2",
          Ciudad: "Descripción del producto 1",
          Telefono: 10,  
        },
        {
          Nit: "901-367-256-2",
          nombre: "cliente 2",
          Ciudad: "Descripción del producto 1",
          Telefono: 10,  
        },
      ],
      infClientes:[],
      fechaInicio:'',
      fechaVencimineto:''
    };
  },
  // created(){
  //     this.agregarProducto()
  // },
  filters: {
    currency(value) {
      return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(value);
    }
  },
  mounted(){
    const infoCliente = {
        Nit: '',
        nombre: '',
        Ciudad: '',
        Telefono: '', 
        };
        this.infClientes.push(infoCliente)
  },
  methods: {
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
          const datas = [  
              {cliente: cliente},
              {comentarios: comentarios},
              {items: items},
          ]
          console.log(datas)
        //   axios({
        //     url: 'https://api.makinet.app/api/v1/forms/GenerarPdf',
        //     method: 'POST',
        //     data: {data:datas},
        //     responseType: 'blob'
        //   }).then(response => {
        //   console.log(response)
        //   // crea un objeto URL para el blob
        //   const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
        //   // crea un enlace <a> y simula un clic para descargar el archivo
        //   const link = document.createElement('a');
        //   link.href = url;
        //   link.setAttribute('download', 'Cotizacion.pdf');
        //   document.body.appendChild(link);
        //   link.click();
        //   // limpia el objeto URL cuando ya no se necesita
        //   window.URL.revokeObjectURL(url);
        // }).catch(error => {
        //   console.log(error);
        // }); 
    },
    BuscarProducto(item){
      const productoSeleccionado = this.productos.find(producto => producto.nombre === item.nombre);
      console.log(productoSeleccionado)
      if (productoSeleccionado) {
        item.ref= productoSeleccionado.ref
        item.nombre = productoSeleccionado.nombre;
        item.descripcion = productoSeleccionado.descripcion;
        item.valorUnitario = productoSeleccionado.valorUnitario;
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
      const descuento = parseFloat(item.descuento) || 0;
      const valortotal = (valorUnitario * cantidad) * (1 - descuento/100) * (1 + valorIVA/100);
      item.valorTotal = valortotal.toLocaleString('es-CO');
      console.log(item.valorTotal)
      this.actualizarTotales();
    },

    actualizarTotales() {
      let valorSinIVA = 0;
      let iva = 0;
      let valorTotal = 0;
      let valorDesc = 0;

      this.items.forEach(item => {
        const valorUnitario = parseFloat(item.valorUnitario) || 0;
        const valorIVA = parseFloat(item.valorIVA) || 0;
        const cantidad = parseFloat(item.cantidad) || 0;
        const descuento = parseFloat(item.descuento) || 0;
        const valor = (valorUnitario * cantidad) * (1 - descuento/100) * (1 + valorIVA/100); 
        valorSinIVA += valorUnitario * cantidad;
        iva += valorSinIVA * (valorIVA/100);
        valorDesc += valorSinIVA * (descuento/100);
        valorTotal += valor;
      });

      this.valorSinIVA = valorSinIVA;
      this.descuento = valorDesc;
      this.iva = iva;
      this.valorTotal = valorTotal;
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
