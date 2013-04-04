require.config({
	shim: {
		'StateMachine': 'StateMachine'
	}
});

require(['../src/tree'], function(Tree) {
	window.Tree = Tree;
});