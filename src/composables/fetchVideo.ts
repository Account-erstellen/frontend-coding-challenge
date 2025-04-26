const videoUrl = "https://mainline.i3s.unice.fr/mooc/elephants-dream-medium.webm"; //"https://ubiventlive-fra.s3.eu-central-1.amazonaws.com/cdn/live/S14JJ9Z6PKoO/bf1d4883-5305-4d65-a299-cbb654ef1ed9/video.webm";//
export async function fetchVideo(videoElement: HTMLVideoElement | null) {
	var videoError = false
	if (!videoElement) {
		console.warn("Video element is null");
		return;
	}
	try {
		const response = await fetch(videoUrl);
		if (!response.ok) {
			throw new Error(`HTTP error: ${response.status}`);
		}

		const blob = await response.blob();
		const videoBlobUrl = URL.createObjectURL(blob);
		videoElement.src = videoBlobUrl;
		return videoError = false
	} catch (error) {
		console.error("Fehler beim Laden des Videos:", error);
		videoError = true
		return videoError;
	}
}
