<template>
    <form @submit.prevent = "submit">
        <div class="mb-3 row">
            <label>Name</label>
            <input v-model="form.name" class="form-control" type="text" name="name" placeholder="Name" />
        </div>
        <div class="mb-3 row">
            <label class="col-sm-2 col-form-label">Permissions</label>
            <div class="col-sm-10">
                <div class="form-check form-check-inline col-3" v-for="p in permissionList" :key="p.id">
                    <input class="form-check-input" type="checkbox" :value="p.id" @change="select(p.id, $event.target.checked)"/>
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
import { useRouter } from "vue-router";

export default {
    name: "v_RoleCreate",
    setup()
    {
        const form = reactive({
            name: '',
            permissions: [] as number[],
        });

        const permissionList = ref([]);

        onMounted(async () => {
            const {data} = await axios.get("permissions");
            permissionList.value = data;
        });

        const select = (id: number, checked: boolean) => {
            if(checked)
            {
                form.permissions = [...form.permissions, id];
                return;
            }

            form.permissions = form.permissions.filter(p => p !== id);
        }
        
        const router = useRouter();

        const submit = async () => {
            console.log(form);
            await axios.post(`roles`, form);
            await router.push('/roles');
        }

        return {
            form,
            submit,           
            select, 
            permissionList,
        }
    }
}
</script>
