import type { GT } from '@tsC/api-graphql-to-ex';


import { genEpisodeTileData } from '@tsCF/pages/src/tileBoard/tiles/EpisodeTile.ts';




export default function EpisodeTile(
	{
		data
	}:{
		data: GT.EpisodePreviewFieldsFragment
	}
) {
	
	const gen = genEpisodeTileData(data);

	return (
		<div
			className="
				tile-box
				bg-color--181a1b
				d-flex
			"
		>
			<a className="
					tile-info-box
					d-flex
					fd-column
					no-underline
				"
				title={gen.name}
			  href={ gen.path }
			  rel="noopener noreferrer"
			>
				<span
					className="
						tile-line-box
						tile-h
					"
				>
		 	   <span 
						className="
							tile-line
							font-weight--normal
						"
					>Episode:</span>
					<span
						className="
							color--f5f5f5
							underline
						"
					>
						{ gen.name }
					</span>
				</span>
				<span
					className="
						tile-line-box
					"
				>
		 	   <span 
						className="
							tile-line
							font-weight--normal
						"
					>Air date:</span>
		 	   <span
						className="
							color--f5f5f5
							tile-line
						"
		 	   > 
					{ gen.air_date }
		 	   </span>
				</span>
				<span
					className="
						tile-line-box
					"
				>
		 	   <span 
						className="
							tile-line
							font-weight--normal
						"
					>
					Notation:</span>
		 	   <span
						className="
							color--f5f5f5
							tile-line
						"
			    >
						{ gen.episode }
			    </span>
				</span>
			</a> 
		</div>
	);
}
