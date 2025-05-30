import { cn } from "@/lib/utils"
import { Notebook } from "lucide-react"

export default function Logo({
	className = "",
	...props
}: React.HTMLAttributes<HTMLSpanElement>) {
	return (
		<span
			{...props}
			className={cn(
				"font-bold text-lg md:text-xl flex items-center gap-2.5",
				className
			)}
		>
			<Notebook className="size-[22px] text-cta" />
			<span>Diary</span>
		</span>
	)
}
