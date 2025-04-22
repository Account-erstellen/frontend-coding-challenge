import type { TranscriptItem } from "../types/transcript";

export async function fetchTranscript(url: string) {
	const response = await fetch(url);
	const vttText = await response.text();

	// Regex zum Parsen von Timestamp-Blöcken
	const blockRegex = /(\d+)\s+(\d{2}:\d{2}:\d{2}\.\d{3}) --> (\d{2}:\d{2}:\d{2}\.\d{3})\s+([\s\S]*?)(?=\n\d+|\n*$)/gm;

	const parsed: TranscriptItem[] = [];
	let match;
	while ((match = blockRegex.exec(vttText)) !== null) {
		const [_, idStr, startStr, endStr, text] = match;
		parsed.push({
			id: parseInt(idStr),
			text: text.trim().replace(/\n/g, " "),
			start: parseTime(startStr),
			end: parseTime(endStr),
		});
	}

	// Hilfsfunktion: "hh:mm:ss.mmm" → Sekunden (float)
	function parseTime(timeStr: string): number {
		const [h, m, s] = timeStr.split(":");
		const [sec, ms] = s.split(".");
		return parseInt(h) * 3600 + parseInt(m) * 60 + parseInt(sec) + parseInt(ms) / 1000;
	}

	return parsed as TranscriptItem[];
}
