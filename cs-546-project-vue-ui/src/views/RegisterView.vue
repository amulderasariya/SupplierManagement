<template>
	<div class="h-screen bg-gray-50">
		<div class="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
			<div class="sm:mx-auto sm:w-full sm:max-w-md">
				<IconTruck class="mx-auto h-12 w-auto" />
				<h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Register for an account</h2>
				<p class="mt-2 text-center text-sm text-gray-600">
					Or
					{{ " " }}
					<a href="/login" class="font-medium text-indigo-600 hover:text-indigo-500">sign in to your account </a>
				</p>
			</div>

			<div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
				<div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
					<Form class="space-y-6" @submit="onSubmit" :validation-schema="schema">
						<div>
							<label for="organization" class="block text-sm font-medium text-gray-700">Company Name</label>
							<div class="mt-1">
								<Field
									id="organization"
									name="organization"
									type="text"
									autocomplete="organization"
									required="true"
									class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
								/>
							</div>
							<ErrorMessage class="mt-2 text-sm text-red-600" name="organization" />
						</div>

						<div>
							<label for="email" class="block text-sm font-medium text-gray-700">Email address</label>
							<div class="mt-1">
								<Field id="email" name="email" type="email" autocomplete="email" required="true" class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" />
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
							<label for="repassword" class="block text-sm font-medium text-gray-700">Confirm Password</label>
							<div class="mt-1">
								<Field id="repassword" name="repassword" type="password" required class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" />
							</div>
							<ErrorMessage class="mt-2 text-sm text-red-600" name="repassword" />
						</div>

						<div>
							<label for="role" class="block text-sm font-medium text-gray-700">Role</label>
							<Field as="select" id="role" name="role" class="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
								<option value="SUPPLIER">Supplier</option>
								<option value="OWNER">Business Owner</option>
							</Field>
							<ErrorMessage class="mt-2 text-sm text-red-600" name="role" />
						</div>

						<div>
							<button type="submit" class="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Register</button>
						</div>
					</Form>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import axios from "axios";
import { useRouter } from "vue-router";
import { Field, Form, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import { useToast } from "vue-toastification";
import IconTruck from "../components/icons/IconTruck.vue";

const toast = useToast();
const router = useRouter();

const schema = yup
	.object()
	.shape({
		organization: yup
			.string()
			.min(3, "Company name must be at least 3 characters")
			.max(50, "Company name must be less than 50 characters")
			.matches(/^((?!\s{2}).)*$/, "Multiple spaces in between")
			.matches(/[a-zA-Z]/, "Company name must contain only alphabet")
			.test({
				message: "Company name can't contain number",
				test: (value) => {
					const numRegex = /[0-9]/;
					if (numRegex.test(value)) return false;
					return true;
				},
			})
			.test({
				message: "Company name can't contain special characters",
				test: (value) => {
					const specialRegex = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;
					if (specialRegex.test(value)) return false;
					return true;
				},
			})
			.required("Company name is required")
			.trim("Company name can't contain leading or trailing spaces"),
		email: yup.string().email("Enter a valid email").required("Email field is required").max(50, "Password must be less than 50 characters").trim("Email can't contain leading or trailing spaces"),
		password: yup
			.string()
			.matches(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/, "Password must contain at least one special character")
			.matches(/^((?!\s).)*$/, "Password must not contain spaces")
			.matches(/[0-9]/, "Password must contain at least one number")
			.matches(/[A-Z]/, "Password must contain at least one upper case letter")
			.matches(/[a-z]/, "Password must contain at least one lower case letter")
			.min(6, "Password must be at least 6 characters")
			.max(50, "Password must be less than 50 characters")
			.required("Password field is required")
			.trim("Password can't contain leading or trailing spaces"),
		repassword: yup
			.string()
			.oneOf([yup.ref("password")], "Passwords do not match")
			.required("Comfirm Password field is required"),
		role: yup.string().required("Select a role"),
	})
	.strict(true);

const onSubmit = async (values) => {
	try {
		const res = await axios.post("/auth/register", values);
		$cookies.set("token", res.data.token);
		axios.defaults.headers.common["Authorization"] = `Bearer ${$cookies.get("token")}`;

		const user = await axios.get("/auth/user");
		$cookies.set("user", user.data);

		toast.success("User Registered!");
		router.push("/dashboard/analytics");
	} catch (e) {
		e.response.data.errors.forEach((error) => {
			toast.error(error.msg);
		});
	}
};
</script>
