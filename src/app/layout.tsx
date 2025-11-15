import Router from "@/app/router"
import React from "react"
import ReactDOM from "react-dom/client"
import "@/app/global.css"
import { Toaster } from "sonner"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<div className="bg-black">
			<div className="bg-background w-screen h-screen rounded-lg">
				<Router />
			</div>
		</div>

		<Toaster theme="system" className="select-none" richColors />
	</React.StrictMode>
)
