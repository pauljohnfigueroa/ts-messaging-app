const Navigation = () => {
	return (
		<nav className="px-2 py-4">
			<form>
				<label
					htmlFor="default-search"
					className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
				>
					Search
				</label>
				<div className="relative flex gap-2">
					<div className="absolute inset-y-0 left-0 flex items-center pl-3 ">
						<svg
							aria-hidden="true"
							className="w-5 h-5 text-gray-500 dark:text-gray-400"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
							></path>
						</svg>
					</div>
					<input
						type="search"
						id="default-search"
						className="block p-2 pl-10 text-sm text-gray-900 rounded-full bg-gray-50"
						placeholder="Search ..."
						required
					/>
					<button
						type="submit"
						className="text-white bg-yellow-500 hover:bg-yellow-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-4 py-2"
					>
						Search
					</button>
				</div>
			</form>
		</nav>
	)
}

export default Navigation
