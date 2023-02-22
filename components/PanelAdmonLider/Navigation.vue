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
      <v-list dense>
      <v-list-item-group>
        <transition-group name="submenu-transition" tag="div">

          <v-list-item v-for="(item, index) in items" :key="index">
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                {{ item.title }}
              </v-list-item-title>
              <v-list-item-subtitle v-if="item.submenu">
                <v-list-item-group>
                  <v-list-item v-for="(subitem, subindex) in item.submenu" :key="subindex" :to="subitem.to" exact>
                    <v-list-item-action>
                      <v-icon>{{ subitem.icon }}</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                      <v-list-item-title>{{ subitem.title }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </transition-group>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>

  </template>
  <style>
  .submenu-transition-enter-active, .submenu-transition-leave-active {
  transition: all 0.3s ease-in-out;
}

.submenu-transition-enter, .submenu-transition-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

  .rounded-foto{
    width: 100px; /* establece el ancho de la imagen */
    height: 100px; /* establece la altura de la imagen */
    object-fit: cover; /* hace que la imagen se ajuste al contenedor */
    object-position: center; /* centra la imagen */
    border-radius: 50%; /* hace que la imagen sea redonda */
    aspect-ratio: 1/1; /* establece la relación de aspecto a 1:1 (cuadrada) */
  }
  .name{
    font-size: 20px;
    font-family: 'poppins';
  }
  .cargo{
    position: relative;
    top: -25px;
    font-size: 15px;
    font-family: 'poppins';
  }
  .user-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 16px;
  }

  .user-info p {
    margin-top: 16px;
  }

  </style>
  <script>
  export default {
    data () {
      return {
        items: [
          {
            title: 'CRM',
            submenu:[
              {
                icon: 'mdi-apps',
                title: 'Cotizador',
                isActive: false,
                submenu:[
                  {
                    icon: 'mdi-apps',
                    title:'Ver Cotizaciones',
                    to: '/'
                  },
                  {
                    icon: 'mdi-apps',
                    title:'Crear Cotizaciones',
                    to: '/'
                  },
                ]
              },
              {
                icon: 'mdi-apps',
                title: 'Clientes',
                isActive: false,
                submenu:[
                  {
                    icon: 'mdi-apps',
                    title:'Ver Cliente',
                    to: '/'
                  },
                  {
                    icon: 'mdi-apps',
                    title:'Crear Cliente',
                    to: '/'
                  },
                ]
              },
              {
                icon: 'mdi-apps',
                title: 'Productos',
                isActive: false,
                submenu:[
                  {
                    icon: 'mdi-apps',
                    title:'Ver Productos',
                    to: '/'
                  },
                  {
                    icon: 'mdi-apps',
                    title:'Crear Productos',
                    to: '/'
                  },
                ]
              },
              
            ],
            to: '/'
          },
        ],
      }
    }
  }
  </script>
