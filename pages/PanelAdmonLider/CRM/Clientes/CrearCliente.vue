<template>
    <v-container fluid>
        <Header/>
        <Navigation/>
        <CrearCliente/>
    </v-container>
</template>
<script>
    import Header from '~/components/PanelAdmonLider/Header'
    import Navigation from '~/components/PanelAdmonLider/Navigation'
    import CrearCliente from '~/components/PanelAdmonLider/CRM/Clientes/CrearCliente'
    export default {
        components:{
            Header,
            Navigation,
            CrearCliente
        },
        setup() {
            
        },
    }
</script>