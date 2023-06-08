const Login = () => {
  return (
    <div className="bg-violet-700 rounded-lg m-4 p-4 text-yellow-200 md:w-1/2 lg:w-1/3">
      <h1 className="text-4xl font-bold">Tokativ</h1>
      <form>
        <div className="px-4 py-2">
          <label className="w-full" htmlFor="email">
            Email
          </label>
          <input className="h-10 rounded w-full" type="text" name="email" id="email" />
        </div>
        <div className="px-4 py-2">
          <label className="w-full" htmlFor="password">
            Password
          </label>
          <input className="h-10 rounded w-full" type="password" name="password" id="password" />
        </div>
        <div className="p-4">
          <button
            className="p-2 rounded text-violet-800 uppercase font-medium bg-yellow-400 hover:text-violet-900 hover:bg-yellow-300 w-full"
            type="button"
          >
            Log in
          </button>
        </div>
      </form>
      <p className="p-4">Don't have an account? Register Here.</p>
    </div>
  )
}

export default Login
