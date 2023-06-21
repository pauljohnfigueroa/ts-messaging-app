type GenericCardProp = {
	avatar: string
	name: string
	location: string
	about: string
	button: HTMLButtonElement
}

const GenericCard = ({ avatar, name, location, about, button }: GenericCardProp) => {
	return (
		<div className="grid grid-cols-12 m-4 gap-2">
			{/* Heading */}
			<h2 className="col-span-12 text-3xl font-bold text-violet-800">Users</h2>
			{/* User card */}
			<article className="col-span-12 md:col-span-4 max-h-[132px] bg-gray-100 rounded-2xl shadow-md p-1">
				<div className="flex">
					<div className="max-h-[130px] flex flex-col min-w-[30%] justify-center items-center">
						<img
							src="./assets/images/eric-clapton.jpg"
							className="w-20 h-20 p-1 rounded-full object-cover"
						/>
						<p className="max-h-[20%] max-w-[100%] p-1 text-xs text-violet-700 text-center truncate overflow-hidden">
							Billie Joe Armstrong Satriani
						</p>
					</div>
					<div className="flex flex-col p-2 max-w-[70%]">
						<div className="p-2 max-w-[100%]">
							<p className="text-sm leading-3 text-violet-800">About</p>
							<p className="mt-2 mb-1 text-xs leading-5  text-violet-900 truncate overflow-hidden">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit.
							</p>
						</div>
						<div className="flex relative p-2">
							<div className="flex text-xs text-violet-900">London, England</div>
							<div className="flex justify-center items-center p-2 rounded-full w-10 h-10 bg-violet-900 hover:bg-violet-700 absolute right-0 bottom-0 hover:cursor-pointer">
								<button type="button" className="text-3xl text-yellow-500 font-bold">
									+
								</button>
							</div>
						</div>
					</div>
				</div>
			</article>
		</div>
	)
}

export default GenericCard
