<template>
    <header class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
        <a class="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6" href="#">Company name</a>
        <div class="navbar-nav">
            <div class="text-nowrap">
                <router-link to="/profile" class="px-3 text-white text-decoration-none">{{name}}</router-link>
                <router-link to="/login" class="px-3 text-white text-decoration-none" @click="logout">Sign out</router-link>
            </div>
        </div>
    </header>
</template>

<script type="ts">

import { onMounted } from "vue";
import axios from "axios";
import {ref} from "vue";

export default {
    name: "v_Nav",
    setup() {
        const name = ref('');
        //After all the html is loaded.
        onMounted(async () => {
            const { data } = await axios.get('user');
            name.value = data.first_name + ' ' + data.last_name;
        });

        const logout = async () =>{
            await axios.post('logout');
        }

        return {
            name,
            logout,
        }
    },
}
</script>
