<template>
    <v-container fluid>
        <Header/>
        <Navigation/>
        <PanelAdmonLider/>
    </v-container>
</template>
<script>
    import Header from '~/components/PanelAdmonLider/Header'
    import Navigation from '~/components/PanelAdmonLider/Navigation'
    import PanelAdmonLider from '~/components/PanelAdmonLider/Dashboard'
    export default {
        components:{
            Header,
            Navigation,
            PanelAdmonLider
        },
        setup() {
            
        },
    }
</script>