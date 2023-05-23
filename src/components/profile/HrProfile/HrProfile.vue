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
import HrNavBar from "@/components/profile/HrProfile/HrNavBar.vue";
import NewbiesControl from "@/components/profile/HrProfile/newbies_control/NewbiesControl.vue";
import ProfileEdit from "@/components/profile/HrProfile/profile_edit/ProfileEdit.vue";
import NotificationsComp from "@/components/profile/HrProfile/notifications_control/NotificationsComp.vue";
import ModuleComp from "@/components/profile/HrProfile/modules_control/ModuleComp.vue";
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