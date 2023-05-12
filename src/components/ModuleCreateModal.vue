<template>
    <div v-if="OpenClose" class="modal fade show" style="display: block" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false"
         tabindex="-1" aria-labelledby="exampleModalLable" aria-modal="true" role="dialog" >
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title text-dark">Добавить Модуль</h5>
                    <button type="button" class="btn-close" @click="OpenCloseFun()" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form>
                        <label class="form-label text-dark">Название</label>
                        <input v-model="create_module.name" class="form-control" type="text"/>

                        <label class="form-label text-dark">Описание</label>
                        <input v-model="create_module.description" class="form-control" type="text"/>

                        <label class="form-label text-dark">Отдел</label>
                        <select v-model="create_module.department" class="form-select" name="department">
                            <option v-for="department in departments" :value="department.pk">{{ department.name }}</option>
                        </select>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" @click="OpenCloseFun()" :class="'btn btn-'+variant" data-bs-dismiss="modal">Закрыть</button>
                    <button type="button" class="btn btn-success" @click="addModule()">Добавить</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
    name:"ModuleCreateModal",
    props:{
        visible:Boolean,
        variant:String,
    },
    data(){
        return{
            OpenClose: this.visible,
            create_module:{
                name:'',
                description:'',
                department:-1,
            },
            departments:[],
            display_error:false,
            HOST:import.meta.env.VITE_HOST,
        }
    },
    methods:{
        OpenCloseFun() {
            this.OpenClose = !this.OpenClose;
            this.$emit('close_module')
        },
        addModule(){
            let headers = {'Authorization': "Bearer " + localStorage.getItem('access')}
            axios.post(this.HOST +'/api/tutorials/module/create/', this.create_module ,{headers})
                .then((response) => {
                    this.create_manual = {
                        name:'',
                        description:'',
                        department:-1,
                    }
                    this.OpenClose = !this.OpenClose;
                    this.$emit('close_module')
                })
                .catch((error) => {
                    this.display_error = true
                })
        },
        GetDepartments(){
            let headers = {'Authorization': "Bearer " + localStorage.getItem('access')}
            axios.get(this.HOST +'/api/auth/department/getall/', {headers})
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