<template>
	<div class="mx-6">
		<form class="h-full space-y-6" action="#" method="POST">
			<div class="bg-white px-4 py-5 shadow sm:rounded-lg sm:p-6">
				<div class="md:grid md:grid-cols-3 md:gap-6">
					<div class="md:col-span-1">
						<h3 class="text-lg font-medium leading-6 text-gray-900">Update profile</h3>
						<p class="mt-1 text-sm text-gray-500">This information will be displayed publicly to business owner to place purchase orders</p>
					</div>
					<div class="mt-5 space-y-6 md:col-span-2 md:mt-0">
						<div>
							<label class="block text-sm font-medium text-gray-700">Logo</label>
							<div class="mt-1 flex items-center space-x-5">
								<span class="inline-block h-12 w-12 overflow-hidden rounded-full bg-gray-100">
									<svg class="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
										<path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
									</svg>
								</span>
								<button type="button" class="rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Change</button>
							</div>
						</div>

						<!-- <div class="grid grid-cols-3 gap-6">
							<div class="col-span-3 sm:col-span-2">
								<label for="company-website" class="block text-sm font-medium text-gray-700">Website</label>
								<div class="mt-1 flex rounded-md shadow-sm">
									<span class="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">http://</span>
									<input type="text" name="company-website" id="company-website" class="block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder="www.example.com" />
								</div>
							</div>
						</div> -->

						<div class="grid grid-cols-6 gap-6">
							<div class="col-span-6 sm:col-span-3">
								<label for="first-name" class="block text-sm font-medium text-gray-700">Company name</label>
								<input type="text" name="first-name" id="first-name" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
							</div>

							<!-- <div class="col-span-6 sm:col-span-3">
								<label for="last-name" class="block text-sm font-medium text-gray-700">Last name</label>
								<input type="text" name="last-name" id="last-name" autocomplete="family-name" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
							</div> -->

							<div class="col-span-6 sm:col-span-4">
								<label for="email-address" class="block text-sm font-medium text-gray-700">Email address</label>
								<input type="text" name="email-address" id="email-address" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
							</div>

							<div class="col-span-6 sm:col-span-3">
								<label for="country" class="block text-sm font-medium text-gray-700">Country</label>
								<select id="country" name="country" class="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
									<option>United States</option>
									<option>Canada</option>
									<option>Mexico</option>
								</select>
							</div>

							<div class="col-span-6">
								<label for="street-address" class="block text-sm font-medium text-gray-700">Street address</label>
								<input type="text" name="street-address" id="street-address" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
							</div>

							<div class="col-span-6 sm:col-span-6 lg:col-span-2">
								<label for="city" class="block text-sm font-medium text-gray-700">City</label>
								<input type="text" name="city" id="city" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
							</div>

							<div class="col-span-6 sm:col-span-3 lg:col-span-2">
								<label for="region" class="block text-sm font-medium text-gray-700">State / Province</label>
								<input type="text" name="region" id="region" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
							</div>

							<!-- <div class="col-span-6 sm:col-span-3 lg:col-span-2">
								<label for="postal-code" class="block text-sm font-medium text-gray-700">ZIP / Postal code</label>
								<input type="text" name="postal-code" id="postal-code" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
							</div> -->
						</div>
					</div>
				</div>
				<div class="flex justify-end mt-4">
					<button type="submit" class="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Update</button>
				</div>
			</div>
		</form>
	</div>
</template>
