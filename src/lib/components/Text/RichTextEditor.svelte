<script lang="ts">
  import { onMount } from 'svelte';
  import 'quill/dist/quill.snow.css';
  let editor: any;
  export let content = '';
  export let placeholder = 'Enter text...';

  onMount(async () => {
    const Quill = (await import('quill')).default;

    editor = new Quill('#editor', {
      theme: 'snow',
      placeholder,
      modules: {
        toolbar: [
          [{ 'header': [1, 2, false] }],
          ['bold', 'italic', 'underline'],
          [{ 'list': 'ordered'}, { 'list': 'bullet' }],
          ['link', 'blockquote', 'code-block'],
          [{ 'align': [] }],
          ['clean']
        ]
      }
    });

    editor.on('text-change', () => {
      content = editor.root.innerHTML;
    });

    if (content) {
      editor.root.innerHTML = content;
    }
  });
</script>

<div class="h-full border border-surface-300 rounded-lg mb-4">
  <div id="editor" class="min-h-[200px]"></div>
</div>