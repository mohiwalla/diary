import { useRef, ChangeEvent } from "react"
import { Textarea as BaseTextarea } from "./ui/textarea"

type Props = {
	value: string
	onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>

export default function Textarea({ value, onChange, ...props }: Props) {
	const ref = useRef<HTMLTextAreaElement>(null)

	const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
		if (!ref.current) return
		ref.current.style.height = "auto"
		ref.current.style.height =
			Math.min(ref.current.scrollHeight, 200) + "px"
		onChange(e)
	}

	return (
		<BaseTextarea
			ref={ref}
			value={value}
			onChange={handleInput}
			{...props}
		/>
	)
}
