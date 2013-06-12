define("lib/module",[],function(){function e(e,t){if(!e)throw new TypeError("Module definition requires a name");this.name=e;for(var n in t)t.hasOwnProperty(n)&&(this[n]=t[n])}return e}),function(){var e="backbone";define("lib/socketCollection",[e],function(e){var t=e.Collection.extend({initSocketListeners:function(){if(!this.socketEvents)return;var e=this;_.each(this.socketEvents,function(t,n,r){if(typeof e[t]!="function")throw new TypeError("socketEvents needs to hold list of strings of function names");e.socket.on(n,_.bind(e[t],e))})}});return t})}(),function(){define("collections/latestBoardCollection",["lib/socketCollection"],function(e){var t=e.extend({initialize:function(e,t){this.socket=t,this.initSocketListeners()},socketEvents:{"board/add":"onBoardAdded"},onBoardAdded:function(e){this.add(e)}});return t})}(),function(){var e="backbone";define("views/latestBoardView",[e],function(e){var t=e.View.extend({tagName:"li",className:"board-item",initialize:function(){this.app=this.options.app,this.ui=this.options.ui},render:function(){var e=this.ui.templates.board.boardListItem({board:this.model.toJSON()});return this.$el.append(e),this.el}});return t})}(),function(){var e="backbone";define("views/latestBoardCollectionView",[e],function(e){var t=e.View.extend({el:'[data-module="latest-boards"]',events:{"click .newItems":"onInsertBoards"},initialize:function(e,t,n,r){this.app=e,this.ui=t,this.collection=n,this.itemView=r,this.newItems=[],this._=this.app.get("_"),this.initListeners(),window.latestBoards=this},initListeners:function(){this.collection.on("add",this._.bind(this.onBoardAdded,this))},onBoardAdded:function(e,t,n){this.bufferNewBoardView(e),this.updateNewBoardCounter()},bufferNewBoardView:function(e){var t=new this.itemView({model:e,app:this.app,ui:this.ui});this.newItems.push(t.render())},updateNewBoardCounter:function(){var e,t,n;t=this.$el.find(".newItems"),n=t.find("span"),e=parseInt(n.text(),10),e+=1,n.text(e),t.removeClass("hide")},resetNewBoardCounter:function(){var e=this.$el.find(".newItems");e.find("span").text(0),e.addClass("hide")},onInsertBoards:function(){this.ui.$(this.newItems).prependTo(".latest-boards").css({opacity:0}).fadeTo(250,1),this.newItems=[],this.resetNewBoardCounter()}});return t})}(),function(){define("modules/latest-boards",["lib/module","collections/latestBoardCollection","views/latestBoardView","views/latestBoardCollectionView"],function(e,t,n,r){var i=new e("latest-boards",{init:function(e,i){this.boards=new t([],e.get("socket")),this.boardCollectionView=new r(e,i,this.boards,n)}});return i})}();