<script lang="ts">
	import type { DocsShellSettings } from '$lib/layouts/DocsShell/types';
	import { CodeBlock } from '@skeletonlabs/skeleton';

	// Props
	export let pageData: DocsShellSettings;

	// Classes
	const cHeader = 'space-y-10';
	const cChip = 'chip variant-soft hover:variant-filled';

	// Local
	const githubBranch = 'master'; // IMPORTANT: for testing only, keep as 'master'
	const githubFeatureSourcePath = `https://github.com/skeletonlabs/skeleton/blob/${githubBranch}`;
	const githubPageSourcePath = `https://github.com/skeletonlabs/skeleton/blob/${githubBranch}/sites/skeleton.dev/src`;

	function formatImportSnippet(): string {
		let snippet = ``;
		if (pageData.imports?.length) {
			snippet += `import { ${pageData.imports?.join(', ')} } from '${pageData.package?.name}';`;
		}
		if (pageData.types?.length) {
			snippet += `\nimport type { ${pageData.types?.join(', ')} } from '${pageData.package?.name}';`;
		}
		return snippet;
	}

	// Reactive
	$: classesHeader = `${cHeader}`;
</script>

<header class="doc-shell-header {classesHeader}">
	<section class="space-y-4">
		<span class="badge variant-soft translate-y-1">{@html pageData.feature}</span>
		<h1 class="h1">{pageData.name}</h1>
		<p>{@html pageData.description}</p>
	</section>
	<!-- Imports & Types -->
	{#if pageData.imports?.length || pageData.types?.length}
		<CodeBlock language="ts" code={formatImportSnippet()} />
	{/if}
	<!-- Element Style Tree -->
	<!-- {#if pageData.feature === 'Tailwind' && pageData.stylesheetIncludes?.length}
		(target only Tailwind Element pages)
	{/if} -->
	<!-- Metadata Chips -->
	<section class="flex flex-wrap gap-2">
		<!-- Package -->
		<!-- {#if pageData.source}
			<a class={cChip} href={pageData.package?.url} target="_blank" rel="noreferrer">
				<i class="fa-brands fa-npm text-[16px]" />
				<span>{pageData.package?.name}</span>
			</a>
		{/if} -->
		<!-- Source -->
		{#if pageData.source}
			<a class={cChip} href={`${githubFeatureSourcePath}/${pageData.source}`} target="_blank" rel="noreferrer">
				<i class="fa-brands fa-github text-[16px]"></i>
				<span>Source</span>
			</a>
		{/if}
		<!-- Doc Source -->
		{#if pageData.docsPath}
			<a class={cChip} href={`${githubPageSourcePath}/routes/(inner)${pageData.docsPath}/+page.svelte`} target="_blank" rel="noreferrer">
				<i class="fa-solid fa-code"></i>
				<span>Page Source</span>
			</a>
		{/if}
		<!-- WAI-ARIA -->
		{#if pageData.aria}
			<a class={cChip} href={pageData.aria} target="_blank" rel="noreferrer">
				<i class="fa-solid fa-universal-access text-[16px]"></i>
				<span>WAI-ARIA</span>
			</a>
		{/if}
		<!-- Transitions -->
		{#if pageData.transitionIn || pageData.transitionOut}
			<a class={cChip} href="/docs/transitions" title={`In: ${pageData.transitionIn}, Out: ${pageData.transitionOut}`}>
				<i class="fa-solid fa-right-left text-[16px]"></i>
				<span>Transitions</span>
			</a>
		{/if}
		<!-- Dependencies -->
		{#if pageData.dependencies?.length}
			{#each pageData.dependencies as d}
				<a class={cChip} href={d.url} target="_blank" rel="noreferrer" title="Required Dependency">
					<i class="fa-solid fa-down-left-and-up-right-to-center text-[16px]"></i>
					<span>{d.label}</span>
				</a>
			{/each}
		{/if}
	</section>
</header>