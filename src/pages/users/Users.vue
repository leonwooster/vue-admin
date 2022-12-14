<template lang="">
  <div class="pt-3 pb-2 mb-3 border-bottom">
    <router-link to="/users/create" class="btn btn-sm btn-outline-secondary">Add</router-link>
  </div>
  <div class="table-responsive">
          <table class="table table-striped table-sm">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Role</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in users" :key="user.id">
                <td>{{user.id}}</td>
                <td>{{user.first_name}} {{user.last_name}}</td>
                <td>{{user.email}}</td>
                <td>{{user.role.name}}</td>
                <td>
                  <div class="btn-group mr-2">
                    <router-link :to="`/users/${user.id}/edit`" class="btn btn-sm btn-outline-secondary" @click="edit(user.id)">Edit</router-link>
                    <a href="javascript:void(0)" class="btn btn-sm btn-outline-secondary" @click="del(user.id)">Delete</a>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <nav>
          <ul class="pagination">
            <li class="page-item">
              <a class="page-link" v-on:click="prev">Previous</a>     
            </li>
            <li class="page-item">
              <a class="page-link" v-on:click="next">Next</a>
            </li>
          </ul>
        </nav>
</template>

<script lang="ts">
import { onMounted, ref, watch } from 'vue';
import axios from 'axios';
import { User } from '@/models/user';

export default {
  name: "v_Users",
  setup() {
    const users = ref([]);
    const page = ref(1);
    const lastPage = ref(0);

    const load = async () => {
      const { data } = await axios.get(`users?page=${page.value}`);
      users.value = data.data;
      lastPage.value = data.meta.last_page;
    }

    onMounted(load);

    watch(page, load);    

    const next = () => {
      if (page.value < lastPage.value) {
        page.value++;
      }
    }

    const prev = () => {
      if (page.value > 1) {
        page.value--;
      }
    }

    const del = async (id: number) => {
      if (confirm(`Are you sure you want to delete this user?`)) {
        await axios.delete(`users/${id}`);

        users.value = users.value.filter((user: User) => user.id !== id);
      }
    }

    return {
      users,
      next,
      prev,
      del,
    }
  },
}
</script>