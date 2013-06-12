(function () {
var root = this, exports = {};

// The jade runtime:
var jade=function(exports){Array.isArray||(Array.isArray=function(arr){return"[object Array]"==Object.prototype.toString.call(arr)}),Object.keys||(Object.keys=function(obj){var arr=[];for(var key in obj)obj.hasOwnProperty(key)&&arr.push(key);return arr}),exports.merge=function merge(a,b){var ac=a["class"],bc=b["class"];if(ac||bc)ac=ac||[],bc=bc||[],Array.isArray(ac)||(ac=[ac]),Array.isArray(bc)||(bc=[bc]),ac=ac.filter(nulls),bc=bc.filter(nulls),a["class"]=ac.concat(bc).join(" ");for(var key in b)key!="class"&&(a[key]=b[key]);return a};function nulls(val){return val!=null}return exports.attrs=function attrs(obj,escaped){var buf=[],terse=obj.terse;delete obj.terse;var keys=Object.keys(obj),len=keys.length;if(len){buf.push("");for(var i=0;i<len;++i){var key=keys[i],val=obj[key];"boolean"==typeof val||null==val?val&&(terse?buf.push(key):buf.push(key+'="'+key+'"')):0==key.indexOf("data")&&"string"!=typeof val?buf.push(key+"='"+JSON.stringify(val)+"'"):"class"==key&&Array.isArray(val)?buf.push(key+'="'+exports.escape(val.join(" "))+'"'):escaped&&escaped[key]?buf.push(key+'="'+exports.escape(val)+'"'):buf.push(key+'="'+val+'"')}}return buf.join(" ")},exports.escape=function escape(html){return String(html).replace(/&(?!(\w+|\#\d+);)/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")},exports.rethrow=function rethrow(err,filename,lineno){if(!filename)throw err;var context=3,str=require("fs").readFileSync(filename,"utf8"),lines=str.split("\n"),start=Math.max(lineno-context,0),end=Math.min(lines.length,lineno+context),context=lines.slice(start,end).map(function(line,i){var curr=i+start+1;return(curr==lineno?"  > ":"    ")+curr+"| "+line}).join("\n");throw err.path=filename,err.message=(filename||"Jade")+":"+lineno+"\n"+context+"\n\n"+err.message,err},exports}({});

// create our folder objects
exports.board = {};
exports.link = {};
exports.user = {};

// boardListItem.jade compiled template
exports.board.boardListItem = function anonymous(locals) {
    var buf = [];
    with (locals || {}) {
        buf.push("<a" + jade.attrs({
            href: "/boards/show/" + board._id + ""
        }, {
            href: true
        }) + '><div class="content"><h3>' + jade.escape(null == (jade.interp = board.subject) ? "" : jade.interp) + "<small>, by " + ((jade.interp = board._owner.name) == null ? "" : jade.interp) + '</small></h3><div class="preview">');
        board._links = board._links.reverse();
        var count = 0;
        (function() {
            var $$obj = board._links;
            if ("number" == typeof $$obj.length) {
                for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
                    var link = $$obj[$index];
                    if (link && link.image && !link.image.error && count < 4) {
                        count += 1;
                        buf.push("<img" + jade.attrs({
                            src: cloudinary.url(link.image.public_id + "." + link.image.format, {
                                width: 180,
                                height: 150,
                                crop: "fill",
                                version: link.image.version
                            })
                        }, {
                            src: true
                        }) + "/>");
                    }
                }
            } else {
                var $$l = 0;
                for (var $index in $$obj) {
                    $$l++;
                    if ($$obj.hasOwnProperty($index)) {
                        var link = $$obj[$index];
                        if (link && link.image && !link.image.error && count < 4) {
                            count += 1;
                            buf.push("<img" + jade.attrs({
                                src: cloudinary.url(link.image.public_id + "." + link.image.format, {
                                    width: 180,
                                    height: 150,
                                    crop: "fill",
                                    version: link.image.version
                                })
                            }, {
                                src: true
                            }) + "/>");
                        }
                    }
                }
            }
        }).call(this);
        buf.push("</div></div></a>");
    }
    return buf.join("");
};

// creationForm.jade compiled template
exports.board.creationForm = function anonymous(locals) {
    var buf = [];
    with (locals || {}) {
        buf.push('<form action="/boards" method="POST"><input type="hidden" value="{!board.id}"/><div class="large-9 small-9 columns"><input type="text" name="subject" placeholder="what should this board be about?"/></div><div class="large-3 small-3 columns"><button type="submit" class="postfix">create</button></div></form>');
    }
    return buf.join("");
};

// linkAddForm.jade compiled template
exports.board.linkAddForm = function anonymous(locals) {
    var buf = [];
    with (locals || {}) {
        buf.push("<form" + jade.attrs({
            action: "/boards/" + board._id + "/links",
            method: "POST",
            "class": "addLinkToBoard" + " " + "clearfix"
        }, {
            action: true,
            method: true
        }) + '><div class="large-9 small-9 columns"><input type="text" name="url" placeholder="paste or write URL of link to add"/></div><div class="large-3 small-3 columns"><button type="submit" class="postfix">add</button></div></form>');
    }
    return buf.join("");
};

// article.jade compiled template
exports.link.article = function anonymous(locals) {
    var buf = [];
    with (locals || {}) {
        buf.push('<div class="content">');
        if (link.preview.content) {
            buf.push("" + ((jade.interp = link.preview.content) == null ? "" : jade.interp) + "");
        }
        buf.push("</div>");
    }
    return buf.join("");
};

// creationForm.jade compiled template
exports.link.creationForm = function anonymous(locals) {
    var buf = [];
    with (locals || {}) {
        buf.push('<form action="/links" method="POST"><div class="large-9 small-9 columns"><input type="text" name="url" placeholder="paste or write the URL"/></div><div class="large-3 small-3 columns"><button type="submit" class="postfix">go</button></div></form>');
    }
    return buf.join("");
};

// images.jade compiled template
exports.link.images = function anonymous(locals) {
    var buf = [];
    with (locals || {}) {
        buf.push('<div class="images">');
        if (link.preview.images && link.preview.images.length) {
            (function() {
                var $$obj = link.preview.images;
                if ("number" == typeof $$obj.length) {
                    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
                        var image = $$obj[$index];
                        buf.push("<img" + jade.attrs({
                            src: image.url
                        }, {
                            src: true
                        }) + "/>");
                    }
                } else {
                    var $$l = 0;
                    for (var $index in $$obj) {
                        $$l++;
                        if ($$obj.hasOwnProperty($index)) {
                            var image = $$obj[$index];
                            buf.push("<img" + jade.attrs({
                                src: image.url
                            }, {
                                src: true
                            }) + "/>");
                        }
                    }
                }
            }).call(this);
        }
        buf.push("</div>");
    }
    return buf.join("");
};

// linkBoardItem.jade compiled template
exports.link.linkBoardItem = function anonymous(locals) {
    var buf = [];
    with (locals || {}) {
        var tweets, media, images, content;
        tweets = link._tweets && link._tweets.length || null;
        media = link.preview && link.preview.media ? link.preview.media.type : null;
        images = link.preview && link.preview.images ? link.preview.images.length : null;
        content = link.preview && link.preview.content ? link.preview.content.length : null;
        var details = [];
        if (tweets) details.push("tweets");
        if (media) details.push("embedded media");
        if (images) details.push("images");
        if (content) details.push("article preview");
        var infoString = details.join(", ");
        var extraClasses = extraClasses || "";
        buf.push("<article" + jade.attrs({
            id: link._id,
            "data-json": "" + JSON.stringify(link) + "",
            "class": "link-item"
        }, {
            "class": true,
            id: true,
            "data-json": true
        }) + '><div class="content"><ul class="meta"><li class="meta-li"><a class="meta-link tweets text-hide">');
        if (tweets) {
            buf.push('<i class="meta-icon icon-twitter"></i>');
        } else {
            buf.push('<i class="meta-icon inactive icon-twitter"></i>');
        }
        buf.push('</a></li><li class="meta-li"><a class="meta-link media text-hide">');
        if (media) {
            buf.push('<i class="meta-icon icon-play"></i>');
        } else {
            buf.push('<i class="meta-icon inactive icon-play"></i>');
        }
        buf.push('</a></li><li class="meta-li"><a class="meta-link images text-hide">');
        if (images) {
            buf.push('<i class="meta-icon icon-images"></i>');
        } else {
            buf.push('<i class="meta-icon inactive icon-images"></i>');
        }
        buf.push('</a></li><li class="meta-li"><a class="meta-link content text-hide">');
        if (content) {
            buf.push('<i class="meta-icon icon-type"></i>');
        } else {
            buf.push('<i class="meta-icon inactive icon-type"></i>');
        }
        buf.push('</a></li></ul><div class="preview">');
        if (link.preview) {
            buf.push("<h4>");
            if (link.preview.favicon_url) {
                buf.push("<img" + jade.attrs({
                    src: link.preview.favicon_url
                }, {
                    src: true
                }) + "/>");
            }
            buf.push("<a" + jade.attrs({
                href: "" + link.url + ""
            }, {
                href: true
            }) + ">" + ((jade.interp = link.preview.title || link.preview.url) == null ? "" : jade.interp) + "</a></h4><p>" + ((jade.interp = link.preview.description) == null ? "" : jade.interp) + "</p>");
            if (link.preview.media) {
                buf.push('<div class="flex-video">' + ((jade.interp = link.preview.media.html) == null ? "" : jade.interp) + "</div>");
            }
        } else {
            buf.push("<h4>" + jade.escape(null == (jade.interp = link.url) ? "" : jade.interp) + "</h4><p>fetching preview, please wait</p>");
        }
        buf.push("</div><a" + jade.attrs({
            href: "/links/" + link._id + "",
            "class": "button" + " " + "secondary"
        }, {
            href: true
        }) + ">more info - " + jade.escape((jade.interp = infoString) == null ? "" : jade.interp) + "</a></div></article>");
    }
    return buf.join("");
};

// linkListItem.jade compiled template
exports.link.linkListItem = function anonymous(locals) {
    var buf = [];
    with (locals || {}) {
        buf.push("<li" + jade.attrs({
            id: link._id,
            "class": "link-item"
        }, {
            "class": true,
            id: true
        }) + ">");
        if (link.preview && link.preview.title) {
            buf.push("<a" + jade.attrs({
                href: "/links/" + link._id + ""
            }, {
                href: true
            }) + ">" + ((jade.interp = link.preview.title) == null ? "" : jade.interp) + "</a>");
        } else {
            buf.push("<a" + jade.attrs({
                href: "/links/" + link._id + ""
            }, {
                href: true
            }) + ">" + ((jade.interp = link.url) == null ? "" : jade.interp) + "</a>");
        }
        buf.push("</li>");
    }
    return buf.join("");
};

// media.jade compiled template
exports.link.media = function anonymous(locals) {
    var buf = [];
    with (locals || {}) {
        buf.push('<div class="media">');
        if (link.preview.media && link.preview.media.type) {
            buf.push("" + ((jade.interp = link.preview.media) == null ? "" : jade.interp) + "");
        }
        buf.push("</div>");
    }
    return buf.join("");
};

// meta.jade compiled template
exports.link.meta = function anonymous(locals) {
    var buf = [];
    with (locals || {}) {
        buf.push('<ul class="meta"><li class="meta-li"><a class="meta-link tweets text-hide">');
        if (tweets) {
            buf.push('<i class="meta-icon icon-twitter"></i>');
        } else {
            buf.push('<i class="meta-icon inactive icon-twitter"></i>');
        }
        buf.push('</a></li><li class="meta-li"><a class="meta-link media text-hide">');
        if (media) {
            buf.push('<i class="meta-icon icon-play"></i>');
        } else {
            buf.push('<i class="meta-icon inactive icon-play"></i>');
        }
        buf.push('</a></li><li class="meta-li"><a class="meta-link images text-hide">');
        if (images) {
            buf.push('<i class="meta-icon icon-images"></i>');
        } else {
            buf.push('<i class="meta-icon inactive icon-images"></i>');
        }
        buf.push('</a></li><li class="meta-li"><a class="meta-link content text-hide">');
        if (content) {
            buf.push('<i class="meta-icon icon-type"></i>');
        } else {
            buf.push('<i class="meta-icon inactive icon-type"></i>');
        }
        buf.push("</a></li></ul>");
    }
    return buf.join("");
};

// pagination.jade compiled template
exports.link.pagination = function anonymous(locals) {
    var buf = [];
    with (locals || {}) {
        buf.push('<div class="clear pagination"><a' + jade.attrs({
            href: data.prev_page
        }, {
            href: true
        }) + ">prev</a><a" + jade.attrs({
            href: data.next_page
        }, {
            href: true
        }) + ">next</a></div>");
    }
    return buf.join("");
};

// searchForm.jade compiled template
exports.link.searchForm = function anonymous(locals) {
    var buf = [];
    with (locals || {}) {
        buf.push('<form action="/search" method="GET"><div class="large-9 small-9 columns"><input type="text" name="q" placeholder="enter a keyword and search for links"/></div><div class="large-3 small-3 columns"><button type="submit" class="postfix">find</button></div></form>');
    }
    return buf.join("");
};

// tweet.jade compiled template
exports.link.tweet = function anonymous(locals) {
    var buf = [];
    with (locals || {}) {
        buf.push('<li class="tweet"><img' + jade.attrs({
            src: tweet.profile_image_url
        }, {
            src: true
        }) + "/><h5>" + jade.escape(null == (jade.interp = tweet.from_user_name) ? "" : jade.interp) + "</h5><p>" + jade.escape(null == (jade.interp = tweet.text) ? "" : jade.interp) + "</p></li>");
    }
    return buf.join("");
};

// tweets.jade compiled template
exports.link.tweets = function anonymous(locals) {
    var buf = [];
    with (locals || {}) {
        buf.push('<ul class="tweets">');
        (function() {
            var $$obj = link._tweets;
            if ("number" == typeof $$obj.length) {
                for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
                    var tweet = $$obj[$index];
                    buf.push('<li class="tweet"><img' + jade.attrs({
                        src: tweet.profile_image_url
                    }, {
                        src: true
                    }) + "/><h5>" + jade.escape(null == (jade.interp = tweet.from_user_name) ? "" : jade.interp) + "</h5><p>" + jade.escape(null == (jade.interp = tweet.text) ? "" : jade.interp) + "</p></li>");
                }
            } else {
                var $$l = 0;
                for (var $index in $$obj) {
                    $$l++;
                    if ($$obj.hasOwnProperty($index)) {
                        var tweet = $$obj[$index];
                        buf.push('<li class="tweet"><img' + jade.attrs({
                            src: tweet.profile_image_url
                        }, {
                            src: true
                        }) + "/><h5>" + jade.escape(null == (jade.interp = tweet.from_user_name) ? "" : jade.interp) + "</h5><p>" + jade.escape(null == (jade.interp = tweet.text) ? "" : jade.interp) + "</p></li>");
                    }
                }
            }
        }).call(this);
        buf.push("</ul>");
    }
    return buf.join("");
};


// attach to window or export with commonJS
if (typeof module !== "undefined") {
    module.exports = exports;
} else if (typeof define === "function" && define.amd) {
    define(exports);
} else {
    root.templatizer = exports;
}

})();