export default function TileBoard({
  children,
}: {
  children: React.ReactNode;
}) {
	return (
		<div
			className="
				main--font-size
				color--b6b6b6
				d-flex
				ai-center
				fd-column
			"	
		>
			<div 
				className="
					result-board
				"
			>

				{children}

			</div>
		</div> 
	);
}
