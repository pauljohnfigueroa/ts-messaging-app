import { useAuthContext } from '../hooks/useAuthContext'
import uuid from 'react-uuid'

const MessageHistory = ({ messages }: any) => {
	const { auth }: any = useAuthContext()

	return (
		messages?.length > 0 &&
		messages.map((message: any) => (
			<article
				key={uuid()}
				className={`flex
		            ${
									message.sender === auth.user.name
										? 'text-right justify-end'
										: 'text-left justify-start'
								}
		            `}
			>
				<div
					className={`min-w-[10%] max-w-[40%] break-words rounded-2xl my-1 px-2
		                ${
											message.sender === auth.user.name
												? 'py-2 text-right bg-violet-200'
												: 'py-2 text-left bg-gray-100'
										}
		                `}
				>
					<div className="px-2 py-1 font-bold text-sm">
						{message.sender === auth.user.name ? 'You' : message.sender}
					</div>
					<div className="p-1 text-sm">
						{message.fileType === 'image/jpeg' ? (
							<img
								className="max-w-[200px] max-h-[200px] rounded-lg"
								src={`http://localhost:8000/${message.message}`}
								alt={message.message}
							/>
						) : (
							message.message
						)}
					</div>
				</div>
			</article>
		))
	)
}

export default MessageHistory
