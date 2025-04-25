import type { Chapter } from "../types/chapter.ts";

//This function can be adjusted depending on whether it receives a URL to a file or a URL to an API that returns the data
export async function fetchChapters(url: string): Promise<Chapter[] | { error: string }> {
	try {
		const response = await fetch(url);

		if (!response.ok) {
			throw new Error(`HTTP Fehler: ${response.status} - ${response.statusText}`);
		}

		const xmlText = await response.text();
		const parser = new DOMParser();
		const xmlDoc = parser.parseFromString(xmlText, "text/xml");

		const eventStream = xmlDoc.querySelector('EventStream[value="chapters"]');
		if (!eventStream) {
			throw new Error('Kein <EventStream> mit value="chapters" gefunden.');
		}

		const eventElements = eventStream.querySelectorAll("Event");

		const parsed: Chapter[] = Array.from(eventElements).map((event, index) => {
			const startTime = parseInt(event.getAttribute("presentationTime") || "0");
			return {
				id: index + 1,
				title: event.getAttribute("title") || "Untitled",
				start: startTime / 1000,
				end: startTime / 1000 + 10, // Standarddauer von 10 Sekunden
			};
		});

		return parsed;
	} catch (error: any) {
		console.error("Fehler beim Abrufen oder Parsen der XML-Datei:", error);
		return { error: error.message || "Unbekannter Fehler beim Parsen" };
	}
}
