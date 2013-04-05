require.config({
	shim: {
		'StateMachine': 'StateMachine'
	}
});

require(['../src/ui/tree/tree'], function(Tree) {
	window.Tree = Tree;
});