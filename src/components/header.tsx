import { Button } from "./ui/button"
import { Github } from "lucide-react"
import { Link } from "react-router-dom"
import Logo from "./logo"

export default function Header() {
	return (
		<header className="sticky top-0 z-50 w-full border-b border-white/5 backdrop-blur">
			<nav>
				<div className="container py-4 px-8 mx-auto flex flex-wrap items-center justify-between">
					<Link to="/">
						<Logo />
					</Link>

					<div className="flex gap-3 items-center">
						<Button asChild>
							<a
								target="_blank"
								className="flex"
								href="https://github.com/mohiwalla/diary"
							>
								<Github/>
								Source
							</a>
						</Button>
					</div>
				</div>
			</nav>
		</header>
	)
}
