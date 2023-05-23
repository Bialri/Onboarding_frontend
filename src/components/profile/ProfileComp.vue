<template>
    <h1 v-if="display_error" class="text-center">Ошибка авторизации</h1>
    <HrProfile @update_newbie="get_user_data()" v-if="is_hr" v-bind:user="user"/>
</template>

<script>
import axios from "axios";
import HrProfile from "@/components/profile/HrProfile/HrProfile.vue";

export default {
    name:'ProfileComp',
    components:{
        HrProfile,
    },
    data(){
        return{
            user:Object,
            display_error:false,
            is_hr:false,
            HOST:import.meta.env.VITE_HOST,
        }
    },

    methods:{
        get_user_data() {
            let headers = {'Authorization': "Bearer " + localStorage.getItem('access')}
            axios.get(this.HOST +'/api/auth/me/', {headers})
                .then((response) => {
                    this.user = response.data
                    if(this.user.hasOwnProperty('newbies')){
                        this.is_hr = true
                    }
                    else{
                        this.is_hr = false
                    }

                })
                .catch((error) => {
                    this.display_error = true
                })
        }
    },
    mounted() {
        this.get_user_data();
    }
}
</script>

<style scoped>

</style>