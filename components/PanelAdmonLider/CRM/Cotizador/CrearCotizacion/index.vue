<template>
    <v-container class="mt-10">
        <v-row class="mb-10">
            <v-col cols="12" md="6" lg="6">
                <img height="50" class="ya-5" src="/img/logo.png">
                <div style="line-height: 1.5rem;font-weight: 500;font-family: 'Poppins', sans-serif;">
                    <p>
                        <span style="font-size: 20px; font-weight: 700;"> Agencia de mercadeo, publicidad <br>  y capacitaciones Manager S.A.S<br> </span>
                        NIT 901.367.256-2 <br>
                        Cll 18 #41A - 04 <br>
                        Cel: 314 744 7724 <br>
                        ventas@agenciamamanger.com
                    </p>
                </div>
            </v-col>
            <v-col  cols="12" md="6" lg="6">
                <div style="background-color: #EDEDED;" class="roundedCard elevation-5">
                    <v-row >
                        <v-col>
                            <div style="font-size: 20px; font-weight: 500; font-family: 'Poppins', sans-serif; " justify="center" align="center">
                                COTIZACIÓN N°0191
                            </div>
                            <div style="line-height: 1.5rem; font-weight: 500; font-family: 'Poppins', sans-serif;" class="mx-6 mt-3"  justify="center" align="star">
                              <v-row>
                                <v-col cols="2" class="my-2">
                                  Cliente:    
                                </v-col>
                                <v-col cols="10">
                                  <v-select
                                    v-model="Cliente"
                                    single-line
                                    height= "28px"
                                    outlined
                                    dense 
                                    :style="{ height: '28px' }"
                                    @change="BuscarCliente(Cliente)"
                                    :items="clientes.map(cliente => cliente.nombre)"
                                  ></v-select>
                                </v-col>
                              </v-row>
                              <!-- <v-row>
                                <v-col > -->
                                  <p v-for="(inf, index) in infClientes" :key="index">
                                    Nit: {{ inf.Nit }} <br>
                                    Ciudad: {{ inf.Ciudad }}<br>
                                    Teléfono: {{ inf.Telefono }} <br>
                                    Fecha de doc: 13 Febrero 2023 <br>
                                    Fecha de ven: 13 Marzo 2023
                                </p>
                                <!-- </v-col>
                              </v-row> -->
                            </div>
                        </v-col>
                    </v-row>
                </div> 
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-data-table dense class="table-class" align="center" justify="center" :headers="headers" :items="items" hide-default-footer >
            <template v-slot:[`item.ref`]="{ item }" >
            <v-text-field
              :style="{ width: '30px' }"
              v-model="item.ref"
              disabled
              dense
              @input="calcularTotal(item)"
            ></v-text-field>
          </template>
          <template v-slot:[`item.nombre`]="{ item }">
            <v-select
              v-model="item.nombre"
              :style="{ width: '150px' }"
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
              :style="{ width: '280px', paddingTop: '15px', paddingLeft: '-5px' }"
              single-line
              outlined
              rows="2"
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
              :style="{ width: '90px' }"
              @input="calcularTotal(item)"
              type="number"
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
              :style="{ width: '90px' }"
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
              :style="{ width: '90px' }"
              @input="calcularTotal(item)"
              type="number"
              min="0"
            ></v-select>
          </template>
          <template v-slot:[`item.cantidad`]="{ item }">
            <v-text-field
              v-model="item.cantidad"
              v-bind:prefix="'$'"
              dense
              single-line
              outlined
              :style="{ width: '80px' }"
              @input="calcularTotal(item)"
              type="number"
              min="0"
            ></v-text-field>
          </template>
          <template v-slot:[`item.valorTotal`]="{ item }">
            <v-text-field 
            v-bind:prefix="'$'"
              v-model="item.valorTotal" 
              disabled
             >
            </v-text-field>
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon
              small
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
        <v-row align="end">
          <v-col align="end">
            <p>Valor sin IVA: {{ valorSinIVA | currency }}</p>
            <p>Valor Descuento: {{ descuento | currency }}</p>
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

    </v-container>
  </template>
<script>
import axios from "axios"
export default {
  data() {
    return {
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
        { text: "Ref", value: "ref" },
        { text: "Nombre", value: "nombre" },
        { text: "Descripción", value: "descripcion" },
        { text: "Valor unitario", value: "valorUnitario" },
        {text: "Valor IVA", value: "valorIVA" },
        { text: "Descuento", value: "descuento" },
        { text: "Cantidad", value: "cantidad" },
        { text: "Total", value: "valorTotal" },
        { text: "Action", value: "actions" },
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
      infClientes:[]
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
  mounted() {
    // Crear un div para contener el HTML generado por html2canvas
    const el = document.createElement('div');
    el.id = 'cotizacion-pdf';
    el.style.display = 'none';
    document.body.appendChild(el);
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
          const data = JSON.stringify([  
              {comentarios: comentarios},
              {items: items}
          ])
          console.log(data)
          axios({
            url: 'https://api.makinet.app/api/v1/forms/GenerarPdf',
            method: 'POST',
            data,
            responseType: 'blob'
          }).then(response => {
          console.log(response)
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
        }).catch(error => {
          console.log(error);
        }); 
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
