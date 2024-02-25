import { createRouter, createWebHistory } from "vue-router";
import Billing from "../views/Billing.vue";
import CreateBillingVue from "../views/Billing/CreateBilling.vue";
import EditBillingVue from "../views/Billing/EditBilling.vue";
import Dashboard from "../views/Dashboard.vue";
import Profile from "../views/Profile.vue";
import RTL from "../views/Rtl.vue";
import Signin from "../views/Signin.vue";
import Signup from "../views/Signup.vue";
import Tables from "../views/Tables.vue";
import VirtualReality from "../views/VirtualReality.vue";

const routes = [
  {
    path: "/",
    name: "/",
    redirect: "/dashboard-default",
  },
  {
    path: "/dashboard-default",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/tables",
    name: "Tables",
    component: Tables,
  },
  {
    path: "/billing",
    name: "Planning Project",
    component: Billing,
  },
  {
    path: "/billing/create",
    name: "Create Billing",
    component: CreateBillingVue,
  },
  {
    path: "/billing/edit/:id",
    name: "Edit Billing",
    component: EditBillingVue,
  },
  {
    path: "/virtual-reality",
    name: "Virtual Reality",
    component: VirtualReality,
  },
  {
    path: "/rtl-page",
    name: "RTL",
    component: RTL,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
  },
  {
    path: "/signin",
    name: "Signin",
    component: Signin,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
];
function nextFactory(context, middleware, index) {
  const nextMiddleware = middleware[index];

  if (!nextMiddleware) {
    return context.next;
  }
  const subsequentMiddleware = nextFactory(context, middleware, index + 1);
  return nextMiddleware({ ...context, next: subsequentMiddleware });
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  linkActiveClass: "active",
});

router.beforeEach((to, from, next) => {
  if (!to.meta.middleware) return next();

  const middleware = Array.isArray(to.meta.middleware)
    ? to.meta.middleware
    : [to.meta.middleware];
  const context = {
    to,
    from,
    next,
    router,
  };

  return middleware[0]({
    ...context,
    next: nextFactory(context, middleware, 1),
  });
});

export default router;
