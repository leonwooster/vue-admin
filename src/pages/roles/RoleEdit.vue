<template>
    <form @submit.prevent = "submit">
        <div class="mb-3">
            <label>Name</label>
            <input v-model="form.name" class="form-control" type="text" name="name" placeholder="Name" />
        </div>
        <div class="mb-3 row">
            <label class="col-sm-2 col-form-label">Permissions</label>
            <div class="col-sm-10">
                <div class="form-check form-check-inline col-3" v-for="p in permissionList" :key="p.id">
                    <input class="form-check-input" type="checkbox" :value="p.id" @change="select(p.id, $event.target.checked)" :checked="checked(p.id)"/>
                    <label class="form-check-label">{{ p.name }}</label>
                </div>
            </div>
        </div>
        <button class="btn btn-outline-secondary">Save</button>
    </form>
</template>

<script lang="ts">
import {reactive, onMounted, ref} from "vue";
import axios from "axios";
import { useRouter, useRoute } from "vue-router";
import {Permission} from "@/models/permission";

export default {
    name: "v_RoleEdit",
    setup()
    {
        const form = reactive({
            name: '',
            permissions: [] as number[]
        });
        
        const permissionList = ref([]);
        
        const router = useRouter();
        const route = useRoute();

        onMounted(async () => {
            const {data} = await axios.get("permissions");
            permissionList.value = data;

            const response = await axios.get(`roles/${route.params.id}`);

            form.name = response.data.name;
            form.permissions = response.data.permissions.map((p : Permission) => p.id);
        });

         const select = (id: number, checked: boolean) => {
            if(checked)
            {
                form.permissions = [...form.permissions, id];
                return;
            }

            form.permissions = form.permissions.filter(p => p !== id);
        }

        const checked = (id : number) => {
            return form.permissions.some(p => p === id);
        }

        const submit = async () => {
            console.log(form);
            await axios.put(`roles/${route.params.id}`, form);
            await router.push('/roles');
        }

        return {
            form,
            submit,            
            permissionList,
            select,
            checked,
        }
    }
}
</script>
