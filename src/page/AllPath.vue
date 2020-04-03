<template>
    <div class="cont">
        <router-link to="/my_center"><div>/my_center</div></router-link>
        <router-link to="/event_list"><div>/event_list</div></router-link>
        <router-link to="/event_view"><div>/event_view</div></router-link>
        <router-link to="/event_mould"><div>/event_mould</div></router-link>
        <router-link to="/event_form"><div>/event_form</div></router-link>
        <router-link to="/event_form_set"><div>/event_form_set</div></router-link>
        <router-link to="/order_list"><div>/order_list</div></router-link>
        <router-link to="/pay_after_set"><div>/pay_after_set</div></router-link>
        <router-link to="/distb_set"><div>/distb_set</div></router-link>
        <router-link to="/bill"><div>/bill</div></router-link>
        <router-link to="/auth"><div>/auth</div></router-link>
        <router-link to="/pay_list"><div>/pay_list</div></router-link>
        <router-link to="/pay_detail"><div>/pay_detail</div></router-link>
    </div>
</template>
<script>
export default {
    data(){
        return {

        }
    },
    methods: {

    },
    created(){
        console.log(this.$store.state);
    }
}
</script>
<style scoped>

</style>