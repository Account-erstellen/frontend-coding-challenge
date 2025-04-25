import type { TranscriptItem } from "../types/transcript";

export async function fetchAndFormatTranscript(url: string): Promise<TranscriptItem[] | { error: string }> {
	try {
		const response = await fetch(url);

		if (!response.ok) {
			throw new Error(`HTTP Fehler: ${response.status} - ${response.statusText}`);
		}

		const vttText = await response.text();

		const blockRegex =
			/(\d+)\s+(\d{2}:\d{2}:\d{2}\.\d{3}) --> (\d{2}:\d{2}:\d{2}\.\d{3})\s+([\s\S]*?)(?=\n\d+|\n*$)/gm;

		const parsed: TranscriptItem[] = [];
		let match: RegExpExecArray | null;

		while ((match = blockRegex.exec(vttText)) !== null) {
			const [_, idStr, startStr, endStr, text] = match;
			parsed.push({
				id: parseInt(idStr),
				text: text.trim().replace(/\n/g, " "),
				start: parseTime(startStr),
				end: parseTime(endStr),
			});
		}

		return parsed;
	} catch (error: any) {
		console.error("Fehler beim Abrufen oder Parsen der VTT-Datei:", error);
		return { error: error.message || "Unbekannter Fehler beim Parsen" };
	}

	// Hilfsfunktion: "hh:mm:ss.mmm" → Sekunden
	function parseTime(timeStr: string): number {
		const [h, m, s] = timeStr.split(":");
		const [sec, ms] = s.split(".");
		return parseInt(h) * 3600 + parseInt(m) * 60 + parseInt(sec) + parseInt(ms) / 1000;
	}
}

export async function fetchTranscript(url: string): Promise<any[] | { error: string }> {
	try {
		const response = await fetch(url);

		if (!response.ok) {
			throw new Error(`HTTP Fehler: ${response.status} - ${response.statusText}`);
		}
		const data = await response.json();
		return Array.isArray(data) ? data : [];
	} catch (error: any) {
		console.error("Fehler beim Abrufen oder Parsen der VTT-Datei:", error);
		return { error: error.message || "Unbekannter Fehler beim Parsen" };
	}
}
