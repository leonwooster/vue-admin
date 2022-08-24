<template lang="">
  <v_Nav />
  <div class="container-fluid">
    <div class="row">
      <v_Menu/>
      <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <router-view></router-view>
      </main>
    </div>
  </div>  
</template>


<script>
import v_Nav from "@/components/Nav.vue";
import v_Menu from "@/components/Menu.vue";
import { onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

export default {
    name:"v_Wrapper",
    components:{v_Nav, v_Menu},
    setup(){
      const router = useRouter();

      //After all the html is loaded.
      onMounted(async () =>{
        try{
        const {data} = await axios.get('user');
        console.log(data);
        }
        catch(e)
        {
          await router.push('/login');
        }
      });
    },
}
</script>
<style lang="">
    
</style>