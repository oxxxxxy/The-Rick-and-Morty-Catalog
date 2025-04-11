'use client';
import Link from 'next/link';


import type { SearchItemNav_Path } from '@tsCF/pages/src/routes/SearchItemNav.ts';
import { searchNav } from '@tsCF/pages/src/routes/SearchItemNav.ts';




export default function SearchItemNav({
  children,
  pathName
}: {
  children?: React.ReactNode;
  pathName?: SearchItemNav_Path | string;
}) {
	
	let paths = searchNav.getPaths();

	if(pathName){
		paths = searchNav.setSelected(pathName).getPaths(); 
	}
		
	return(
		<div
			className="
				d-flex
				ai-center
				jc-center
				fd-column
				color--b6b6b6
				main--font-size
			"
		>
			<div
				className="
					d-flex
					jc-center
					margin-10
					w-100
				"
			>
				<div
					className="
						search--width
						d-flex
						ai-center
						jc-center
						fd-if-d-row-if-m-column
					"
				>
					<span
						className="
							search-word
						"
					>
						Search :
					</span>
					<div
						className="
							select-list-option-line
							d-flex
						"
					>
					{
						paths.map((path, i) => {
							return <Link
								className={`
									select-list-option
									underline
									${path.selected ? 'selected-select-list-option' : ''}
								`}
								title="Search {capitalizeWord(path.value)}"
								href={'/' + path.value}
								key={i}
							>
								{path.value}
							</Link>
						})
					}
					</div>
					<span
						className="
							search-word-dot
						"
					>
						.
					</span>
				</div>
			</div>
		
			{children}
		
		</div>
	);
}
