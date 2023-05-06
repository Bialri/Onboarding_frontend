<template>
    <div class="row d-flex justify-content-center">
        <div class="col-md-6 col-xl-4">
            <form @submit.prevent="Update_newbie()">
                <p class="text-center">Имя</p>
                <input v-model="update_newbie_obj.firstname" class="form-control" type="text" name="firstname"/>
                <p class="text-center">Фамилия</p>
                <input v-model="update_newbie_obj.lastname" class="form-control" type="text" name="lastname"/>
                <p class="text-center">Отдел</p>
                <select v-model="update_newbie_obj.department_id" class="form-select" name="department_id">
                    <option v-for="department in departments" :value="department.pk">{{ department.name }}</option>
                </select>
                <p class="text-center">Позиция</p>
                <input v-model="update_newbie_obj.position" class="form-control" type="text" name="position"/>
                <button type="submit" class="btn btn-primary mt-3 mb-2 w-100">Сохранить</button>
                <p v-if="error" class="text-center text-danger">Произошла ошибка</p>
            </form>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name:"NewbieUpdateForm",
    props:{
        newbie:Object,
        departments:Array,
    },
    data(){
        return{
            update_newbie_obj:{
                firstname:this.newbie.user.firstname,
                lastname:this.newbie.user.lastname,
                department_id:this.newbie.department.pk,
                position:this.newbie.position,
            },
            error:false,
        }
    },
    methods:{
      Update_newbie(){
          let headers = {'Authorization': "Bearer " + localStorage.getItem('access')}
          axios.patch('https://backend.kardasov.ru/api/auth/newbie/update/'+ this.newbie.pk + '/', this.update_newbie_obj,
              {headers})
              .then((response) => {
                  this.$emit('update_newbie')
              })
              .catch((error) => {
                  this.error = true
              })
      }
    },
    mounted() {

    }
}

</script>

<style scoped>

</style>