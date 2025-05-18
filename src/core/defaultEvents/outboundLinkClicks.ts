import udata from "../udata";

export default function udataEvent_outboundLinkClicks(options?: { hostnames?: string[] }) {
	window.addEventListener("click", function () {
		udata.push({
			event_name: "outbound link click",
			possible_hostnames: options?.hostnames,
		});
	});
}
