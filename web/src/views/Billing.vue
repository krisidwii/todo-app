<template>
  <div class="card">
    <div class="card-header">
      <h3 class="card-title">Planning Project</h3>
      <a href="/billing/create" class="btn btn-primary">CREATE</a>
    </div>
    <!-- /.card-header -->
    <div class="card-body">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th style="width: 10%">Name</th>
            <th>Description</th>
            <th style="width: 10%">Completed</th>
            <th>Created At</th>
            <th style="width: 40px">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="project in projects" :key="project.id">
            <td>{{ project.title }}</td>
            <td>{{ project.description }}</td>
            <td class="text-center">
              <i
                v-if="project.completed"
                class="text-success fas fa-check-circle"
              ></i>
              <i v-else class="text-danger fas fa-times-circle"></i>
            </td>
            <td>{{ project.createdAt }}</td>
            <td>
              <a :href="`/billing/edit/${project.id}`" class="btn btn-primary">
                Update
              </a>
              <DeleteModal :project="project" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import DefaultInfoCard from "@/examples/Cards/DefaultInfoCard.vue";
import MasterCard from "@/examples/Cards/MasterCard.vue";
import { getAllTodos } from "../services/services/todo.service";
import DeleteModal from "./Billing/DeleteBilling.vue";

import BillingCard from "./components/BillingCard.vue";
import InvoiceCard from "./components/InvoiceCard.vue";
import PaymentCard from "./components/PaymentCard.vue";
import TransactionCard from "./components/TransactionCard.vue";

export default {
  name: "Billing",
  components: {
    MasterCard,
    DefaultInfoCard,
    PaymentCard,
    InvoiceCard,
    BillingCard,
    TransactionCard,
    DeleteModal,
  },
  data() {
    return {
      salary: {
        classIcon: "text-white fas fa-landmark",
        title: "Salary",
        desc: "Belong Interactive",
        price: "+$500",
      },
      paypal: {
        classIcon: "text-white fab fa-paypal",
        title: "Paypal",
        desc: "Freelance Payment",
        price: "$455.00",
      },
      projects: [],
    };
  },
  methods: {
    async getProjects() {
      try {
        const res = await getAllTodos();
        const data = res.data;
        console.log(data.data);
        if (data.status) {
          for (let i = 0; i < data.data.length; i++) {
            const date = new Date(data.data[i].createdAt);
            const formattedDate = date.toDateString();
            data.data[i].createdAt = formattedDate;
          }
          this.projects = data.data;
        } else {
          this.$toast.error(data.message);
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    console.log("mounted");
    this.getProjects();
  },
};
</script>
import BillingCard from "./components/BillingCard.vue"; import InvoiceCard from
"./components/InvoiceCard.vue"; import PaymentCard from
"./components/PaymentCard.vue"; import TransactionCard from
"./components/TransactionCard.vue";
