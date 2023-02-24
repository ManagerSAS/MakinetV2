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
        <v-list dense offset-y class="animate__animated animate__fadeIn">
          <v-list-item-group>
            <v-list-item
              v-for="item in items"
              :key="item.title"
              v-bind="item"
              @click="navigateTo(item.to)"
              class="animate__animated animate__bounceIn"
            >
              <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
  </v-navigation-drawer>
  </template>
  <style lang="scss">
  .animate__animated {
    animation-duration: 1s;
  }
  
  .animate__bounceIn {
    animation-name: bounceIn;
  }
  
  .animate__fadeIn {
    animation-name: fadeIn;
  }
  
  @keyframes bounceIn {
    from,
    20%,
    40%,
    60%,
    80%,
    to {
      animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
    }
    
    0% {
      opacity: 0;
      transform: scale3d(0.3, 0.3, 0.3);
    }
    
    20% {
      transform: scale3d(1.1, 1.1, 1.1);
    }
    
    40% {
      transform: scale3d(0.9, 0.9, 0.9);
    }
  
    60% {
      opacity: 1;
      transform: scale3d(1.03, 1.03, 1.03);
    }
    
    80% {
      transform: scale3d(0.97, 0.97, 0.97);
    }
    
    to {
      opacity: 1;
      transform: scale3d(1, 1, 1);
    }
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    
    to {
      opacity: 1;
    }
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
            title: 'Inicio',
            to: '/PanelAdmonLider',
          },
          {
            title: 'CRM',
            to: '/PanelAdmonLider/CRM/Cotizador',
          },
        ],
      }
    }
  }
  </script>
