<template>
  <div class="card">
    <div class="card-header">
      <h3 class="card-title">Create Project</h3>
    </div>
    <!-- /.card-header -->
    <div class="card-body">
      <form @submit.prevent="createProject">
        <input
          type="text"
          class="form-control mt-2"
          id="title"
          v-model="title"
          placeholder="Title"
        />
        <textarea
          type="text"
          class="form-control mt-2"
          id="description"
          v-model="description"
          placeholder="Description"
        />
        <input
          type="text"
          class="form-control mt-2"
          id="category"
          v-model="category"
          placeholder="Tag"
        />
        <button type="submit" class="btn btn-primary w-100 mt-2">Create</button>
      </form>
    </div>
  </div>
</template>

<script>
import { AxiosError } from "axios";
import { createTodo } from "../../services/services/todo.service";

export default {
  name: "CreateBilling",

  data() {
    return {
      title: "",
      description: "",
      category: "",
    };
  },

  methods: {
    async createProject() {
      try {
        console.log(this.title, this.description);
        const res = await createTodo({
          title: this.title,
          description: this.description,
          category: this.category,
        });
        console.log(res);
        const data = res.data;
        if (data.status) {
          this.$toast.success("Project created successfully");
          this.$router.push("/billing");
        } else {
          this.$toast.error(data.message);
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          console.log(error);
          this.$toast.error(error.response.data.error);
        } else {
          this.$toast.error("An error occurred");
        }
      }
    },
  },
};
</script>
