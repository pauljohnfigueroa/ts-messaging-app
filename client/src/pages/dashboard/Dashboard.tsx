const Dashboard = () => {
  return (
    <div className="grid grid-cols-4 h-screen">
      <section className="col-span-4 md:col-span-1 bg-violet-700 w-full h-full">
        {/* Sidebar */}
        <h1 className="text-yellow-50 text-5xl font-bold px-2 py-4 tracking-wider">Tokativ</h1>
      </section>

      <main className="col-span-4 md:col-span-3 h-screen w-full">
        {/* Main */}
        <div className="bg-violet-900">
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
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
                  </svg>
                </div>
                <input
                  type="search"
                  id="default-search"
                  className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search ..."
                  required
                />
                <button
                  type="submit"
                  className="text-white bg-yellow-500 hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Search
                </button>
              </div>
            </form>
          </nav>
        </div>
        <div className="text-xl font-bold bg-gray-300 p-2 flex gap-2">
          <div className="relative">
            <img
              src="./assets/images/john-wick.jpg"
              className="w-10 h-10 p-1 rounded-full ring-2 ring-green-500 object-cover"
            />
            <span className="bottom-0 left-7 absolute  w-3.5 h-3.5 bg-green-400 border-2 border-white-500 dark:border-gray-800 rounded-full"></span>
          </div>
          <div>
            <p className="text-lg text-gray-800">John Wick</p>
            <p className="text-xs text-gray-500">john@gmail.com</p>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Dashboard
