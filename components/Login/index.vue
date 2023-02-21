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
          <v-text-field label="Nombre de usuario" outlined></v-text-field>
          <v-text-field label="Contraseña" outlined :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" @click:append="showPassword = !showPassword" :type="showPassword ? 'text' : 'password'"></v-text-field>
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
  export default {
    data() {
      return {
        showPassword: false,
        loading: false
      }
    },
    methods: {
      login() {
        // Aquí puedes agregar la lógica de validación de usuario y contraseña
        // Si las credenciales son válidas, puedes redirigir al usuario a la página principal
        // de lo contrario, puedes mostrar un mensaje de error.
        this.loading = true;
            document.querySelector('.login-card').style.display = 'none';
            document.querySelector('.login-loader').style.display = 'flex';
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