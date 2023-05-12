<template>
    <div class="row">
       <div class="col">
           <h4>Модули</h4>
       </div>
        <div class="col" v-if="view_module==-1">
            <button @click="()=>{visible_modules = !visible_modules}" class="btn btn-primary">Создать новый модуль</button>
            <ModuleCreateModal @close_module="OpenCloseModalModule" :visible="visible_modules" variant="primary"/>
        </div>
    </div>

    <p v-if="display_error" class="text-center text-danger">Не удалось загрузить контент</p>
    <div v-for="module in modules">
        <div class="border border-white rounded-4 p-3 mt-4" >
            <div class="row mt-3 p-3">
                <div class="col-md-6">{{ module.name }}</div>
                <div class="col">
                    <div v-if="view_module===module.pk">
                      <button @click="()=>{visible_manuals = !visible_manuals}" class="btn btn-primary">Создать новый мануал</button>
                      <ManualCreateModal @close_manual="OpenCloseModalManual(module.pk)" :visible="visible_manuals" variant="primary"/>
                    </div>
                </div>
                <div class="col">
                    <button v-if="view_module!=module.pk" @click="open_module(module.pk)" class="btn btn-light">Открыть</button>
                    <button v-if="view_module==module.pk" @click="view_module=-1" class="btn btn-close" style="background-color: white"></button>
                </div>
            </div>

            <div v-if="view_module==module.pk">
                <div v-for="manual in manuals">
                  <div class="border border-white rounded-4">
                      <div v-if="edit_manual!=manual.pk" class="row mt-7 p-3">
                          <div class="col">{{ manual.name }}</div>
                          <div class="col">Описание: {{ manual.description }}</div>
                          <div class="col"><a :href="manual.file" class="link-light fw-bold" target="_blank">Ссылка на документ</a></div>
                          <div class="col">
                              <button class="btn btn-primary" @click="edit_manual=manual.pk">Редактировать</button>
                          </div>
                      </div>

                      <div v-if="edit_manual===manual.pk" class="align-items-center">
                          <ManualUpdateForm @update_manual="update_manual()" :manual="manual" />
                      </div>

                  </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import axios from "axios";
import ManualUpdateForm from "@/components/ManualUpdateForm.vue";
import ManualCreateModal from "@/components/ManualCreateModal.vue";
import CreateNewbie from "@/components/CreateNewbie.vue";
import ModuleCreateModal from "@/components/ModuleCreateModal.vue";
export default {
    name:"ModuleComp",
    data(){
        return{
            modules:[],
            display_error: false,
            HOST:import.meta.env.VITE_HOST,
            view_module:-1,
            edit_manual:-1,
            manuals:[],
            visible_manuals:false,
            visible_modules:false,
        }
    },
    components:{
        CreateNewbie,
      ManualUpdateForm,
      ManualCreateModal,
      ModuleCreateModal,
    },
    methods:{
        get_modules(){
            let headers = {'Authorization': "Bearer " + localStorage.getItem('access')}
            axios.get(this.HOST +'/api/tutorials/module/getall/',{headers})
                .then((response) => {
                    this.modules = response.data
                    this.display_error = false
                })
                .catch((error) => {
                    this.display_error = true
                })
        },
        open_module(module_pk){
            this.view_module=module_pk;
            let headers = {'Authorization': "Bearer " + localStorage.getItem('access')}
            axios.get(this.HOST +'/api/tutorials/manual/'+ module_pk +'/',{headers})
                .then((response) => {
                    this.manuals = response.data
                    this.display_error = false
                })
                .catch((error) => {
                    this.display_error = true
                })
        },
        update_manual(){
          this.get_modules();
          this.edit_manual=-1;
        },
        OpenCloseModalManual(pk){
            this.visible_manuals = !this.visible_manuals
            this.open_module(pk);
        },
        OpenCloseModalModule(){
            this.visible_modules = !this.visible_modules
            this.get_modules();
        }
    },
    mounted() {
        this.get_modules();
    }
}
</script>

<style scoped>

</style>