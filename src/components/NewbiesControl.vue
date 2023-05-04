<template>
    <div style="border-width: 5px; height: 20px">
        <button @click="()=>{visible = !visible}" class="btn btn-primary">Создать нового пользователя</button>
        <CreateNewbie   @close="OpenCloseModal" :visible="visible" variant="primary"/>
    </div>

    <div style="margin-top: 40px; position:static" >
        <div class="container border border-white rounded-4" v-for="newbie in this.user.newbies">
            <div v-if="edit_newbie!==newbie.pk">
                <img :src="newbie.user.avatar" class="d-block rounded" alt="..." style="height: 40px;width: 40px;position: relative; top: 10px">
                <span style="position:relative ;bottom: 20px; margin-left: 50px">{{newbie.user.firstname}}</span>
                <span style="position:relative ;bottom: 20px; margin-left: 10px">{{newbie.user.lastname}}</span>
                <span style="position:relative ;bottom: 20px; margin-left: 10px">{{newbie.department.name}}</span>
                <button @click="edit_newbie=newbie.pk" class="btn btn-light " style="position:relative;bottom: 20px; margin-left: 10px">Редактировать</button>
                <button @click="DeleteNewbie(newbie.user.pk)" class="btn btn-danger" style="position:relative;bottom: 20px; margin-left: 10px">Удалить</button>
            </div>
            <NewbieUpdateForm @update_newbie="CloseUpdateForm()" v-bind:newbie="newbie" v-bind:departments="departments" v-if="edit_newbie===newbie.pk"/>
        </div>
        <p v-if="display_error" class="text-center text-danger">Произошла ошибка</p>
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
            axios.get('http://localhost:8000/api/auth/department/getall/', {headers})
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
            axios.delete('http://localhost:8000/api/auth/user/delete/' + pk + '/', {headers})
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