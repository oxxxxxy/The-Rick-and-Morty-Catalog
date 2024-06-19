<script lang="ts">

	import TextInputOption from '$comps/svelte/customForm/TextInputOption.svelte';

</script>

<div class="margin-10 w-100 d-flex jc-center">
  <div
    class="search--width d-flex jc-space-between fd-column"
    title="characters"
  >

		<TextInputOption />
		<TextInputOption />
		<TextInputOption />

    <div class="filter-select-box d-flex jc-center ai-center">
      <div
        class="select-list-box select-list-box--statusGender"
        style="overflow: hidden; /*visible*/"
      >
        <div class="select-list bg-color--282828 d-flex fd-column">
          <a class="select-list-option selected-select-list-option"> Status</a>
          <a class="select-list-option"> alive</a>
          <a class="select-list-option"> dead</a>
          <a class="select-list-option"> unknown</a>
        </div>
        <div class="d-flex ai-center jc-center color--282828 select-list-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
            style="--darkreader-inline-fill: currentColor"
            data-darkreader-inline-fill=""
          >
            <path
              d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"
            ></path>
          </svg>
        </div>
      </div>

      <div
        class="show-if-desktop-size"
        style="margin-left: 5px; height: 100%"
      ></div>

      <div
        class="select-list-box select-list-box--statusGender"
        style="overflow: hidden; /*visible*/"
      >
        <div class="select-list bg-color--282828 d-flex fd-column">
          <a class="select-list-option selected-select-list-option"> Gender</a>
          <a class="select-list-option"> male</a>
          <a class="select-list-option"> female</a>
          <a class="select-list-option"> genderless or unknown</a>
          <a class="select-list-option"> unknown</a>
        </div>
        <div class="d-flex ai-center jc-center color--282828 select-list-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
            style="--darkreader-inline-fill: currentColor"
            data-darkreader-inline-fill=""
          >
            <path
              d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"
            ></path>
          </svg>
        </div>
      </div>
    </div>
    <button
      class="filter-button color--b6b6b6 bg-color--181a1b tt-uppercase button--has-some"
    >
      Apply
    </button>
  </div>
</div>
