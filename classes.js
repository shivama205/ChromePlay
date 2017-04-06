// ListItem class: Base class
function ListItem() {
	this.btn = document.createElement("button");;
	this.name = document.createElement("label");;
};

ListItem.prototype.getListBtn = function() {
	return this.btn;
};

ListItem.prototype.getListName = function() {
	return this.name;
};

// PlaylistItem Class: Inherits ListItem class
function PlayListItem() {
	ListItem.call(this);
	this.type = "PlayList";
}

PlayListItem.prototype.getType = function() {
	return this.type;
}

PlayListItem.prototype = Object.create(ListItem.prototype);
PlayListItem.prototype.constructor = PlayListItem;


