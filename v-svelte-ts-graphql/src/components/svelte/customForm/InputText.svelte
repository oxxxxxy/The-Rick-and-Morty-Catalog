<script lang="ts">
	import InputTextClearIcon from '$comps/svelte/customForm/icons/InputTextClearIcon.svelte';




	export let placeholder: string = 'Placeholder';
	export let value: string = '';
	export let warning: string = '';


	const clear = () => (
		value = '',
		warning = ''
	);
</script>

<div class="text-input-option d-flex w-100 fd-column"
>
	<div class="fd-row d-flex w-100">
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
			<InputTextClearIcon />
		</button>
  </div>

  {#if warning}
 	 <div class="text-input-option d-flex w-100">
			<span class="text-input-warning w-100">
				{warning}
			</span>
		</div>
	{/if}

</div>
