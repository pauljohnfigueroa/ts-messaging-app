import axios from '../api/axios'

const Navigation = () => {
	const logout = async () => {
		try {
			await axios.get('/logout', {
				withCredentials: true
			})
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<nav className="px-2 py-4 ">
			<div className="flex justify-between">
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
						<button type="submit" className="button text-white bg-yellow-500 hover:bg-yellow-400">
							Search
						</button>
					</div>
				</form>
				<div>
					<button onClick={logout} className="button text-white bg-violet-500 hover:bg-violet-400">
						Log out
					</button>
				</div>
			</div>
		</nav>
	)
}

export default Navigation
