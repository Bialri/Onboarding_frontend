<template>
    <div v-if="OpenClose" class="modal fade show" style="display: block" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false"
         tabindex="-1" aria-labelledby="exampleModalLable" aria-modal="true" role="dialog" >
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title text-dark">Добавить Сотрудника</h5>
                    <button type="button" class="btn-close" @click="OpenCloseFun()" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form>
                        <label class="form-label text-dark">Email</label>
                        <input v-model="create_newbie.email" class="form-control" type="email"/>
                        <label class="form-label text-dark">Пароль</label>
                        <input v-model="create_newbie.password" class="form-control" type="password"/>
                        <label class="form-label text-dark">Имя</label>
                        <input v-model="create_newbie.firstname" class="form-control" type="text" />
                        <label class="form-label text-dark">Фамилия</label>
                        <input v-model="create_newbie.lastname" class="form-control" type="text" />
                        <label class="form-label text-dark">Отдел</label>
                        <select v-model="create_newbie.department_id" class="form-select" name="department_id">
                            <option v-for="department in departments" :value="department.pk">{{ department.name }}</option>
                        </select>
                        <label class="form-label text-dark">Позиция</label>
                        <input v-model="create_newbie.position" class="form-control" type="text" />
                        <p v-if="display_error" class="text-center text-danger">Произошла ошибка</p>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" @click="OpenCloseFun()" :class="'btn btn-'+variant" data-bs-dismiss="modal">Закрыть</button>
                    <button type="button" class="btn btn-success" @click="addNewbie()">Добавить</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name:"CreateNewbie",
    props:{
        visible:Boolean,
        variant:String,
    },
    data(){
        return{
            OpenClose: this.visible,
            create_newbie:{
                email:'',
                password:'',
                firstname:'',
                lastname:'',
                department_id:1,
                position:'',
            },
            departments:{},
            display_error:false
        }
    },
    methods:{
        OpenCloseFun() {
            this.OpenClose = !this.OpenClose;
            this.$emit('close')
        },
        addNewbie(){
            let headers = {'Authorization': "Bearer " + localStorage.getItem('access')}
            axios.post('https://backend.kardasov.ru/api/auth/newbie/register/', this.create_newbie ,{headers})
                .then((response) => {
                    this.create_newbie = {
                        email:'',
                            password:'',
                            firstname:'',
                            lastname:'',
                            department_id:1,
                            position:'',
                    }
                    this.OpenClose = !this.OpenClose;
                    this.$emit('close')
                })
                .catch((error) => {
                    this.display_error = true
                })
        },
        GetDepartments(){
            let headers = {'Authorization': "Bearer " + localStorage.getItem('access')}
            axios.get('https://backend.kardasov.ru/api/auth/department/getall/', {headers})
                .then((response) => {
                    this.departments = response.data

                })
        },
    },
    watch:{
        visible: function (newVal){
            this.OpenClose = newVal
        }
    },
    mounted() {
        this.GetDepartments();
    }
}
</script>

<style scoped>

</style>