import udata from "../../core/udata";

interface LogListenerOptions {
	double?: boolean;
}

let options: LogListenerOptions = {};

export function configureLogListener(newOptions: LogListenerOptions = {}): void {
	options = Object.assign(options, newOptions);
}

udata.addListener((event) => {
	console.log("EVENT: " + JSON.stringify(event));
	if (options.double) {
		console.log("EVENT AGAIN: " + JSON.stringify(event));
	}
});
