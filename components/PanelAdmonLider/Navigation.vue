  <template>
    <v-navigation-drawer
      clipped="true"
      fixed
      app
  >
      <div class="user-info">
        <v-img class="rounded-foto" src="https://www.webconsultas.com/sites/default/files/styles/wc_adaptive_image__small/public/articulos/perfil-resilencia.jpg"/>
        <p class="name">Alejandro Sastoque</p>
        <p class="cargo">Desarrollador Web</p>
      </div>
      <!-- <div>
    <v-list>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>Categoria 1</v-list-item-title>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn icon @click="showItems = !showItems">
            <v-icon>{{ showItems ? 'mdi-chevron-up' : 'mdi-plus' }}</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
      <v-expand-transition>
        <v-list v-if="showItems">
          <v-list-item v-for="item in items" :key="item">
            <v-list-item-content>
              <v-list-item-title>{{ item }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-expand-transition>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>Categoria 2</v-list-item-title>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn icon @click="showItems2 = !showItems2">
            <v-icon>{{ showItems2 ? 'mdi-chevron-up' : 'mdi-plus' }}</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
      <v-expand-transition>
        <v-list v-if="showItems2">
          <v-list-item v-for="item in items2" :key="item">
            <v-list-item-content>
              <v-list-item-title>{{ item }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-expand-transition>
    </v-list>
  </div> -->
  <v-list>
    <v-list-group v-for="(categoria, index) in items" :key="index">
      <template v-slot:activator>
        <v-list-item-title >{{ categoria.categoria }}</v-list-item-title>
      </template>
      <v-list-group
        v-for="(subcategoria, index) in categoria.item"
        :key="index"
        sub-group
      >
        <template v-slot:activator>
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
  export default {
    data() {
      return {
        showItems: false,
        showItems2: false,
        items: [
          {
            categoria: 'CRM',
            item:[
              {
                subcategoria: 'Cotizador',
                item: [
                  {subsubcategoria: 'Crear Cotizacion',to:'/PanelAdmonLider/CRM/Cotizador/CrearCotizacion'},
                  {subsubcategoria: 'Ver Cotizaciones'},
                ] 
              },
              {
                subcategoria: 'Clientes',
                item: [
                  {subsubcategoria: 'Crear Cliente'}
                ] 
              }
            ]
          }, 
        ],
      }
    }
  }
  </script>
