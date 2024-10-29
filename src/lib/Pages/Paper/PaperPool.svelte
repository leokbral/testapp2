<script lang="ts">
	export let papersData;
	export let rota:string = ''
	
	const papers:Paper[] = papersData.papersData[0]
	console.log(papers)
	export let user; // Selecionar o primeiro usuário na lista para demonstração

	let tabSet: number = 0;

	import { getModalStore, type ModalSettings } from '@skeletonlabs/skeleton';
	import Abstract from '$lib/components/hope/Abstract.svelte';
	import PaperList from '$lib/PaperList/index.svelte';
	import type { Paper } from '$lib/types/Paper';
	const modalStore = getModalStore();

	const modal: ModalSettings = {
		type: 'component',
		// Data
		title: 'Example Alert',
		body: 'This is an example modal.',
		image: '',
		component: 'fullScreen'
	};
	function modalAbstract(abstract: string) {
		modal.body = abstract;
		modalStore.trigger(modal);
	}

	let modalData = user;
	let classes = 'bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 text-white';

	function closeModal(event: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }) {
		throw new Error('Function not implemented.');
	}
</script>

<div class="container mx-auto p-4">
	<!-- Navbar -->

	<!-- Sections -->
	<div class="flex flex-col md:flex-row gap-8 mt-4">
		<!-- Filter -->
		<section>
			<div class="bg-white shadow-md rounded p-6 mb-8 max-w-xs">
				axaaaaaaaaaaaaaaaaaaaaasdasda
				<p>axaaaaaaaaaaaaaaaaaaaaasdasda</p>
				<p>axaaaaaaaaaaaaaaaaaaaaasdasda</p>
				<p>axaaaaaaaaaaaaaaaaaaaaasdasda</p>
				<p>axaaaaaaaaaaaaaaaaaaaaasdasda</p>
				<p>axaaaaaaaaaaaaaaaaaaaaasdasda</p>
				<p>axaaaaaaaaaaaaaaaaaaaaasdasda</p>
				<div class="card">Price:</div>
				<div class="flex grid-cols-2 gap-24">
					<div class="card">Min.</div>
					<div class="card">Max.</div>
				</div>
				<div class="card">Numbers of reviewers:</div>
				<div class="card">Price</div>
				<!-- Your filter content goes here -->
			</div>
		</section>
		<!-- Announced Articles -->
		<section class="md:col-span-1 flex-grow">
			<div class="bg-white shadow-md rounded p-6 mb-8">
				<h3 class="text-xl font-bold mb-4">Announced articles</h3>
				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{#each papers as paper, index}
					<a data-sveltekit-reload href="{rota}/{paper.id}" class="flex flex-col gap-2 hover:text-secondary-500">
					<div class="bg-white shadow-md rounded overflow-hidden">
							<header>
								<img src={paper.paperPictures[0]} alt="Post" class="w-full h-48 object-cover" />
							</header>

							<div class="p-4 flex flex-col justify-center gap-4">
								<div class="text-lg font-bold text-center">{paper.title}</div>
								<Abstract abstract={paper.abstract} />
							</div>
							<div class="p-4 flex flex-col justify-center gap-4">
								<div class="text-lg text-center">
									Key words: <div class="text-lg text-center font-bold">{paper.keywords}</div>
								</div>
							</div>

							<hr class="opacity-50" />
							<footer class="p-4 flex flex-col justify-center items-start gap-1">
								<div class="flex items-center">
									<img
										src={paper.mainAuthor.profilePictureUrl}
										alt="Author"
										class="w-8 h-8 rounded-full mr-2"
									/>
									<span>{paper.mainAuthor.firstName} {paper.mainAuthor.lastName}</span>
								</div>
								<span class="text-gray-600">Price: US$ {paper.price}</span>
								<!-- <span>Number of reviewers required: {paper.reviewernumb}</span> -->
								<span>Number of pages: {1}</span>
							</footer>
						</div>
					</a>
					{/each}
				</div>
			</div>
		</section>
	</div>
</div>
