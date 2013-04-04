define(['../vendors/state-machine.js'], function(StateMachine) {

	function Node() {
		this.children = [];
		this.items = [];
		this.init();
	}

	Node.prototype = {};

	Node.prototype.addItem = function(item) {

	};

	Node.prototype.addChildren = function() {};

	Node.prototype.merge = function() {};

	Node.prototype.split = function() {};

	StateMachine.create({
		target: Node.prototype,
		events: [
			{name: 'init', from: 'none', to: 'waiting'},
			{name: 'renderItem', from: 'waiting', to: 'item'},
			{name: 'split', from: 'waiting', to: 'parent'},
			{name: 'split', from: 'item', to: 'parent'},
			{name: 'merge', from: 'parent', to: 'item'}
		]
	});

	return Node;

});