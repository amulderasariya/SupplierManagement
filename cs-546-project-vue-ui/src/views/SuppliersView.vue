<template>
	<div class="px-4 sm:px-6 lg:px-8">
		<div class="sm:flex sm:items-center">
			<div class="sm:flex-auto">
				<h1 class="text-xl font-semibold text-gray-900">Suppliers</h1>

				<p class="mt-2 text-sm text-gray-700">A list of all the suppliers in your account including their name, title, email and rating.</p>
			</div>
			<div class="w-1/5 pl-1 pb-4 mt-5">
				<label for="search" class="sr-only">Search</label>
				<div class="mt-1 relative rounded-md shadow-sm">
					<div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none" aria-hidden="true">
						<svg class="mr-3 h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
							<path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
						</svg>
					</div>
					<input id="search" v-model="search" type="text" name="search" class="focus:ring-blue-200 focus:border-blue-200 block w-full pl-9 sm:text-sm border-gray-300 rounded-md" placeholder="Search" />
				</div>
			</div>
		</div>
		<div class="mt-8 flex flex-col">
			<div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
				<div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
					<div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
						<table class="min-w-full divide-y divide-gray-300">
							<thead class="bg-gray-50">
								<tr class="divide-x divide-gray-200">
									<th scope="col" class="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pl-6">Company Name</th>
									<th scope="col" class="px-4 py-3.5 text-left text-sm font-semibold text-gray-900">Email</th>
									<th scope="col" class="px-4 py-3.5 text-left text-sm font-semibold text-gray-900">Country</th>
									<th scope="col" class="px-4 py-3.5 text-left text-sm font-semibold text-gray-900">City</th>
									<th scope="col" class="px-4 py-3.5 text-left text-sm font-semibold text-gray-900">State</th>
									<th scope="col" class="px-4 py-3.5 text-left text-sm font-semibold text-gray-900">Zip</th>
									<th scope="col" class="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pr-6">Rating</th>
								</tr>
							</thead>
							<tbody class="divide-y divide-gray-200 bg-white">
								<tr v-for="person in filteredPeople" :key="person.email" class="divide-x divide-gray-200">
									<td class="whitespace-nowrap py-4 pl-4 pr-4 text-sm font-medium text-gray-900 sm:pl-6">{{ person.organization }}</td>
									<td class="whitespace-nowrap p-4 text-sm text-gray-500">{{ person.email }}</td>
									<td class="whitespace-nowrap p-4 text-sm text-gray-500">{{ person.country }}</td>
									<td class="whitespace-nowrap p-4 text-sm text-gray-500">{{ person.city }}</td>
									<td class="whitespace-nowrap p-4 text-sm text-gray-500">{{ person.state }}</td>
									<td class="whitespace-nowrap p-4 text-sm text-gray-500">{{ person.zip }}</td>
									<td class="whitespace-nowrap py-4 pl-4 pr-4 text-sm text-gray-500 sm:pr-6">
										<div class="flex items-center">
											<div class="flex items-center">
												<StarIcon v-for="rating in [0, 1, 2, 3, 4]" :key="rating" :class="[person.overallRating > rating ? 'text-yellow-400' : 'text-gray-500', 'h-5 w-5 flex-shrink-0']" aria-hidden="true" />
											</div>
										</div>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import { StarIcon } from "@heroicons/vue/20/solid";

const search = ref("");

const filteredPeople = computed(() => {
	return people.filter((person) => {
		return (
			person.organization.toLowerCase().indexOf(search.value.toLowerCase()) != -1 || person.email.toLowerCase().indexOf(search.value.toLowerCase()) != -1 || person.city.toLowerCase().indexOf(search.value.toLowerCase()) != -1 || person.email.toLowerCase().indexOf(search.value.toLowerCase()) != -1
		);
	});
});

const people = reactive([
	{ organization: "Lindsay", city: "Hobboken", email: "lindsay@example.com", country: "United States", state: "New Jersey", zip: "07307", overallRating: 1.5 },
	{ organization: "John", city: "Bronx", email: "lilly@example.com", country: "United States", state: "New Jersey", zip: "07307", overallRating: 4.5 },
	{ organization: "Godwyn", city: "Queens", email: "raj@example.com", country: "United States", state: "New Jersey", zip: "07307", overallRating: 3.5 },
	{ organization: "Walton", city: "Manhattan", email: "macy@example.com", country: "United States", state: "New Jersey", zip: "07307", overallRating: 2.5 },
	{ organization: "Anna", city: "Central", email: "dennis@example.com", country: "United States", state: "New Jersey", zip: "07307", overallRating: 1.5 },
]);
</script>
