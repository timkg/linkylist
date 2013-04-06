define(['client/src/core/queue', 'client/src/ui/tree/node'], function(Queue, Node) {

	// multiples of 2 in width and height
	function Tree(w, h) {
		if( w % 2 !== 0 || h % 2 !== 0 ) throw new Error('Tree w and h must be multiples of 2');
		this.nodes = [];
		this.depth = 0;
		this.root = new Node(0, this);
		this.nodes.push(this.root);
		this.maxElements = w * h;
		// create recursively breadth first
		this._currentDepth = 0;
		this._grow();
	}

	Tree.prototype = {};

	Tree.prototype._grow = function() {
		var growingNodes = this.getNodesAtDepth(this.currentDepth);
		for( var n = 0; n < growingNodes.length; n++ ) {
			n.split();
		}
		this._currentDepth += 1;
		console.log(this.nodes);
		if(this.nodes.length < this.maxElements) {
			this._grow();
		}
	};

	Tree.prototype.getNodesAtDepth = function(depth) {
		var nodes = [];
		for( var n = 0, len = this.nodes.length; n < len; n++ ) {
			if( this.nodes[n].depth === depth ) {
				nodes.push(this.nodes[n]);
			}
		}
		return nodes;
	};

	return Tree;

});