  <template>
    <v-navigation-drawer
      app
    >
      <div class="user-info" v-for="(info, index) in infUser" :key="index">
        <v-img class="rounded-foto" :src="info.foto"/>
        <p class="name">{{info.nombre}}</p>
        <p class="cargo">{{info.profesion}}</p>
        <p class="skills">{{info.skills}}</p>
      </div>
      <v-list>
        <v-list-group v-for="(categoria, index) in crm" :key="index">
          <template v-slot:activator>
            <v-list-item-title >{{ categoria.categoria }}</v-list-item-title>
          </template>
          <v-list-group
            v-for="(subcategoria, index) in categoria.item"
            :key="index"
            :to="subcategoria.to"
            sub-group
          >
            <template v-slot:activator >
              <v-list-item-title >{{ subcategoria.subcategoria }}</v-list-item-title>
            </template>
            <v-list-item
              v-for="(subsubcategoria, index) in subcategoria.item"
              :key="index"
              link
              :to="subsubcategoria.to"
            >
              <v-list-item-title >
                  {{ subsubcategoria.subsubcategoria }}
              </v-list-item-title>
            </v-list-item>
          </v-list-group>
        </v-list-group>
      </v-list>
  </v-navigation-drawer>
</template>
<script>
import post from '../post/post'
  export default {
    data() {
      return {
        infUser:[],
        crm: [
          {
            categoria: 'Panel',
            item:[
              {
                subcategoria: 'Solicitudes',
                item: [
                  {subsubcategoria: 'Crear Solicitud',to:'/PanelAdmonLider'},
                  {subsubcategoria: 'Ver Solictudes',to:'/PanelAdmonLider'},
                  {subsubcategoria: 'Notas',to:'/PanelAdmonLider'},
                  {subsubcategoria: 'Homenajes Olivos',to:'/PanelAdmonLider'},
                ] 
              }
            ]
          },
          {
            categoria: 'CRM',
            item:[
              {
                subcategoria: 'Cotizador',
                item: [
                  {subsubcategoria: 'Crear Cotizacion',to:'/PanelAdmonLider/CRM/Cotizador/CrearCotizacion'},
                  {subsubcategoria: 'Ver Cotizaciones',to:'/PanelAdmonLider/CRM/Cotizador/VerCotizacion'},
                ] 
              },
              {
                subcategoria: 'Clientes',
                item: [
                  {subsubcategoria: 'Crear Cliente',to:'/PanelAdmonLider/CRM/Clientes/CrearCliente'}
                ] 
              }
            ]
          }, 
        ],
      }
    },
    mounted(){
      this.infoUser()
    },
    methods:{
      async infoUser(){
        console.log(localStorage.getItem('username'));
        const usuario ={
          user: localStorage.getItem('username')
        }
        const response = await post.infoUser(usuario)
        if(response.error === false){
          response.results.forEach((element) => {
              this.infUser.push({
                  nombre: element.nombre,
                  skills: element.skills,
                  profesion: element.profesion,
                  foto:element.foto,
              })
          })
        }
      }
    }
  }
  </script>
