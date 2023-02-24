<template>
    <v-container>
      <v-row  justify="center" align="center">
        <v-col  cols="10" md="5" v-for="({name,icon, envento}, index) in items" :key="index">
          <v-card  @click="envento" elevation="5" class="hoverCard"  max-width="374" min-height="100">
            <v-row justify="center" align="center">
              <v-col justify="center" align="center" class="px-6"> 
                <div class="text-center mx-auto">
                  <v-icon>
                    {{ icon }}
                  </v-icon>
                  <p style="font-size: 25px; color: #0C2C3F; font-weight: 600;">{{name}}</p>
                </div>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
      <!-- Crear Cotización -->
      <v-row v-if="CreatePrice">
        <v-col>
          <CrearCotizacion/>
        </v-col>
      </v-row>
      <!-- Ver Cotización -->
      <v-row v-if="SeePrice">
        <v-col>
          <VerCotizacion/>
        </v-col>
      </v-row>
    </v-container>
</template>
<script>
import CrearCotizacion from './CrearCotizacion'
import VerCotizacion from './VerCotizacion'
  export default {
    components:{
      CrearCotizacion,
      VerCotizacion
    },
    data(){
      return{
        CreatePrice: true,
        SeePrice: false,
        items:[
          {icon:'mdi-folder-plus-outline mdi-48px', name:'Crear Cotización', envento: this.showCreatePrice},
          {icon:'mdi-eye-plus-outline mdi-48px', name:'Ver Cotizaciones', envento:this.showSeePrice}
        ]
      }
    },
    methods:{
      showCreatePrice(){
        this.SeePrice= false
        this.CreatePrice = !this.CreatePrice
      },
      showSeePrice(){
        this.CreatePrice = false
        this.SeePrice = !this.SeePrice
      }
    }
  }
</script>
<style>
.hoverCard{
  transform: scale(1);
  transition: all 0.3s ease-in-out;
}
.hoverCard:hover{
  transform: scale(1.03);
}
</style>