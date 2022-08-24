<template>
    <form @submit.prevent = "submit">
        <div class="mb-3">
            <label>First Name</label>
            <input v-model="form.first_name" class="form-control" type="text" name="first_name" placeholder="First Name" />
        </div>
        <div class="mb-3">
            <label>Last Name</label>
            <input v-model="form.last_name" class="form-control" type="text" name="last_name" placeholder="Last Name" />
        </div>
        <div class="mb-3">
            <label>Email</label>
            <input v-model="form.email" class="form-control" type="text" name="email" placeholder="Email" />
        </div>
        <div class="mb-3">
            <label>Role</label>
            <select v-model="form.role_id" name="role_id" class="form-control">
                <option v-for="role of roles" :key="role.id" :value="role.id">                
                    {{role.name}}
                </option>
            </select>
        </div>
        <button class="btn btn-outline-secondary">Save</button>
    </form>
</template>
<script>
import {reactive, onMounted, ref} from "vue";
import axios from "axios";
import { useRouter, useRoute } from "vue-router";

export default {
    name: "v_UserEdit",
    setup()
    {
        const form = reactive({
            first_name: '',
            last_name: '',
            email: '',
            role_id: ''
        });

        const roles = ref([]);
        const router = useRouter();
        const route = useRoute();

        onMounted(async () => {
            const {data} = await axios.get("roles");
            roles.value = data;

            const response = await axios.get(`users/${route.params.id}`);

            form.first_name = response.data.first_name;
            form.last_name = response.data.last_name;
            form.email = response.data.email;
            form.role_id = response.data.role.id;
        });

        const submit = async () => {
            console.log(form);
            await axios.put(`users/${route.params.id}`, form);
            await router.push('/users');
        }

        return {
            form,
            submit,
            roles,
        }
    }
}
</script>
