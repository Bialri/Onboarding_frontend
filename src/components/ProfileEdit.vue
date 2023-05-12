<template>
    <div class="row d-flex justify-content-center">
        <div class="col-md-6 col-xl-4">
            <h5 class="text-center fw-bold">Редактировать профиль</h5>
            <form @submit.prevent="update()">
                <p class="text-center">Имя</p>
                <input v-model="update_hr.firstname" class="form-control" type="text" name="firstname"/>
                <p class="text-center">Фамилия</p>
                <input v-model="update_hr.lastname" class="form-control" type="text" name="lastname"/>
                <button type="submit" class="btn btn-primary mt-3 mb-2 w-100">Сохранить</button>
                <p v-if="error" class="text-center text-danger">Произошла ошибка</p>
            </form>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "ProfileEdit",
    props:{
        user:Object,
    },
    data(){
      return {
          update_hr: {
              firstname: this.user.user.firstname,
              lastname: this.user.user.lastname
          },
          error: false,
          HOST:import.meta.env.VITE_HOST,
      }
    },
    methods:{
        update(){
            let headers = {'Authorization': "Bearer " + localStorage.getItem('access')}
            axios.patch(this.HOST +'/api/auth/hr/update/'+ this.user.pk + '/', this.update_hr,
                {headers})
                .then((response) => {
                    this.$emit('update_newbie')
                    this.error = false
                })
                .catch((error) => {
                    this.error = true
                })
        }
    }
}
</script>

<style scoped>

</style>