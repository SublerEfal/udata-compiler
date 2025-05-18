import udata from "../../../core/udata";

udata.addModification((event) => {
	event.page_path = window.location.pathname;
});
