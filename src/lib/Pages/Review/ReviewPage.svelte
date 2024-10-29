<script lang="ts">
	import ReviewDashboard from '$lib/ReviewDashboard.svelte';
	import MyPapers from '$lib/MyPapers.svelte';
	import { TabGroup, Tab } from '@skeletonlabs/skeleton';
	import Icon from '@iconify/svelte';

	let tabSet: number = 0;

	export let data;
	//export let tabs;
	//export let papers;
	 let tabs = data.tabs;
	 let papers = data.papersData;

	console.log('Review tabs', tabs);
	console.log('Review papers', papers);
</script>

<div class="container page p-4 m-auto">
	<div>
		<ReviewDashboard></ReviewDashboard>
	</div>
	<div class="text-xl font-bold mb-6">Your Activities</div>

	<TabGroup justify="justify-center">
		{#each tabs as tab, value}
			<Tab bind:group={tabSet} name="tab{value}" {value}>
				<div class="flex justify-center">
					<Icon icon={tab.icon} style="font-size: 2rem;" />
				</div>
				<span>{tab.name}</span>
			</Tab>
		{/each}
		<!-- Tab Panels --->
		<svelte:fragment slot="panel">
			<!-- <div class="grid gap-3 md:grid-cols-[1fr_auto_1fr]"> -->
			<div class="grid gap-3 w-full">
				{#each papers as papersData, i}
					{#if tabSet === i}
						<div class="card page p-4 m-auto">
							{#if tabs[i].name === 'Papers Pool'}
								<slot name="requested"></slot>
							{:else}
								<div class="text-surface-900">
									<MyPapers rota={tabs[i].rota} {papersData}></MyPapers>
								</div>
							{/if}
						</div>
					{/if}
				{/each}
			</div>
		</svelte:fragment>
	</TabGroup>
</div>
