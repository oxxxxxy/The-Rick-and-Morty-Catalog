import type { GT } from '@tsC/api-graphql-to-ex';

import { 
	getCssClass_CharacterStatusIcon,
	genCharacterTileData
} from '@tsCF/pages/src/tileBoard/tiles/CharacterTile.ts';




export default function CharacterTile(
	{
		data
	}:{
		data: GT.CharacterPreviewFieldsFragment
	}
) {

	const cssClass_CharacterStatusIcon = getCssClass_CharacterStatusIcon(data.status);
	const gen = genCharacterTileData(data);

	return (
		<div
			className="
				tile-box
				bg-color--181a1b
				d-flex
			"
		>
			<div
				className="
					tile-img-box
				"
			>
		    <a
					title={gen.name}
		      href={gen.path}
		      rel="noopener noreferrer"
		    >
					<img className="tile-img-item" alt={gen.name} src={gen.image}/>
		    </a>
			</div>
			<div className="
					tile-info-box
					d-flex
					fd-column
				"
			>
		    <a
					className="
						color--f5f5f5
						tile-h
						tile-line
					"
					title={gen.name}
		      href={ gen.path }
		      rel="noopener noreferrer"
		    >
						{ gen.name }
		    </a>

		    <span 
					className="
						character-status
						tile-line
						font-weight--normal
					"
				>
					<span 
						className={`
							character-status__icon
							${ cssClass_CharacterStatusIcon }
						`}
					></span>
					{ gen.status } - { gen.species }
		    </span>

				<a
					className="
						tile-line-box
						no-underline
					"
					title={gen.location.path ? gen.location.name : gen.name}
					href={gen.location.path ? gen.location.path : gen.path}
			    rel="noopener noreferrer"
				>
		 	   <span 
						className="
							tile-line
							font-weight--normal
						"
					>Last known location:</span>
		 	   <span
						className="
							color--f5f5f5
							tile-line
							underline
						"
			    >
						{ gen.location.name }
		 	   </span>
				</a>

				<a
					className="
						tile-line-box
						no-underline
					"
					title={gen.origin.path ? gen.origin.name : gen.name}
					href={gen.origin.path ? gen.origin.path : gen.path}
			    rel="noopener noreferrer"
				>
		 	   <span 
						className="
							tile-line
							font-weight--normal
						"
					>
					Origin location:</span>
		 	   <span
						className="
							color--f5f5f5
							tile-line
							underline
						"
			    >
			    {gen.origin.name}
			    </span>
				</a>
			</div>
		</div>
	);
}
