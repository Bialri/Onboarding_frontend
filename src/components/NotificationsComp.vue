<template>
    <div style="margin-top: 40px; position:static" >
        <p v-if="display_error" class="text-center text-danger">Произошла ошибка</p>
        <h3>Непрочитанные</h3>
        <div class="row mt-3">
            <div class="col-md-7"><p class="fw-bold">Заголовок</p></div>
            <div class="col"><p class="fw-bold">От</p></div>
            <div class="col"></div>
        </div>

        <div v-for="notification in notifications">
            <div v-if="notification.is_read===false">
                <div class="border border-white rounded-4">
                    <div class="row mt-3 p-3">
                        <div class="col-md-7">{{notification.title}}</div>
                        <div class="col">{{notification.sender.firstname + " " + notification.sender.lastname}}</div>
                        <div class="col">
                            <button v-if="view_description!=notification.pk" @click="open_desc(notification.pk)" class="btn btn-light">Открыть</button>
                            <button v-if="view_description==notification.pk" @click="view_description=-1" class="btn btn-close" style="background-color: white"></button>
                        </div>
                    </div>
                    <div v-if="view_description===notification.pk">
                        <h5>Описание</h5>
                        <p>{{notification.description}}</p>
                    </div>
                </div>
            </div>
        </div>


        <h3>Прочитанные</h3>

        <div class="row mt-3">
            <div class="col-md-7"><p class="fw-bold">Заголовок</p></div>
            <div class="col"><p class="fw-bold">От</p></div>
            <div class="col"></div>
        </div>

        <div v-for="notification in notifications">
            <div v-if="notification.is_read===true">
                <div class="border border-white rounded-4">
                    <div class="row mt-3 p-3">
                        <div class="col-md-7">{{notification.title}}</div>
                        <div class="col">{{notification.sender.firstname + " " + notification.sender.lastname}}</div>
                        <div class="col">
                            <button v-if="view_description!=notification.pk" @click="view_description=notification.pk" class="btn btn-light">Открыть</button>
                            <button v-if="view_description==notification.pk" @click="view_description=-1" class="btn btn-close" style="background-color: white"></button>
                        </div>
                    </div>
                    <div class="m-sm-3" v-if="view_description===notification.pk">
                        <h6>Описание</h6>
                        <p>{{notification.description}}</p>
                        <h6>Дата</h6>
                        <p>{{ get_date(notification.date) }}</p>
                    </div>
                </div>
            </div>
        </div>


    </div>

</template>

<script>
import axios from "axios";

export default {
    name: "NotificationsComp",
    data(){
        return{
            notifications: [],
            display_error: false,
            view_description:-1,
            update_read:{is_read:true},
            cur_date: Date,
            HOST:import.meta.env.VITE_HOST,
        }
    },
    methods:{
      get_notifications(){
          let headers = {'Authorization': "Bearer " + localStorage.getItem('access')}
          axios.get(this.HOST +'/api/notifications/',{headers})
              .then((response) => {
                  this.notifications = response.data
                  this.display_error = false
                  console.log(response.data)
              })
              .catch((error) => {
                  this.display_error = true
              })
      },
      open_desc(pk){
          this.view_description=pk
          let headers = {'Authorization': "Bearer " + localStorage.getItem('access')}
          axios.patch(this.HOST +'/api/notifications/update/' + pk + '/', this.update_read ,{headers})
              .then((response) => {
                  this.display_error = false

              })
              .catch((error) => {
                  this.display_error = true
              })
      },
      get_date(cur_date){
          let datetime = new Date(cur_date)
          let day = datetime.getDay()
          let mounth = datetime.getMonth()
          let hour = datetime.getHours()
          let minute = datetime.getMinutes()
          return day + "." + mounth + "  " + hour + ':' + minute
      }
    },
    mounted() {
        this.get_notifications();
    }
}
</script>

<style scoped>

</style>