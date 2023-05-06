<template>
    <div style="border-width: 5px; height: 20px">
        <button @click="()=>{visible = !visible}" class="btn btn-primary">Создать нового пользователя</button>
        <CreateNewbie   @close="OpenCloseModal" :visible="visible" variant="primary"/>
    </div>

    <div style="margin-top: 40px; position:static" >
        <div class="row mt-3">
            <div class="col"></div>
            <div class="col"><p class="fw-bold">Имя</p></div>
            <div class="col"><p class="fw-bold">Фамилия</p></div>
            <div class="col"><p class="fw-bold">Отдел</p></div>
            <div class="col"><p class="fw-bold">Должность</p></div>
            <div class="col"></div>
            <div class="col"></div>
        </div>
        <div v-for="newbie in this.user.newbies" style="margin-bottom: 30px">
            <div v-if="edit_newbie!==newbie.pk">
                <div class="row border border-white rounded-4 p-3">
                    <div class="col">
                        <img :src="newbie.user.avatar" class="rounded" style="width: 40px;height: 40px">
                    </div>
                    <div class="col">
                        <p>{{newbie.user.firstname}}</p>
                    </div>
                    <div class="col">
                        <p>{{newbie.user.lastname}}</p>
                    </div>
                    <div class="col">
                        <p>{{newbie.department.name}}</p>
                    </div>
                    <div class="col">
                        <p>{{newbie.position}}</p>
                    </div>
                    <div class="col">
                        <button @click="edit_newbie=newbie.pk" class="btn btn-light ">Редактировать</button>
                    </div>
                    <div class="col">
                        <button @click="DeleteNewbie(newbie.user.pk)" class="btn btn-danger">Удалить</button>
                    </div>
                </div>
                <p v-if="display_error" class="text-center text-danger">Произошла ошибка</p>
            </div>
            <NewbieUpdateForm @update_newbie="CloseUpdateForm()" v-bind:newbie="newbie" v-bind:departments="departments" v-if="edit_newbie===newbie.pk"/>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import NewbieUpdateForm from "@/components/NewbieUpdateForm.vue";
import CreateNewbie from "@/components/CreateNewbie.vue";
export default {
    name: "NewbiesControl",
    components:{
        NewbieUpdateForm,
        CreateNewbie
    },
    data(){
        return{
            edit_newbie:-1,
            departments:{},
            visible:false,
            display_error:false,
        }
    },
    props:{
        user:Object,
    },
    methods:{
        GetDepartments(){
            let headers = {'Authorization': "Bearer " + localStorage.getItem('access')}
            axios.get('https://backend.kardasov.ru/api/auth/department/getall/', {headers})
                .then((response) => {
                    this.departments = response.data

                })
        },
        CloseUpdateForm(){
            this.$emit('update_newbie')
            this.edit_newbie = -1
        },
        OpenCloseModal(){
            this.visible = !this.visible
            this.$emit('update_newbie')
        },
        DeleteNewbie(pk){
            let headers = {'Authorization': "Bearer " + localStorage.getItem('access')}
            axios.delete('https://backend.kardasov.ru/api/auth/user/delete/' + pk + '/', {headers})
                .then((response) => {
                    this.$emit('update_newbie')
                    this.display_error = false
                })
                .catch((error) => {
                    this.display_error = true
                })
        },
    },
    mounted() {
        console.log(this.user);
        this.GetDepartments();
    }
}
</script>

<style scoped>


</style>