import Textarea from "@/components/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { formatDateTime } from "@/lib/utils"
import { ArrowUp, Edit, Trash } from "lucide-react"
import { FormEvent, useEffect, useState } from "react"
import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuTrigger,
} from "@/components/ui/context-menu"

export default function HomePage() {
	const [text, setText] = useState("")
	const [messages, setMessages] = useState<
		{
			text: string
			time: number
		}[]
	>([])

	useEffect(() => {
		window.scrollBy({
			behavior: "smooth",
			top: document.body.scrollHeight,
		})
	}, [messages])

	useEffect(() => {
		window.addEventListener("keydown", handleKeydown)

		function handleKeydown(e: KeyboardEvent) {
			const input = document.getElementById("textarea")
			const activeElement = document.activeElement

			if (activeElement === input && e.key === "Escape") {
				input?.blur()
				return
			}

			if (e.shiftKey && e.key === "Escape") {
				e.preventDefault()
				input?.focus()
				return
			}
		}

		return () => window.removeEventListener("keydown", handleKeydown)
	}, [])

	async function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault()

		if (!text) {
			return
		}

		// const form = e.currentTarget
		// const body = new FormData(form)

		setText("")
		const input = document.getElementById("textarea") as HTMLTextAreaElement
		input.style.height = "auto"

		setMessages([
			...messages,
			{
				text,
				time: Date.now(),
			},
		])
	}

	return (
		<main className="min-h-[calc(100svh-69px)] container mx-auto grid px-8 md:gap-24 gap-20 pt-[75px]">
			<div className="flex flex-col justify-center">
				<div className="grow pt-2 pb-28 flex flex-col gap-4 w-xl mx-auto">
					{messages.map((message, i) => (
						<ContextMenu key={i} onOpenChange={console.log}>
							<ContextMenuTrigger>
								<div className="flex flex-col gap-0.5">
									<small className="text-muted-foreground text-xs px-1 flex justify-between select-none">
										<span>
											{formatDateTime(message.time).date}
										</span>
										<span>
											{formatDateTime(message.time).time}
										</span>
									</small>

									<Card className="bg-secondary/20 py-2.5 rounded-lg text-sm relative">
										<CardContent className="px-4 whitespace-pre-wrap break-words">
											{message.text}
										</CardContent>
									</Card>
								</div>
							</ContextMenuTrigger>

							<ContextMenuContent loop>
								<ContextMenuItem>
									<Edit className="text-primary" />
									<span>Edit</span>
								</ContextMenuItem>

								<ContextMenuItem className="focus:text-destructive group">
									<Trash className="group-focus:text-destructive" />
									<span>Delete</span>
								</ContextMenuItem>
							</ContextMenuContent>
						</ContextMenu>
					))}
				</div>

				<form
					autoComplete="off"
					className="w-xl bg-background mx-auto translate-y-8 focus-within:translate-y-0 transition-all duration-300 py-4 fixed bottom-0 left-1/2 -translate-x-1/2"
					onSubmit={(e) => handleSubmit(e)}
				>
					<div className="relative">
						<Textarea
							autoFocus
							name="text"
							value={text}
							id="textarea"
							className="min-h-16 resize-none placeholder:text-muted-foreground rounded-lg pr-[44px]"
							placeholder="WTF is on your mind?"
							onChange={(e) => setText(e.target.value)}
							onKeyDown={(e) => {
								if (e.key === "Enter" && !e.shiftKey) {
									e.preventDefault()

									const form = document.querySelector("form")
									form?.requestSubmit()
								}
							}}
						/>

						<Button
							size="icon"
							className="absolute top-2 right-2 size-8"
							disabled={!text}
						>
							<ArrowUp
								className="shrink-0 size-[18px]"
								strokeWidth={2.5}
							/>
						</Button>
					</div>
				</form>
			</div>
		</main>
	)
}
