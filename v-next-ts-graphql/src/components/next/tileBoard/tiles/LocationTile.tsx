import Link from 'next/link';


import type { GT } from '@tsC/api-graphql-to-ex';


import { genLocationTileData } from '@tsCF/pages/src/tileBoard/tiles/LocationTile.ts';




export default function LocationTile(
	{
		data
	}:{
		data: GT.LocationPreviewFieldsFragment
	}
){
	
	const gen = genLocationTileData(data);

	return (
		<div
			className="
				tile-box
				bg-color--181a1b
				d-flex
			"
			data-location-tile=""
		>
			<Link className="
					tile-info-box
					d-flex
					fd-column
					no-underline
				"
				title={gen.name}
		 	  href={gen.path}
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
					>Location:</span>
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
						no-underline
					"
				>
		 	   <span 
						className="
							tile-line
							font-weight--normal
						"
					>Type:</span>
		 	   <span
						className="
							color--f5f5f5
							tile-line
						"
		 	   >
					{ gen.type }
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
					Dimension:</span>
		 	   <span
						className="
							color--f5f5f5
							tile-line
						"
			    >
						{ gen.dimension }
			    </span>
				</span>
			</Link>
		</div>
	);
}
