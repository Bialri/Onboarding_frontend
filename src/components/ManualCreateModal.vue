<template>
    <div v-if="OpenClose" class="modal fade show" style="display: block" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false"
         tabindex="-1" aria-labelledby="exampleModalLable" aria-modal="true" role="dialog" >
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title text-dark">Добавить Мануал</h5>
                    <button type="button" class="btn-close" @click="OpenCloseFun()" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form>
                        <label class="form-label text-dark">Название</label>
                        <input v-model="create_manual.name" class="form-control" type="text"/>

                        <label class="form-label text-dark">Описание</label>
                        <input v-model="create_manual.description" class="form-control" type="text"/>

                        <label class="form-label text-dark">Модуль</label>
                        <select v-model="create_manual.module" class="form-select" name="module_id">
                            <option v-for="module in modules" :value="module.pk">{{ module.name }}</option>
                        </select>
                        <label class="form-label text-dark">Файл</label>
                        <CustomFileInput class="form-control" v-model="create_manual.file" />
                        <p v-if="display_error" class="text-center text-danger">Произошла ошибка</p>
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
import CustomFileInput from "@/components/CustomFileInput.vue";
export default {
    name:"ManualCreateModal",
    props:{
        visible:Boolean,
        variant:String,
    },
    components:{
        CustomFileInput,
    },
    data(){
        return{
            OpenClose: this.visible,
            create_manual:{
                name:'',
                description:'',
                module:'',
            },
            modules:[],
            display_error:false,
            HOST:import.meta.env.VITE_HOST,
        }
    },
    methods:{
        OpenCloseFun() {
            this.OpenClose = !this.OpenClose;
            this.$emit('close_manual')
        },
        addModule(){
            let headers = {'Authorization': "Bearer " + localStorage.getItem('access')}
            let form_data = new FormData();
            form_data.append("name",this.create_manual.name)
            form_data.append("description",this.create_manual.description)
            form_data.append("module",this.create_manual.module)
            if (this.create_manual.file !== undefined){
                form_data.append("file",this.create_manual.file ,this.create_manual.file.name)
            }
            axios.post(this.HOST +'/api/tutorials/manual/create/', form_data ,{headers})
                .then((response) => {
                    this.create_manual = {
                        name:'',
                        description:'',
                        module:'',
                    }
                    this.OpenClose = !this.OpenClose;
                    this.$emit('close_manual')
                })
                .catch((error) => {
                    this.display_error = true
                })
        },
        GetModules(){
            let headers = {'Authorization': "Bearer " + localStorage.getItem('access')}
            axios.get(this.HOST +'/api/tutorials/manual/getall/', {headers})
                .then((response) => {
                    this.modules = response.data

                })
        },
    },
    watch:{
        visible: function (newVal){
            this.OpenClose = newVal
        }
    },
    mounted() {
        this.GetModules();
    }
}
</script>

<style scoped>

</style>