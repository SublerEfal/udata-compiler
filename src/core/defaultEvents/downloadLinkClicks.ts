import udata from "../udata";

export default function udataEvent_downloadLinkClicks() {
	window.addEventListener("click", function () {
		udata.push({
			event_name: "download link click",
		});
	});
}
