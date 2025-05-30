import { useRef, ChangeEvent } from "react"
import { Textarea } from "./ui/textarea"

type Props = {
	value: string
	onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>

export default function AutoGrowTextarea({ value, onChange, ...props }: Props) {
	const ref = useRef<HTMLTextAreaElement>(null)

	const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
		if (!ref.current) return
		ref.current.style.height = "auto"
		ref.current.style.height = Math.min(ref.current.scrollHeight, 200) + "px"
		onChange(e)
	}

	return (
		<Textarea
			ref={ref}
			value={value}
			onChange={handleInput}
			{...props}
		/>
	)
}
