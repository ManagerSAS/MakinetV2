<template>
    <v-container class="mt-10">
        <v-row>
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
                            <div style="font-size: 20px; font-weight: 500; font-family: 'Poppins', sans-serif;" justify="center" align="center">
                                COTIZACIÓN N°0191
                            </div>
                            <div style="line-height: 1.5rem; font-weight: 500; font-family: 'Poppins', sans-serif;" class="mx-6 mt-3"  justify="center" align="star">
                                <p>
                                    Cliente: CONFIPETROL SAS <br>
                                    Nit: 900.179.369-6 <br>
                                    Ciudad: Bogotá<br>
                                    Teléfono: 3195087984 <br>
                                    Fecha de doc: 13 Febrero 2023 <br>
                                    Fecha de ven: 13 Marzo 2023
                                </p>
                            </div>
                        </v-col>
                    </v-row>
                </div> 
            </v-col>
        </v-row>
        <div>

          <v-data-table :headers="headers" :items="cola" hide-default-footer></v-data-table>
          <v-data-table  :headers="headers" :items="items" :editable="true" hide-default-footer>
            <template v-slot:[`item.nombre`]="{ item }">
              <v-select
                v-model="item.nombre"
                min="0"
                :items="productos.map(producto => producto.nombre)"
                @change="calcularTotal(item)"
              ></v-select>
            </template>
            <template v-slot:[`item.descripcion`]="{ item }">
              <v-text-field
                v-model="item.descripcion"
                min="0"
                @change="calcularTotal(item)"
              ></v-text-field>
            </template>
            <template v-slot:[`item.precioUnitario`]="{ item }">
            <v-text-field
              v-model="item.precioUnitario"
              min="0"
              @change="calcularTotal(item)"
            ></v-text-field>
          </template>
          <template v-slot:[`item.descuento`]="{ item }">
            <v-text-field
              v-model="item.descuento"
              min="0"
              @change="calcularTotal(item)"
            ></v-text-field>
          </template>
          <template v-slot:[`item.cantidad`]="{ item }">
            <v-text-field
              v-model="item.cantidad"
              min="0"
              @change="calcularTotal(item)"
            ></v-text-field>
          </template>
            <template v-slot:[`item.total`]="{ item }">
              <v-text-field v-model="item.total" disabled></v-text-field>
            </template>
          </v-data-table>
          <v-row align="end">
            <v-col align="end"> 
              <p>valor sin iva: {{ valorSinIVA }}</p>  
              <p>Valor iva: {{ iva }}</p> 
              <p>Valor Total: {{ valorTotal }}</p>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-btn @click="agregarCola(item)">Agregar a la cola</v-btn>
            </v-col>
          </v-row>
          
         
      </div>
    </v-container>
  </template>
<style>
.roundedCard{
    border-radius: 0 0 15px 15px;
}
</style>
<script>
export default {
  data() {
    return {
      headers: [
        { text: "Referencia", value: "referencia", editable: true },
        { text: "Nombre", value: "nombre", editable: true },
        { text: "Descripción", value: "descripcion", editable: true },
        { text: "Precio unitario", value: "precioUnitario", editable: true },
        { text: "Descuento", value: "descuento", editable: true },
        { text: "Cantidad", value: "cantidad" },
        { text: "Total", value: "total" },
      ],
      productos: [
        {
          referencia: "001",
          nombre: "Producto 1",
          descripcion: "Descripción del producto 1",
          precioUnitario: 10,
        },
        {
          referencia: "002",
          nombre: "Producto 2",
          descripcion: "Descripción del producto 2",
          precioUnitario: 20,
        },
        {
          referencia: "003",
          nombre: "Producto 3",
          descripcion: "Descripción del producto 3",
          precioUnitario: 30,
        },
      ],
      items: [],
      cola: [],
    };
  },
  created(){
   this.agregarProducto()
  },
  computed: {
    valorSinIVA() {
      return this.items.reduce((sum, item) => sum + item.precioUnitario * item.cantidad, 0);
    },
    iva() {
      return this.items.reduce((sum, item) => sum + item.precioUnitario * item.cantidad * 0.16, 0);
    },
    valorTotal() {
      return this.valorSinIVA + this.iva;
    },
  },
  methods: {
    agregarProducto() {
      const nuevoProducto = {
        referencia: null,
        nombre: null,
        descripcion: null,
        precioUnitario: null,
        cantidad: null,
        total: null,
        agregar: null,
      };
      this.items.push(nuevoProducto);
    },
    calcularTotal(item) {
      item.total = item.precioUnitario * item.cantidad;
    },
    agregarCola(item) {
      this.agregarProducto()
      const nuevoItem = Object.assign({}, item);
      this.cola.unshift(nuevoItem);
    },
},
};
</script>