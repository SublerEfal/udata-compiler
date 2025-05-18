import udata from "../../core/udata";

let modIndex = 0;
udata.addModification((event) => {
	event.udata_index = modIndex++;
});
