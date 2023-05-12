<template>
<HrNavBar @select="setBlock"/>
    <div class="container cont">
        <NewbiesControl @update_newbie="UpdateUser()" v-bind:user="user" v-if="block==='users'"/>
        <ProfileEdit @update_newbie="UpdateUser()" v-bind:user="user" v-if="block==='profile_edit'"/>
        <NotificationsComp v-if="block==='notifications'"/>
        <ModuleComp v-if="block==='modules'"/>
    </div>

</template>

<script>
import HrNavBar from "@/components/HrNavBar.vue";
import NewbiesControl from "@/components/NewbiesControl.vue";
import ProfileEdit from "@/components/ProfileEdit.vue";
import NotificationsComp from "@/components/NotificationsComp.vue";
import ModuleComp from "@/components/ModuleComp.vue";
export default {
    name: 'HrProfile',
    components:{
        HrNavBar,
        NewbiesControl,
        ProfileEdit,
        NotificationsComp,
        ModuleComp,
    },
    data(){
        return{
            block:''
        }
    },
    props:{
        user:Object,
    },
    methods:{
        setBlock(block){
          this.block=block
        },
        UpdateUser(){
            this.$emit('update_newbie')
        }
    }
}
</script>

<style scoped>
.cont{
    position: absolute;
    top: 100px;
    left: 13%;



}

</style>