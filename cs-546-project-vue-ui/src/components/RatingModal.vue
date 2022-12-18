<template>
	<TransitionRoot as="template" :show="props.open">
		<Dialog as="div" class="relative z-10" @close="$emit('close', false)">
			<TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
				<div class="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity md:block" />
			</TransitionChild>

			<div class="fixed inset-0 z-10 overflow-y-auto">
				<div class="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
					<TransitionChild
						as="template"
						enter="ease-out duration-300"
						enter-from="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
						enter-to="opacity-100 translate-y-0 md:scale-100"
						leave="ease-in duration-200"
						leave-from="opacity-100 translate-y-0 md:scale-100"
						leave-to="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
					>
						<DialogPanel class="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl">
							<div class="relative flex w-full items-center overflow-hidden bg-white px-4 pt-14 pb-8 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
								<button type="button" class="absolute top-4 right-4 text-gray-400 hover:text-gray-500 sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-8 lg:right-8" @click="$emit('close', false)">
									<span class="sr-only">Close</span>
									<XMarkIcon class="h-6 w-6" aria-hidden="true" />
								</button>

								<div class="grid w-full grid-cols-1 items-start gap-y-8 gap-x-6 sm:grid-cols-12 lg:gap-x-8">
									<div class="aspect-w-2 aspect-h-3 overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-5">
										<img :src="product.imageSrc" :alt="product.imageAlt" class="object-cover object-center" />
									</div>
									<div class="sm:col-span-8 lg:col-span-7">
										<h2 class="text-2xl font-bold text-gray-900 sm:pr-12">{{ product.name }}</h2>

										<section aria-labelledby="information-heading" class="mt-2">
											<h3 id="information-heading" class="sr-only">Product information</h3>

											<p class="text-2xl text-gray-900">{{ product.price }}</p>

											<!-- Reviews -->
											<div class="mt-6">
												<h4 class="sr-only">Reviews</h4>
												<div class="flex items-center">
													<div class="flex items-center">
														<StarIcon v-for="rating in [0, 1, 2, 3, 4]" :key="rating" :class="[product.rating > rating ? 'text-yellow-400' : 'text-gray-500', 'h-5 w-5 flex-shrink-0']" aria-hidden="true" />
													</div>
													<p class="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">{{ product.rating }} out of 5 stars</p>
												</div>
											</div>
										</section>

										<section aria-labelledby="options-heading" class="mt-10">
											<h3 id="options-heading" class="sr-only">Product options</h3>

											<form>
												<div class="-mx-4 mt-8 flex flex-col sm:-mx-6 md:mx-0">
													<dl class="min-w-full flex justify-between border-b border-gray-200">
														<dt>Supplier</dt>
														<dd class="pt-4 text-right text-sm text-gray-500">{{ product.supplier }}</dd>
													</dl>
													<dl class="min-w-full flex justify-between border-b border-gray-200">
														<dt>Department</dt>
														<dd class="pt-4 text-right text-sm text-gray-500">{{ product.department }}</dd>
													</dl>
													<dl class="min-w-full flex justify-between border-b border-gray-200">
														<dt>Category</dt>
														<dd class="pt-4 text-right text-sm text-gray-500">{{ product.category }}</dd>
													</dl>
													<dl class="min-w-full flex justify-between border-b border-gray-200">
														<dt>Sub Category</dt>
														<dd class="pt-4 text-right text-sm text-gray-500">{{ product.subCategory }}</dd>
													</dl>
													<dl class="min-w-full flex justify-between border-b border-gray-200">
														<dt>Stock</dt>
														<dd class="pt-4 text-right text-sm text-gray-500">{{ product.stock }}</dd>
													</dl>
												</div>
												<button type="submit" class="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
													Place Order
												</button>
											</form>
										</section>
									</div>
								</div>
							</div>
						</DialogPanel>
					</TransitionChild>
				</div>
			</div>
		</Dialog>
	</TransitionRoot>
</template>

<script setup>
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from "@headlessui/vue";
import { XMarkIcon } from "@heroicons/vue/24/outline";
import { StarIcon } from "@heroicons/vue/20/solid";

const product = {
	name: "Sony A7",
	price: "$192",
	rating: 4.65,
	supplier: "Godwyn James William",
	department: "Entertainment",
	category: "Cameras and Supply",
	subCategory: "Sony",
	stock: "78",
	imageSrc: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1638&q=80",
	imageAlt: "Two each of gray, white, and black shirts arranged on table.",
};

const props = defineProps(["open"]);
</script>
