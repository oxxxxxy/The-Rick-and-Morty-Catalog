import Link from 'next/link';


import type { GT } from '@tsC/api-graphql-to-ex';
	
import { 
	getCssClass_CharacterStatusIcon
} from '@tsCF/pages';


import EpisodeTile from '@/components/next/tileBoard/tiles/EpisodeTile';




export default function BigCharacterTile(
	{
		data
	}:{
		data: GT.CharacterFieldsFragment;
	}
){
	const cssClass_CharacterStatusIcon = getCssClass_CharacterStatusIcon(data.status);

	return (
		<>
			<div
				className="
					bg-color--181a1b
					d-flex
					big-tile-box
				"
			> 
				<div
					className="
						big-tile-img-box
					"
				>
					<img className="tile-img-item" alt={data.name} src={data.image}/>
				</div>
				<div
					className="
						big-tile-info-box
						d-flex
						fd-column
					"
				>
			    <span
						className="
							big-tile-h
							tile-line
						"
			    >
						Character card
			    </span>
					<span
						className="
							tile-line
						"
						style={{
							borderBottom: 'solid 3px var(--colorPalette-b6b6b6)',
							width: '100%'
						}}
					></span>
			    <span
						className="
							tile-line
							font-weight--normal
						"
			    >
						Name:
				    <span
							className="
								color--f5f5f5
							"
				    >
							{ data.name }
				    </span>
			    </span>
			
			    <span 
						className="
							tile-line
							font-weight--normal
						"
					>
						Gender:
				    <span 
							className="
								color--f5f5f5
							"
						>
							{ data.gender}
						</span>
			    </span>
			
					{
						(() => {
							if(data.type){
								return (
									<span 
										className="
											tile-line
											font-weight--normal
										"
									>
										Type:
					 			   <span 
											className="
												color--f5f5f5
											"
										>
											{ data.type }
										</span>
				  			  </span>
								);
							}
						})()
			    }
			
			    <span
						className="
							tile-line
							font-weight--normal
							character-status
							ai-center
						"
			    >
						Status:
				    <span 
							className="
								character-status
								color--f5f5f5
							"
						>
							<span 
								className={`
									character-status__big-icon
									${cssClass_CharacterStatusIcon}
								`}
							></span>
							{ data.status }
						</span>
			    </span>
			
			    <span 
						className="
							tile-line
							font-weight--normal
						"
					>
						Spieces:
				    <span 
							className="
								color--f5f5f5
							"
						>
							{ data.species }
						</span>
			    </span>
			
					{
						(() => {
							if (data.origin.id){
								return (
									<Link
										className="
											no-underline
											tile-line
												font-weight--normal
										"
								    href={ '/locations/' + data.origin.id }
								    rel="noopener noreferrer"
									>
								 	  <span 
											className="
												tile-line
												font-weight--normal
											"
										>Origin location:</span>
								 	  <span
											className="
												color--f5f5f5
												tile-line
												underline
											"
									   >
											{ data.origin.name }
								 	  </span>
									</Link>
								);
							}else{
								return (
									<a
										className="
											no-underline
											tile-line
											font-weight--normal
										"
									>
								 	  <span 
											className="
												tile-line
												font-weight--normal
											"
										>Origin location:</span>
								 	  <span
											className="
												color--f5f5f5
												tile-line
												underline
											"
									   >
											{ data.origin.name }
								 	  </span>
									</a>
								);
							}
						})()
					}
			
					{
						(() => {
							if (data.location.id){
								return (
									<Link
										className="
											no-underline
											tile-line
												font-weight--normal
										"
					 		 	  href={ '/locations/' + data.location.id }
					 		 	  rel="noopener noreferrer"
									>
			 		 		 		 <span 
												className="
													tile-line
													font-weight--normal
												"
											>
												Last known location:
											</span>
				 						  <span
												className="
													color--f5f5f5
													tile-line
													underline
												"
										   >
												{ data.location.name }
					 		 		  </span>
									</Link>
								)
							}else{
								return (
									<a
										className="
											no-underline
											tile-line
												font-weight--normal
										"
					 		 	  rel="noopener noreferrer"
									>
										<span 
												className="
													tile-line
													font-weight--normal
												"
											>
												Last known location:
											</span>
				 						  <span
												className="
													color--f5f5f5
													tile-line
													underline
												"
										   >
												{ data.location.name }
					 		 		  </span>
									</a>
								)
							}
						})()
					}
			
				</div>
			</div>
			<div
				className="
					big-result-board
					w-100
				"
				style={{
					marginTop: '10px',
					backgroundColor: 'var(--colorPalette-181a1b)'
				}}
			>
			
				<div
					className="
						d-flex
						w-100
						jc-center
						bg-color--181a1b
					"
					style={{
						marginBottom: '10px'
					}}
				>
					List of episodes in which this character appeared.
				</div>
			
					
				{
					data.episode.map((ep, i) => 
						<EpisodeTile data={ep} key={i}/>
					)
				}
			
			</div>
		</>
	);
}
