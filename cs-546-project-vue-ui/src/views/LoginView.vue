<template>
	<div class="h-screen bg-gray-50">
		<div class="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
			<div class="sm:mx-auto sm:w-full sm:max-w-md">
				<IconTruck class="mx-auto h-12 w-auto" />
				<h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Sign in to your account</h2>
				<p class="mt-2 text-center text-sm text-gray-600">
					Or
					{{ " " }}
					<a href="/register" class="font-medium text-indigo-600 hover:text-indigo-500">register for an account </a>
				</p>
			</div>

			<div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
				<div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
					<Form class="space-y-6" @submit="onSubmit" :validation-schema="schema">
						<div>
							<label for="email" class="block text-sm font-medium text-gray-700">Email address</label>
							<div class="mt-1">
								<Field id="email" name="email" type="email" autocomplete="email" required class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" />
							</div>
							<ErrorMessage class="mt-2 text-sm text-red-600" name="email" />
						</div>

						<div>
							<label for="password" class="block text-sm font-medium text-gray-700">Password</label>
							<div class="mt-1">
								<Field id="password" name="password" type="password" required class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" />
							</div>
							<ErrorMessage class="mt-2 text-sm text-red-600" name="password" />
						</div>

						<div>
							<button type="submit" class="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Sign in</button>
						</div>
					</Form>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import axios from "axios";
import router from "../router";
import { Field, Form, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import { useToast } from "vue-toastification";
import IconTruck from "../components/icons/IconTruck.vue";

const toast = useToast();

const schema = yup
	.object()
	.shape({
		email: yup.string().email("Enter a valid email").required("Email field is required").trim("Email can't contain leading or trailing spaces"),
		password: yup
			.string()
			.matches(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/, "Password must contain at least one special character")
			.matches(/^((?!\s).)*$/, "Password must not contain spaces")
			.matches(/[0-9]/, "Password must contain at least one number")
			.matches(/[A-Z]/, "Password must contain at least one upper case letter")
			.matches(/[a-z]/, "Password must contain at least one lower case letter")
			.min(6, "Password must be at least 6 characters")
			.max(15, "Password must be less than 15 characters")
			.required("Password field is required")
			.trim("Password can't contain leading or trailing spaces"),
	})
	.strict(true);

const onSubmit = async (values) => {
	try {
		const res = await axios.post("/auth/login", values);
		$cookies.set("token", res.data.token);
		axios.defaults.headers.common["Authorization"] = `Bearer ${$cookies.get("token")}`;

		const user = await axios.get("/auth/userInfo");
		$cookies.set("user", user.data);

		toast.success("Logged In!");
		router.push("/dashboard/analytics");
	} catch (e) {
		e.response.data.errors.forEach((error) => {
			toast.error(error.msg);
		});
	}
};
</script>
