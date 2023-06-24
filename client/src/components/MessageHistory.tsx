import { useRef, useEffect, memo } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import uuid from 'react-uuid'

const MessageHistory = ({ messages }: any) => {
	const { auth }: any = useAuthContext()
	const latestMessageRef = useRef<HTMLDivElement>(null!)

	/* scroll to the latest message (bottom) */
	useEffect(() => {
		latestMessageRef?.current?.scrollIntoView({
			behavior: 'smooth'
		})
	}, [messages])

	return (
		<div className="absolute top-0 bg-gray-50 px-2 h-[65vh] md:h-[70vh] w-full overflow-y-auto">
			{messages?.length > 0 &&
				messages.map((message: any, ref: any) => (
					<article
						key={uuid()}
						className={`flex mb-1
		            ${
									message.sender === auth.user.name
										? 'text-right justify-end'
										: 'text-left justify-start'
								}
		            `}
					>
						<div
							className={
								message.fileType === 'image/jpeg'
									? 'min-w-[10%] max-w-[80%] max-h-[30%] lg:max-w-[30%] lg:max-h-[30%]'
									: 'min-w-[10%] max-w-[40%]'
							}
						>
							<div
								className={`break-words rounded-2xl my-1 px-2
		                ${
											message.sender === auth.user.name
												? 'py-2 text-right  bg-violet-200'
												: 'py-2 text-left bg-gray-100'
										}
		                `}
							>
								<div className="px-2 py-1 font-bold text-sm">
									{message.sender === auth.user.name ? 'You' : message.sender}
								</div>

								{message.fileType === 'image/jpeg' ? (
									<img
										className="max-w-[100%] max-h-[40%] rounded-lg"
										src={`http://192.168.1.10:8000/${message.message}`}
										alt={message.message}
									/>
								) : (
									<div className="p-1 text-sm">{message.message}</div>
								)}
							</div>
							<div ref={latestMessageRef}></div>
						</div>
					</article>
				))}
		</div>
	)
}

export default memo(MessageHistory)
