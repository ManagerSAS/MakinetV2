<template>
    <div class="login-container">
      <div class="login-card">
        <div class="login-header">
          <span class="login-title">MAKINET</span>
          <div class="login-subtitle">
            <span>by: Manager S.A.S</span> <br>
          </div><br>
          <div class="login-social-icons">
            <v-icon size="24" class="mr-2">mdi-whatsapp</v-icon>
            <v-icon size="24" class="mr-2">mdi-instagram</v-icon>
            <v-icon size="24">mdi-facebook</v-icon>
          </div>
        </div>
        <div class="login-form">
          <v-text-field 
            v-model="email" 
            label="Nombre de usuario" outlined
          >
          </v-text-field>
          <v-text-field 
            label="Contraseña"
            v-model="password" 
            outlined :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" 
            @click:append="showPassword = !showPassword" :type="showPassword ? 'text' : 'password'"
          >
          </v-text-field>
          <v-btn color="primary" class="mt-5" @click="login">Iniciar sesión</v-btn>
          <div class="login-loader hide" v-if="loading">
            <v-progress-circular indeterminate color="primary"></v-progress-circular>
          </div>
          <div class="login-description">
            <span>Makinet, es un sistema encargado de procesar y gestionar las actividades realizadas dentro de una empresa, un sistema desarrollado por: Manager S.A.S</span>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import post from '../post/post'
import store from '@/store/store.js'

  export default {
    data() {
      return {
        showPassword: false,
        loading: false,
        email: '',
        password: '',
        rules: {
            required: value => !!value || 'Requerido.',
            email: value => {
                const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                return pattern.test(value) || 'Correo invalido.'
            },
        },
      }
    },
    methods: {
      async login() {
        this.loading = true;
        const dataUSer = { 
          usuario: this.email, 
          clave: this.password 
        }; 
            // this.$router.push('/PanelAdmonLider')
            try {
                const data = await post.login(dataUSer);
                console.log(data)
                const status = data.status
                const token = data.data.token

                if (status === 200 && data.data.token !== null) {
                    if (data.data.token) {
                      if(data.data.rows[0].tipo_usuario === 1)
                        setTimeout(() => {
                            this.loadLogin = false;
                        }, 3000);

                        localStorage.setItem('token', token);
                        localStorage.setItem('username', data.data.rows[0].usuario)
                        localStorage.setItem('authenticated-makinet', true);
                        store.commit('doLogin', token);
                        store.dispatch('doLogin', token);
                        this.$router.push('/PanelAdmonLider')
                    }
                }
                //  else {
                //     this.snackbarColor = 'red accent-3';
                //     this.showError = true;
                //     this.messageInvalid = 'Asegúrate que el usuario y la contraseña sean correctos';
                //     setTimeout(() => {
                //         this.snackbarColor = '';
                //         this.showError = false;
                //         this.messageInvalid = '';
                //     }, 5000);
                // }
            } catch (error) {
                console.log(error);
            }   
          
            setTimeout(() => {
                this.loading = false;
                
            }, 3000);
      }
    }
  }
  </script>
  
  <style scoped>
  .login-container {
    background: #0c2c3f;
    background: linear-gradient(to bottom right, #0c2c3f, rgba(0, 0, 0, 0));
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  
  .login-card {
    background: white;
    padding: 32px;
    border-radius: 8px;
    max-width: 400px;
    width: 100%;
    text-align: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  
  .login-header {
    margin-bottom: 32px;
  }
  
  .login-title {
    color: #6eb6bb;
    font-size: 25px;
    font-family: 'Poppins', sans-serif;
    font-weight: bold;
  }
  
  .login-subtitle {
    color: #0c2c3f;
    font-size: 12px;
    margin-top: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .login-social-icons {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 8px;
  }
  .login-form {
  display: flex;
  flex-direction: column;
}

.login-form v-text-field {
  margin-bottom: 16px;
}

.login-loader {
  display: flex;
  justify-content: center;
  margin-top: 16px;
}
.login-loader:not(.hide) + .login-description,
.login-loader:not(.hide) + .v-btn {
  display: none;
}

.login-description {
  color: #0c2c3f;
  font-size: 12px;
  margin-top: 32px;
  text-align: center;
  max-width: 600px;
}
</style>