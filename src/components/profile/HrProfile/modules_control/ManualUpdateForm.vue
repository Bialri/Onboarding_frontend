<template>
    <form @submit.prevent="update_manual()" class="w-50">
        <p class="text-center">Название</p>
        <input v-model="update_manual_obj.name" class="form-control" type="text" name="name"/>
        <p class="text-center">Описание</p>
        <input v-model="update_manual_obj.description" class="form-control" type="text" name="description"/>
        <p class="text-center">Файл</p>
        <CustomFileInput class="form-control" v-model="update_manual_obj.file"/>
        <button type="submit" class="btn btn-primary mt-3 mb-2 w-100">Сохранить</button>
        <p v-if="error" class="text-center text-danger">Произошла ошибка</p>
    </form>
</template>

<script>
import CustomFileInput from "@/components/CustomFileInput.vue";
import axios from "axios";
export default {
    name:"ManualUpdateForm",
    props:{
        manual:Object
    },
    components:{
        CustomFileInput
    },
    data(){
        return{
            update_manual_obj:{
                module:this.manual.module,
                name:this.manual.name,
                description:this.manual.description,

            },
            error:false,
            HOST:import.meta.env.VITE_HOST,
        }
    },
    methods:{
        update_manual(){
            let headers = {'Authorization': "Bearer " + localStorage.getItem('access')}
            let form_data = new FormData();
            form_data.append("module",this.update_manual_obj.module)
            form_data.append("name",this.update_manual_obj.name)
            form_data.append("description",this.update_manual_obj.description)
            if (this.update_manual_obj.file !== undefined){
                form_data.append("file",this.update_manual_obj.file ,this.update_manual_obj.file.name)
            }
            axios.patch(this.HOST +'/api/tutorials/manual/update/'+ this.manual.pk + '/', form_data,
                {headers})
                .then((response) => {
                    this.$emit('update_manual')
                })
                .catch((error) => {
                    this.error = true
                    console.log(error)
                })
            console.log(this.manual)
        }
    }
}
</script>

<style scoped>

</style>