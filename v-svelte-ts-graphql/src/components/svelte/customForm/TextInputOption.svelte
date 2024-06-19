<script lang="ts">
	import TextInputClearIcon from '$comps/svelte/icons/TextInputClearIcon.svelte';




	export let placeholder = 'Placeholder';
	export let value = '';
	export let warning = 'Warning. Warning. Warning. Warning. Warning. Warning. Warning. Warning. Warning. Warning. Warning. Warning. Warning. Warning. Warning. Warning. Warning. Warning. Warning. Warning. Warning. Warning. Warning. Warning. Warning. Warning. Warning. Warning. ';

	const clear = () => (
		value = '',
		warning = ''
	);
</script>

<div class="d-flex w-100 fd-column"
	style="
	"
>
	<div class="text-input-option d-flex w-100">
  <div class="text-input-box">
    <div class="text-input-underline bg-color--282828"></div>
    <input
      class="text-input bg-color--b6b6b6 color--282828"
      type="text"
      placeholder="{placeholder}"
      bind:value={value}
    />
  </div>
  <button
    class="ai-center jc-center text-input-clear fill--999999 bg-color--181a1b
		{!value ? 'button--empty' : ''}
    "
    disabled="{!value}"
    on:click={clear}
  >
<TextInputClearIcon />
  </button>
  </div>
  <div class="text-input-option d-flex w-100">
  <span>{warning}</span>
</div>
</div>
