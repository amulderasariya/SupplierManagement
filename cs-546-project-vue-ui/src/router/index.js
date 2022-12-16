import { createRouter, createWebHistory } from "vue-router";
import HeroView from "../views/HeroView.vue";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: "hero",
			component: HeroView,
		},
		{
			path: "/login",
			name: "login",
			component: () => import("../views/LoginView.vue"),
		},
		{
			path: "/register",
			name: "register",
			component: () => import("../views/RegisterView.vue"),
		},
		{
			path: "/dashboard",
			name: "dashboard",
			component: () => import("../views/DashboardView.vue"),
			redirect: "/dashboard/analytics",
			children: [
				{
					path: "analytics",
					name: "analytics",
					component: () => import("../views/AnalyticsView.vue"),
				},
				{
					path: "products",
					name: "products",
					component: () => import("../views/ProductsView.vue"),
				},
				{
					path: "createproduct",
					name: "createproduct",
					component: () => import("../views/CreateProductView.vue"),
				},
				{
					path: "orders",
					name: "orders",
					component: () => import("../views/OrderView.vue"),
				},
				{
					path: "suppliers",
					name: "suppliers",
					component: () => import("../views/SuppliersView.vue"),
				},
				{
					path: "profile",
					name: "profile",
					component: () => import("../views/ProfileView.vue"),
				},
			],
		},
		{
			path: "/:pathMatch(.*)*",
			name: "not-found",
			component: () => import("../views/PageNotFoundView.vue"),
		},
	],
});

router.beforeEach(async (to, from) => {
	if (!$cookies.isKey("token") && to.name !== "hero" && to.name !== "login" && to.name !== "register") return { name: "hero" };
	if ($cookies.isKey("token") && (to.name === "hero" || to.name === "login" || to.name === "register")) return { name: "dashboard" };
});

export default router;
