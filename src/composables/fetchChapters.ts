import type { Chapter } from "../types/chapter.ts";

//This function can be adjusted depending on whether it receives a URL to a file or a URL to an API that returns the data
export async function fetchChapters(url: string) {
	const response = await fetch(url);
	const xmlText = await response.text();

	const parser = new DOMParser();
	const xmlDoc = parser.parseFromString(xmlText, "text/xml");

	const eventStream = xmlDoc.querySelector('EventStream[value="chapters"]');
	if (!eventStream) return;

	const eventElements = eventStream.querySelectorAll("Event");
	const parsed = Array.from(eventElements).map((event, index) => ({
		id: index + 1,
		title: event.getAttribute("title") || "Untitled",
		start: parseInt(event.getAttribute("presentationTime") || "0") / 1000,
		end: parseInt(event.getAttribute("presentationTime") || "0") / 1000 + 10, // Assuming a default duration of 10 seconds
	}));

	return parsed as Chapter[];
}
