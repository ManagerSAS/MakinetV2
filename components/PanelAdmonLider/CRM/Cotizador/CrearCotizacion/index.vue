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
        <v-form>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field label="Descripción" v-model="product.description" required></v-text-field>
          <v-textarea label="Detalles" v-model="product.details"></v-textarea>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field label="Cantidad" v-model.number="product.quantity" required></v-text-field>
          <v-text-field label="Valor unitario" v-model.number="product.unitPrice" required></v-text-field>
        </v-col>
      </v-row>
      <v-btn color="primary" @click="addProduct" class="mt-5">Agregar producto</v-btn>
    </v-form>
    <v-divider class="mt-5"></v-divider>
    <v-data-table :headers="headers" :items="products" hide-default-footer>
      <template v-slot:items="props">
        <tr>
          <td>{{ props.item.description }}</td>
          <td>{{ props.item.quantity }}</td>
          <td>{{ props.item.unitPrice }}</td>
          <td>{{ props.item.subtotal }}</td>
          <td>{{ props.item.tax }}</td>
          <td>{{ props.item.total }}</td>
        </tr>
      </template>
      <template v-slot:no-data>
        <v-alert :value="true" color="error" icon="mdi-alert-circle">No hay productos agregados</v-alert>
      </template>
    </v-data-table>
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
      product: {
        description: '',
        details: '',
        quantity: '',
        unitPrice: ''
      },
      products: []
    }
  },
  computed: {
    headers() {
      return [
        { text: 'Descripción', value: 'description' },
        { text: 'Cantidad', value: 'quantity' },
        { text: 'Valor unitario', value: 'unitPrice' },
        { text: 'Subtotal', value: 'subtotal' },
        { text: 'IVA', value: 'tax' },
        { text: 'Total', value: 'total' }
      ]
    }
  },
  methods: {
    addProduct() {
      const subtotal = this.product.quantity * this.product.unitPrice
      const tax = subtotal * 0.16
      const total = subtotal + tax
      const newProduct = {
        description: this.product.description,
        details: this.product.details,
        quantity: this.product.quantity,
        unitPrice: this.product.unitPrice,
        subtotal: subtotal,
        tax: tax,
        total: total
      }
      this.products.push(newProduct)
      this.product.description = ''
      this.product.details = ''
      this.product.quantity = ''
      this.product.unitPrice = ''
    }
  }
}
</script>
  