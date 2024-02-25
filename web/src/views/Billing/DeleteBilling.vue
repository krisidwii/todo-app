<!-- ModalComponent.vue -->
<template>
  <div>
    <button @click="openModal" class="btn btn-danger">Remove</button>
    <div
      class="modal fade"
      ref="myModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              Are you sure to delete project with id: {{ project.id }}?
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <p>Project Title: {{ project.title }}</p>
            <p>Project Description: {{ project.description }}</p>
            <p>
              Project status:
              {{ project.completed ? "Completed" : "Not Completed" }}
            </p>
            <p>Project Created At: {{ project.createdAt }}</p>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              @click="closeModal"
            >
              Close
            </button>
            <button type="button" class="btn btn-danger" @click="deleteProject">
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { deleteTodo } from "../../services/services/todo.service";
export default {
  name: "DeleteBilling",
  props: {
    project: {
      type: Object,
      required: true,
    },
  },
  methods: {
    openModal() {
      this.$refs.myModal.classList.add("show");
      this.$refs.myModal.style.display = "block";
    },
    closeModal() {
      this.$refs.myModal.classList.remove("show");
      this.$refs.myModal.style.display = "none";
    },
    async deleteProject() {
      try {
        const res = await deleteTodo(this.project.id);
        console.log(res);
        const data = res.data;
        if (data.status) {
          this.$refs.myModal.classList.remove("show");
          this.$refs.myModal.style.display = "none";
          this.$toast.success("Project deleted");
          this.$router.go();
        } else {
          this.$refs.myModal.classList.remove("show");
          this.$refs.myModal.style.display = "none";
          this.$toast.error("Project not deleted");
          this.$router.go();
        }
      } catch (error) {
        console.log(error);
        this.$refs.myModal.classList.remove("show");
        this.$refs.myModal.style.display = "none";
        this.$toast.error("Error deleting project");
        this.$router.go();
      }
    },
  },
};
</script>
