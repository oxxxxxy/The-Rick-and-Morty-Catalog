<script>
	import { logo, github_logo } from '$lib/images-entry.js';
</script>

<header class="
		header-homePapiGit
		bg-color--181a1b
	"
>
	<nav>

		<!-- home button/link/etc -->
		<a
			title="Home"
		  href="/"
		>
			<img src={logo} alt="the-rick-and-morty-logo" />
		</a>

		<div>
			<div 
				class="
					show-if-desktop-size 
					ai-center
				"
			>
	  	  <span
					class="
						headline
						shift-hyperlink
						color--b6b6b6
						tt-uppercase
					"
				>
				  <a
				    href="https://status.rickandmortyapi.com"
				    target="_blank"
				  >
							rickandmortyapi.com
				  </a>
					's server status
				</span>
				<span 
					class="
						server-status-icon
						server-status-icon_OK-fill 
					"
				></span>  <!-- else server-status-icon_ERR-fill-->
			</div>
			<div 
				class="
					show-if-mobile-size 
					ai-center
				"
			>
	  	  <span
					class="
						headline
						shift-hyperlink
						color--b6b6b6
						tt-uppercase
					"
				>
				  <a
				    href="https://status.rickandmortyapi.com"
				    target="_blank"
				  >
							server
				  </a>
				</span>
				<span 
					class="
						server-status-icon
						server-status-icon_OK-fill 
					" 
				></span>  <!-- else server-status-icon_ERR-fill-->
			</div>
		</div>

		<!-- button/link/etc on repo of that web client app -->
		<a
		  href="https://github.com/oxxxxxy/The-Rick-and-Morty-Catalog/v-svelte-js-axios"
		  title="GitHub"
		  aria-label="github"
		>
			<svg 
				class="
					header-icon 
					fill--b6b6b6
				"
				xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" height="30" width="30"
			>
			  <path
			    d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"
			  ></path>
			</svg>
		</a>
	</nav>
</header>
