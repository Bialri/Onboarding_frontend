<template>
<HrNavBar @select="setBlock"/>
    <div class="container cont">
        <NewbiesControl @update_newbie="UpdateUser()" v-bind:user="user" v-if="block==='users'"/>
    </div>

</template>

<script>
import HrNavBar from "@/components/HrNavBar.vue";
import NewbiesControl from "@/components/NewbiesControl.vue";
export default {
    name: 'HrProfile',
    components:{
        HrNavBar,
        NewbiesControl,
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