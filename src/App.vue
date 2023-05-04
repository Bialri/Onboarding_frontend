<template>
    <navbar-component @logout="logout()"  v-bind:is_authentificated="is_authenticated"/>
    <router-view @login="auth()"></router-view>

</template>

<script>
import NavbarComponent from "@/components/NavbarComponent.vue";
import axios from "axios";

export default{
    components:{
        NavbarComponent,
    },
    data(){
        return{
            is_authenticated:false,
        }

    },
    methods:{
        get_user_data() {
            let headers = {'Authorization': "Bearer " + localStorage.getItem('access')}
            axios.get('http://localhost:8000/api/auth/me/', {headers})
                .then((response) => {
                    this.is_authenticated = true

                })
                .catch((error) => {
                    this.is_authenticated = false
                })
        },
        auth(){
            this.is_authenticated = true
        },
        logout(){
            this.is_authenticated = false
            localStorage.removeItem('access')
            localStorage.removeItem('refresh')
        }

    },
    mounted() {
        this.get_user_data();
    }

}

</script>


<style>


</style>
