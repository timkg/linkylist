define(['./queue', './node'], function(Queue, Node) {

	function Tree() {
		this.queue = new Queue;
		this.root = new Node(this);
		this.depth = 1;
	}

	Tree.prototype = {};

	return Tree;

});