import FadeUp from "@/animations/fade-up"
import AutoGrowTextarea from "@/components/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { formatDateTime } from "@/lib/utils"
import { ArrowUp } from "lucide-react"
import { FormEvent, useEffect, useState } from "react"

export default function HomePage() {
	const [text, setText] = useState("")
	const [messages, setMessages] = useState<
		{
			text: string
			time: number
		}[]
	>([{
		text: "Just forget about her bro 😕🙏",
		time: 1748575790703
	}])

	useEffect(() => {
		window.addEventListener("keydown", handleKeydown)

		function handleKeydown(e: KeyboardEvent) {
			const input = document.getElementById("textarea")
			const activeElement = document.activeElement

			if (activeElement === input && e.key === "Escape") {
				input?.blur()
				return
			}

			if (
				activeElement !== input &&
				!e.ctrlKey &&
				!e.metaKey &&
				!e.altKey &&
				e.key !== "Escape"
			) {
				input?.focus()
			}
		}

		return () => window.removeEventListener("keydown", handleKeydown)
	}, [])

	async function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault()

		const form = e.currentTarget
		// const body = new FormData(form)

		setText("")
		form.reset()
		setMessages([
			...messages,
			{
				text,
				time: Date.now(),
			},
		])
	}

	return (
		<FadeUp>
			<main className="min-h-[calc(100svh-69px)] container mx-auto grid px-8 py-4 md:gap-24 gap-20">
				<div className="flex flex-col justify-center">
					<div className="grow py-4 flex flex-col gap-4 w-xl mx-auto">
						{messages.map((message, i) => (
							<div key={i} className="flex flex-col gap-0.5">
								<small className="text-muted-foreground text-xs px-1 flex justify-between">
									<span>{formatDateTime(message.time).date}</span>
									<span>{formatDateTime(message.time).time}</span>
								</small>

								<Card className="bg-secondary/20 py-2.5 rounded-lg text-sm relative">
									<CardContent className="px-4">
										{message.text}
									</CardContent>
								</Card>
							</div>
						))}
					</div>

					<form
						autoComplete="off"
						className="w-xl mx-auto translate-y-8 focus-within:translate-y-0 transition-all duration-300 pt-4"
						onSubmit={(e) => handleSubmit(e)}
					>
						<div className="relative">
							<AutoGrowTextarea
								autoFocus
								required
								name="text"
								value={text}
								id="textarea"
								className="resize-none placeholder:text-muted-foreground rounded-lg"
								placeholder="What's on your mind?"
								onChange={(e) => setText(e.target.value)}
								onKeyDown={(e) => {
									if (e.key === "Enter" && !e.shiftKey) {
										e.preventDefault()

										const form =
											document.querySelector("form")
										form?.requestSubmit()
									}
								}}
							/>

							<Button
								size="icon"
								className="absolute top-2 right-2"
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
		</FadeUp>
	)
}
