<script lang="ts">
	// Types
	import type { DocsShellSettings } from '$lib/layouts/DocsShell/types';
	// Components
	import { Table } from '@skeletonlabs/skeleton';

	// Props
	export let pageData: DocsShellSettings;

	// Classes
	const cBase = 'space-y-10';

	// Local
	const source = {
		head: ['Keys', 'Description'],
		body: pageData.keyboard ?? []
	};

	// Reactive
	$: classesBase = `${cBase}`;
</script>

<div class="doc-shell-keyboard {classesBase}">
	<Table {source} />
</div>