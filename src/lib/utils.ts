import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { API_ENDPOINT } from "./config"
import { BaseResponse } from "@/types/response"

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export async function fetchAPI<T>(
	url: string,
	config: RequestInit = {}
): Promise<T & BaseResponse> {
	config.credentials = "include"
	config.headers = {
		"Content-Type": "application/json",
		...(config.headers || {}),
	}

	try {
		const req = await fetch(API_ENDPOINT + url, config)
		const contentType = req.headers.get("content-type") || ""
		const isJSON = contentType.toLowerCase().includes("application/json")

		const res = await req.json()
		await new Promise((res) => setTimeout(res, 5e2))

		if (!isJSON) {
			throw new Error("Server responded non-JSON.")
		}

		return { ok: res.ok, text: "", ...res } as T & BaseResponse
	} catch (e) {
		console.error(e)

		return {
			ok: false,
			text: "Something went wrong.",
		} as T & BaseResponse
	}
}

export function formatDateTime(date: number | string) {
	const d = new Date(date)

	const day = d.getDate()
	const ordinal = (n: number) =>
		n +
		(["th", "st", "nd", "rd"][((n % 100 >> 3) ^ 1 && n % 10) || 0] || "th")

	const month = d.toLocaleString("en-US", { month: "short" }).toUpperCase()
	const year = d.getFullYear()

	let hours = d.getHours()
	const minutes = d.getMinutes().toString().padStart(2, "0")
	const ampm = hours >= 12 ? "pm" : "am"
	hours = hours % 12 || 12

	return {
		date: `${ordinal(day)} ${month}, ${year}`,
		time: `${hours.toString().padStart(2, "0")}:${minutes} ${ampm}`,
	}
}
