(function() {
	/**/
	"use strict";

	var mongoose = require('mongoose');
	var pagination = require('mongoose-pagination');
	var UserModel = require('../models/User').compileModel(); // used for .populate('_owner')
	var LinkModel = require('../models/Link').compileModel(); // used for .populate('_links')
	var io = require('../socketio').io;

	exports.compileModel = function () {

		if (mongoose.models.BoardModel) { return mongoose.models.BoardModel; }

		var boardFormat = {
			"subject": { type: String, required: true }
			, "_owner": { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
			, "_links": [{ type: mongoose.Schema.Types.ObjectId, ref: 'Link' }]
			, "date_added": Date
			, "date_modified": Date
		};

		var BoardSchema = mongoose.Schema(boardFormat);



		BoardSchema.pre('save', function(next) {
			this.date_modified = Date.now();
			next();
		});

		var BoardModel = mongoose.model('Board', BoardSchema);

		BoardModel.page = function(page, callback) {
			BoardModel
				.find({})
				.sort('-date_modified')
				.paginate(page, 10)
				.populate('_owner')
				.populate('_links')
				.exec(function(err, boards) {
					callback(err, boards);
				});
		};

		BoardModel.findOrCreate = function(query, callback) {
			BoardModel.findOne(query, function(err, board) {
				if (err) { callback(err, null); }
				if (board) {
					callback(null, board); // first arg is the error object
					return board;
				}
				if (!board) {
					if (!query._owner || !query.subject) {
						callback(new Error('boardModel.findOrCreate requires object literal with _owner(ID) and subject(String) as argument'), null);
					}
					BoardModel.create({
						_owner: query._owner
						, subject: query.subject
						, date_added: Date.now()
						, date_modified: Date.now()
					}, function(err, board) {
						if (err) {
							callback(err, null);
						}
						callback(null, board); // first arg is the error object
					});
				}
			});
		};

		io.sockets.on('connection', function(socket) {
			socket.on('board/add/link', function(params) {
				if (!params._id || !params.url) {
					throw new TypeError('socket.on("board/add/link") require object literal with _id and url properties');
				}
				var linkPromise = LinkModel.findOrCreate({url: params.url});
				linkPromise.onResolve(function(err, link) {
					if (err) {
						console.log(err);
						return;
					}
					BoardModel
						.findOne({_id: params._id})
						.exec(function(err, board) {
							if (err) { console.log(err); return; }
							if (board._links.indexOf(link._id) === -1) {
								board._links.push(link._id);
								board.save(function(err, board) {
									socket.emit('board/' + board._id, {'board/add/link': link});
								});
							} else {
								socket.emit('board/' + board._id, {'board/add/link': link, error: 'duplicate'});
							}
						});
				});
			});
		});

		mongoose.models.BoardModel = BoardModel;
		return BoardModel;
	};
} ());