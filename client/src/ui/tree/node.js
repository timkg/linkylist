define([], function() {

	function Node(depth, parent) {
		this.depth = depth;
		this.children = [];
		this.getParent = (function() {
			return function() {
				return parent;
			};
		}());
	}

	Node.prototype = {};

	Node.prototype.split = function(parent) {
		var newDepth = this.depth + 1;
		var n1 = new Node(newDepth, this.parent);
		var n2 = new Node(newDepth, this.parent);
		// TODO - use Backbone collections?
		this.getParent().nodes.push(n1);
		this.getParent().nodes.push(n2);
		this.children.push(n1);
		this.children.push(n2);
	};

	return Node;

});


//define(['../../../vendors/state-machine.js'], function(StateMachine) {
//
//	function Node(parent) {
//		this.children = [];
//		this.items = [];
//		this.parent = parent;
//		this.init();
//	}
//
//	Node.prototype = {};
//
//	Node.prototype.getTree = function() {
//		if( this.tree ) return this.tree;
//		var t = this;
//		do {
//			t = t.parent;
//		} while ( t.parent );
//		this.tree = t;
//		return t;
//	};
//
//	Node.prototype.getRoot = function() {
//		// tree root should not be a visible property of a node
//		var self = this, r;
//		r = (function() {
//			if( r ) return r;
//			return self.getTree().root;
//		}());
//		return r;
//	};
//
//	Node.prototype.requestItem = function() {
//		console.log( this.getTree().queue.pop() );
//	};
//
//	Node.prototype.addChildren = function() {};
//
//	Node.prototype.merge = function() {};
//
//	Node.prototype.split = function() {};
//
//	StateMachine.create({
//		target: Node.prototype,
//		events: [
//			{name: 'init', from: 'none', to: 'waiting'},
//			{name: 'renderItem', from: 'waiting', to: 'item'},
//			{name: 'split', from: 'waiting', to: 'parent'},
//			{name: 'split', from: 'item', to: 'parent'},
//			{name: 'merge', from: 'parent', to: 'item'}
//		]
//	});
//
//	return Node;
//
//});