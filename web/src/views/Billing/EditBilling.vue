<template>
  <div class="card">
    <div class="card-header">
      <h3 class="card-title">Update Project with id: {{ id }}</h3>
    </div>
    <!-- /.card-header -->
    <div class="card-body">
      <form @submit.prevent="updateProject">
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
        <!-- <argon-checkbox
          v-model="completed"
          class="mt-2"
          label="Completed"
          color="primary"
        /> -->
        <div class="form-check mt-2">
          <input
            class="form-check-input"
            type="checkbox"
            id="completed"
            v-model="completed"
          />
          <label class="form-check-label" for="completed">Completed</label>
        </div>
        <button type="submit" class="btn btn-primary w-100 mt-2">Update</button>
      </form>
    </div>
  </div>
</template>

<script>
import ArgonCheckbox from "../../components/ArgonCheckbox.vue";
import { getTodo, updateTodo } from "../../services/services/todo.service";

export default {
  name: "EditBilling",
  components: {
    ArgonCheckbox,
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      id: null,
      title: "",
      description: "",
      category: "",
      completed: false,
    };
  },

  methods: {
    async updateProject() {
      try {
        console.log(this.title, this.description);
        const res = await updateTodo(this.id, {
          title: this.title,
          description: this.description,
          category: this.category,
          completed: this.completed,
        });
        const data = res.data;
        if (data.status) {
          this.$toast.success("Project updated successfully");
          this.$router.push("/billing");
        } else {
          this.$toast.error(data.message);
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  async mounted() {
    const id = this.$route.params.id;
    this.id = id;
    const res = await getTodo(id);
    const data = res.data.data;
    console.log(data);
    this.title = data.title;
    this.description = data.description;
    this.completed = data.completed;
    if (Array.isArray(data.category)) {
      let tmp = [];
      for (let i = 0; i < data.category.length; i++) {
        tmp.push(data.category[i].name);
      }
      this.category = tmp.join(", ");
    } else {
      this.category = data.category;
    }
  },
};
</script>
