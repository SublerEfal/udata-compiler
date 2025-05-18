const DEFAULT_WINDOW_VARIABLE_NAME = "udata";

export type UdataEventListener = (event: any) => void;
export type UdataModification = (event: any) => void;
export type UdataOptions = { globalVariableName?: string };

export default class UdataQueue {
	private udataArray: any[] = [];
	private events: any[] = [];
	private listeners: UdataEventListener[] = [];
	private modifications: UdataModification[] = [];
	private options: UdataOptions;
	private started: boolean = false;

	constructor() {
		this.options = {
			globalVariableName: DEFAULT_WINDOW_VARIABLE_NAME,
		};
	}

	config(options?: UdataOptions): void {
		if (this.started) throw new Error("Cannot configure udata after it was already started.");
		this.options.globalVariableName ??= DEFAULT_WINDOW_VARIABLE_NAME;
		this.options = Object.assign(this.options, options);
	}

	start(): void {
		if (this.started) {
			throw new Error("Udata was already started. Do not call the start() manually.");
		}
		this.started = true;
		const windowAny = window as any;
		this.udataArray = (windowAny[this.options.globalVariableName!] || []) as any[];
		windowAny[this.options.globalVariableName!] = this.udataArray;
		for (const event of this.udataArray) {
			this.onEventPushed(event);
		}
		const oldPush = this.udataArray.push;
		const self = this;
		this.udataArray.push = function () {
			const result = oldPush.apply(this, Array.from(arguments));
			for (const arg of arguments) {
				self.onEventPushed(arg);
			}
			return result;
		};
	}

	push(event: any): void {
		this.udataArray.push(event);
	}

	private onEventPushed(event: any): void {
		this.events.push(event);
		for (const listener of this.listeners) {
			this.executeModifications(event);
			listener(event);
		}
	}

	addListener(listener: UdataEventListener): void {
		this.listeners.push(listener);
		for (const event of this.events) {
			this.executeModifications(event);
			listener(event);
		}
	}

	private executeModifications(event: any): void {
		for (const modification of this.modifications) {
			modification(event);
		}
	}

	addModification(modification: UdataModification): void {
		this.modifications.push(modification);
	}
}
