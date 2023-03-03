import axios from "axios"

const END_POINTH = 'https://api.makinet.app'

const Api = axios.create({
    baseURL: END_POINTH,
    headers:{
        "Access-Control-Allow-Origin": "*"
    }
})

export default Api