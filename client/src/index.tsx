import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { AuthContextProvider } from './contexts/authContext'
import { SocketContextProvider } from './contexts/socketContext'
import { ActiveRoomsContextProvider } from './contexts/activeRoomsContext'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
	<React.StrictMode>
		<AuthContextProvider>
			<SocketContextProvider>
				<ActiveRoomsContextProvider>
					<App />
				</ActiveRoomsContextProvider>
			</SocketContextProvider>
		</AuthContextProvider>
	</React.StrictMode>
)
