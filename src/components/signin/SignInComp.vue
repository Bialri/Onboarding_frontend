<template>
    <div class="container" style="height: 80px"></div>
    <div class="container">
        <section class="text-center py-4 py-xl-5">
            <h2 class="text-center" style="margin-bottom: 12px;">Войти как</h2>
            <button v-on:click="this.hr_login = true" v-bind:class="( hr_login )?'btn btn-primary':'btn btn-dark'" type="button" style="margin-right: 10px;">HR</button>
            <button v-on:click="this.hr_login = false" v-bind:class="( hr_login )?'btn btn-dark':'btn btn-primary'" type="button">Сотрудник</button>
            <div class="container">
                <div class="row d-flex justify-content-center">
                    <div class="col-md-6 col-xl-4">
                        <div class="card mb-5">
                            <div class="card-body d-flex flex-column align-items-center">
                                <div class="bs-icon-xl bs-icon-circle bs-icon-primary bs-icon my-4"><svg class="bi bi-person" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"></path>
                                </svg></div>
                                <form @submit.prevent="send_login"  class="text-center" method="post">
                                    <div class="mb-3"><input v-model="login.email" type="email" class="form-control" placeholder="Email" /></div>
                                    <div class="mb-3"><input v-model="login.password" type="password" class="form-control"  placeholder="Пароль" /></div>
                                    <p v-if="error400_flag" class="text-danger">email или пароль неверный</p>
                                    <p v-if="error500_flag" class="text-danger">ошибка сервера</p>
                                    <div class="mb-3"><button class="btn btn-primary d-block w-100" type="submit">Войти</button></div>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>

import axios from "axios";

export default {
    name: "SignInComp",

    data() {
        return {
            hr_login: false,
            login:{
                email:'',
                password:''
            },
            error400_flag:false,
            error500_flag:false,
            HOST:import.meta.env.VITE_HOST,
        }
    },
    methods:{
        send_login(){
            console.log(this.login);
            console.log(import.meta.env.VITE_HOST);
            axios.post(this.HOST +'/api/auth/token/',this.login)
                .then((response) => {
                    localStorage.setItem('access',response.data.access)
                    localStorage.setItem('refresh',response.data.refresh)
                    console.log(response.data.access)
                    this.$emit('login')
                    this.$router.push({path: '/'})

                })
                .catch((error) => {
                    let status = error.response.status
                    status = status - status % 100
                    if(status  === 400){
                      this.error400_flag = true
                      this.error500_flag = false
                    }
                    if(status === 500){
                        this.error400_flag = false
                        this.error500_flag = true
                    }

                })
        }
    }
}
</script>

<style scoped>

</style>