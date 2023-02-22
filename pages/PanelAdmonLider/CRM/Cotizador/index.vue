<template>
    <v-container fluid>
        <Header/>
        <Navigation/>
        <CrearCotizacion/>
    </v-container>
</template>
<script>
    import Header from '~/components/PanelAdmonLider/Header'
    import Navigation from '~/components/PanelAdmonLider/Navigation'
    import CrearCotizacion from '~/components/PanelAdmonLider/CRM/Cotizador/CrearCotizacion'
    export default {
        components:{
            Header,
            Navigation,
            CrearCotizacion
        },
        setup() {
            
        },
    }
</script>