<template>
	<div class="mx-6">
		<Form class="h-full space-y-6" @submit="onSubmit" :validation-schema="schema">
			<div class="bg-white px-4 py-5 shadow sm:rounded-lg sm:p-6">
				<div class="md:grid md:grid-cols-3 md:gap-6">
					<div class="md:col-span-1">
						<h3 class="text-lg font-medium leading-6 text-gray-900">Update profile</h3>
						<p class="mt-1 text-sm text-gray-500">This information will be displayed publicly to business owner to place purchase orders</p>
					</div>
					<div class="mt-5 space-y-6 md:col-span-2 md:mt-0">
						<!-- <div>
							<label for="avatar" class="block text-sm font-medium text-gray-700">Company Logo</label>
							<div class="mt-1 flex items-center space-x-5">
								<div>
									<span class="inline-block h-12 w-12 overflow-hidden rounded-full bg-gray-100">
										<svg class="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
											<path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
										</svg>
									</span>
								</div>
								<Field name="avatar" v-slot="{ handleChange, handleBlur }" class="rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
									<input type="file" @change="handleChange" @blur="handleBlur" />
								</Field>
							</div>
							<ErrorMessage class="mt-2 text-sm text-red-600" name="avatar" />
						</div> -->

						<div class="grid grid-cols-6 gap-6">
							<div class="col-span-6 sm:col-span-3">
								<label for="organization" class="block text-sm font-medium text-gray-700">Company name</label>
								<Field type="text" name="organization" id="organization" :value="data.organization" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
								<ErrorMessage class="mt-2 text-sm text-red-600" name="organization" />
							</div>

							<div class="col-span-6 sm:col-span-4">
								<label for="email" class="block text-sm font-medium text-gray-700">Email address</label>
								<Field type="text" name="email" id="email" :value="data.email" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
								<ErrorMessage class="mt-2 text-sm text-red-600" name="email" />
							</div>

							<div class="col-span-6 sm:col-span-3">
								<label for="country" class="block text-sm font-medium text-gray-700">Country</label>
								<Field as="select" id="country" name="country" v-model="selectCountry" @change="onSelectCountry()" class="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
									<option v-for="country in countryDropdown.data" :value="country.isoCode">{{ country.name }}</option>
								</Field>
							</div>

							<div class="col-span-6 sm:col-span-3 lg:col-span-2">
								<label for="state" class="block text-sm font-medium text-gray-700">State / Province</label>
								<Field
									as="select"
									id="state"
									name="state"
									v-model="selectState"
									@change="onSelectState()"
									:disabled="selectCountry ? false : true"
									class="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
								>
									<option v-for="state in stateDropdown.data" :value="state.isoCode">{{ state.name }}</option>
								</Field>
							</div>

							<div class="col-span-6 sm:col-span-6 lg:col-span-2">
								<label for="city" class="block text-sm font-medium text-gray-700">City</label>
								<Field as="select" id="city" name="city" v-model="selectCity" :disabled="selectState ? false : true" class="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
									<option v-for="city in cityDropdown.data" :value="city.name">{{ city.name }}</option>
								</Field>
							</div>
						</div>
					</div>
				</div>
				<div class="flex justify-end mt-4">
					<button type="submit" class="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Update</button>
				</div>
			</div>
		</Form>
	</div>
</template>

<script setup>
import { ref } from "vue";
import { Field, Form, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import axios from "axios";
import { useToast } from "vue-toastification";

const toast = useToast();
const { data } = await axios.get("/auth/user");
var countryDropdown = ref([]);
var stateDropdown = ref([]);
var cityDropdown = ref([]);
var selectCountry = ref(data.country || "");
var selectState = ref(data.state || "");
var selectCity = ref(data.city || "");

try {
	countryDropdown.value = await axios.get("/lookup/country");
} catch (e) {
	e.response.data.errors.forEach((error) => {
		toast.error(error.msg);
	});
}

const onSelectCountry = async () => {
	selectState.value = "";
	selectCity.value = "";
	try {
		stateDropdown.value = await axios.get("/lookup/state", {
			params: {
				country: selectCountry.value,
			},
		});
	} catch (e) {
		e.response.data.errors.forEach((error) => {
			toast.error(error.msg);
		});
	}
};

const onSelectState = async () => {
	selectCity.value = "";
	try {
		cityDropdown.value = await axios.get("/lookup/city", {
			params: {
				country: selectCountry.value,
				state: selectState.value,
			},
		});
	} catch (e) {
		e.response.data.errors.forEach((error) => {
			toast.error(error.msg);
		});
	}
};

if (selectState.value) {
	onSelectCountry();
	selectState.value = data.state;
	selectCity.value = data.city;
}

if (selectCity.value) {
	onSelectState();
	selectCity.value = data.city;
}

const schema = yup
	.object()
	.shape({
		organization: yup
			.string()
			.min(3, "Company name must be at least 3 characters")
			.max(15, "Company name must be less than 15 characters")
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
		email: yup.string().email("Enter a valid email").required("Email field is required").trim("Email can't contain leading or trailing spaces"),
	})
	.strict(true);

const onSubmit = async (values) => {
	try {
		await axios.post("/auth/user", values);
		toast.success("User information updated!");
	} catch (e) {
		e.response.data.errors.forEach((error) => {
			toast.error(error.msg);
		});
	}
};
</script>
