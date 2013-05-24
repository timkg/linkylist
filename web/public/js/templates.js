(function () {
var root = this, exports = {};

// The jade runtime:
var jade=function(exports){Array.isArray||(Array.isArray=function(arr){return"[object Array]"==Object.prototype.toString.call(arr)}),Object.keys||(Object.keys=function(obj){var arr=[];for(var key in obj)obj.hasOwnProperty(key)&&arr.push(key);return arr}),exports.merge=function merge(a,b){var ac=a["class"],bc=b["class"];if(ac||bc)ac=ac||[],bc=bc||[],Array.isArray(ac)||(ac=[ac]),Array.isArray(bc)||(bc=[bc]),ac=ac.filter(nulls),bc=bc.filter(nulls),a["class"]=ac.concat(bc).join(" ");for(var key in b)key!="class"&&(a[key]=b[key]);return a};function nulls(val){return val!=null}return exports.attrs=function attrs(obj,escaped){var buf=[],terse=obj.terse;delete obj.terse;var keys=Object.keys(obj),len=keys.length;if(len){buf.push("");for(var i=0;i<len;++i){var key=keys[i],val=obj[key];"boolean"==typeof val||null==val?val&&(terse?buf.push(key):buf.push(key+'="'+key+'"')):0==key.indexOf("data")&&"string"!=typeof val?buf.push(key+"='"+JSON.stringify(val)+"'"):"class"==key&&Array.isArray(val)?buf.push(key+'="'+exports.escape(val.join(" "))+'"'):escaped&&escaped[key]?buf.push(key+'="'+exports.escape(val)+'"'):buf.push(key+'="'+val+'"')}}return buf.join(" ")},exports.escape=function escape(html){return String(html).replace(/&(?!(\w+|\#\d+);)/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")},exports.rethrow=function rethrow(err,filename,lineno){if(!filename)throw err;var context=3,str=require("fs").readFileSync(filename,"utf8"),lines=str.split("\n"),start=Math.max(lineno-context,0),end=Math.min(lines.length,lineno+context),context=lines.slice(start,end).map(function(line,i){var curr=i+start+1;return(curr==lineno?"  > ":"    ")+curr+"| "+line}).join("\n");throw err.path=filename,err.message=(filename||"Jade")+":"+lineno+"\n"+context+"\n\n"+err.message,err},exports}({});

// create our folder objects
exports.board = {};
exports.link = {};
exports.user = {};

// boardListItem.jade compiled template
exports.board.boardListItem = function anonymous(locals, attrs, escape, rethrow, merge) {
    attrs = attrs || jade.attrs;
    escape = escape || jade.escape;
    rethrow = rethrow || jade.rethrow;
    merge = merge || jade.merge;
    var buf = [];
    with (locals || {}) {
        var interp;
        buf.push("<h3><a");
        buf.push(attrs({
            href: "/boards/show/" + board._id + ""
        }, {
            href: true
        }));
        buf.push(">" + ((interp = board.subject) == null ? "" : interp) + "<small>, by " + ((interp = board._owner.name) == null ? "" : interp) + "</small></a></h3><ul>");
        (function() {
            if ("number" == typeof board._links.length) {
                for (var $index = 0, $$l = board._links.length; $index < $$l; $index++) {
                    var link = board._links[$index];
                    buf.push("<li");
                    buf.push(attrs({
                        id: link._id,
                        "class": "link-item"
                    }, {
                        "class": true,
                        id: true
                    }));
                    buf.push(">");
                    if (link._embedlyExtract && link._embedlyExtract.title) {
                        buf.push("<a");
                        buf.push(attrs({
                            href: "/links/" + link._id + ""
                        }, {
                            href: true
                        }));
                        buf.push(">" + ((interp = link._embedlyExtract.title) == null ? "" : interp) + "</a>");
                    } else {
                        buf.push("<a");
                        buf.push(attrs({
                            href: "/links/" + link._id + ""
                        }, {
                            href: true
                        }));
                        buf.push(">" + ((interp = link.url) == null ? "" : interp) + "</a>");
                    }
                    buf.push("</li>");
                }
            } else {
                var $$l = 0;
                for (var $index in board._links) {
                    $$l++;
                    var link = board._links[$index];
                    buf.push("<li");
                    buf.push(attrs({
                        id: link._id,
                        "class": "link-item"
                    }, {
                        "class": true,
                        id: true
                    }));
                    buf.push(">");
                    if (link._embedlyExtract && link._embedlyExtract.title) {
                        buf.push("<a");
                        buf.push(attrs({
                            href: "/links/" + link._id + ""
                        }, {
                            href: true
                        }));
                        buf.push(">" + ((interp = link._embedlyExtract.title) == null ? "" : interp) + "</a>");
                    } else {
                        buf.push("<a");
                        buf.push(attrs({
                            href: "/links/" + link._id + ""
                        }, {
                            href: true
                        }));
                        buf.push(">" + ((interp = link.url) == null ? "" : interp) + "</a>");
                    }
                    buf.push("</li>");
                }
            }
        }).call(this);
        buf.push("</ul>");
    }
    return buf.join("");
};

// creationForm.jade compiled template
exports.board.creationForm = function anonymous(locals, attrs, escape, rethrow, merge) {
    attrs = attrs || jade.attrs;
    escape = escape || jade.escape;
    rethrow = rethrow || jade.rethrow;
    merge = merge || jade.merge;
    var buf = [];
    with (locals || {}) {
        var interp;
        buf.push('<form action="/boards" method="POST"><input type="hidden" value="{!board.id}"/><div class="large-9 small-9 columns"><input type="text" name="subject" placeholder="what should this board be about?"/></div><div class="large-3 small-3 columns"><button type="submit" class="postfix">create</button></div></form>');
    }
    return buf.join("");
};

// linkAddForm.jade compiled template
exports.board.linkAddForm = function anonymous(locals, attrs, escape, rethrow, merge) {
    attrs = attrs || jade.attrs;
    escape = escape || jade.escape;
    rethrow = rethrow || jade.rethrow;
    merge = merge || jade.merge;
    var buf = [];
    with (locals || {}) {
        var interp;
        buf.push("<form");
        buf.push(attrs({
            action: "/boards/" + board._id + "/links",
            method: "POST",
            "class": "addLinkToBoard" + " " + "clearfix"
        }, {
            action: true,
            method: true
        }));
        buf.push('><div class="large-9 small-9 columns"><input type="text" name="url" placeholder="paste or write URL of link to add"/></div><div class="large-3 small-3 columns"><button type="submit" class="postfix">add</button></div></form>');
    }
    return buf.join("");
};

// article.jade compiled template
exports.link.article = function anonymous(locals, attrs, escape, rethrow, merge) {
    attrs = attrs || jade.attrs;
    escape = escape || jade.escape;
    rethrow = rethrow || jade.rethrow;
    merge = merge || jade.merge;
    var buf = [];
    with (locals || {}) {
        var interp;
        buf.push('<div class="content">');
        if (link._embedlyExtract.content) {
            buf.push("" + ((interp = link._embedlyExtract.content) == null ? "" : interp) + "");
        }
        buf.push("</div>");
    }
    return buf.join("");
};

// creationForm.jade compiled template
exports.link.creationForm = function anonymous(locals, attrs, escape, rethrow, merge) {
    attrs = attrs || jade.attrs;
    escape = escape || jade.escape;
    rethrow = rethrow || jade.rethrow;
    merge = merge || jade.merge;
    var buf = [];
    with (locals || {}) {
        var interp;
        buf.push('<form action="/links" method="POST"><div class="large-9 small-9 columns"><input type="text" name="url" placeholder="paste or write the URL"/></div><div class="large-3 small-3 columns"><button type="submit" class="postfix">go</button></div></form>');
    }
    return buf.join("");
};

// images.jade compiled template
exports.link.images = function anonymous(locals, attrs, escape, rethrow, merge) {
    attrs = attrs || jade.attrs;
    escape = escape || jade.escape;
    rethrow = rethrow || jade.rethrow;
    merge = merge || jade.merge;
    var buf = [];
    with (locals || {}) {
        var interp;
        buf.push('<div class="images">');
        if (link._embedlyExtract.images && link._embedlyExtract.images.length) {
            (function() {
                if ("number" == typeof link._embedlyExtract.images.length) {
                    for (var $index = 0, $$l = link._embedlyExtract.images.length; $index < $$l; $index++) {
                        var image = link._embedlyExtract.images[$index];
                        buf.push("<img");
                        buf.push(attrs({
                            src: image.url
                        }, {
                            src: true
                        }));
                        buf.push("/>");
                    }
                } else {
                    var $$l = 0;
                    for (var $index in link._embedlyExtract.images) {
                        $$l++;
                        var image = link._embedlyExtract.images[$index];
                        buf.push("<img");
                        buf.push(attrs({
                            src: image.url
                        }, {
                            src: true
                        }));
                        buf.push("/>");
                    }
                }
            }).call(this);
        }
        buf.push("</div>");
    }
    return buf.join("");
};

// linkBoardItem.jade compiled template
exports.link.linkBoardItem = function anonymous(locals, attrs, escape, rethrow, merge) {
    attrs = attrs || jade.attrs;
    escape = escape || jade.escape;
    rethrow = rethrow || jade.rethrow;
    merge = merge || jade.merge;
    var buf = [];
    with (locals || {}) {
        var interp;
        var tweets, media, images, content;
        tweets = link._tweets && link._tweets.length || null;
        media = link._embedlyExtract && link._embedlyExtract.media ? link._embedlyExtract.media.type : null;
        images = link._embedlyExtract && link._embedlyExtract.images ? link._embedlyExtract.images.length : null;
        content = link._embedlyExtract && link._embedlyExtract.content ? link._embedlyExtract.content.length : null;
        var details = [];
        if (tweets) details.push("tweets");
        if (media) details.push("embedded media");
        if (images) details.push("images");
        if (content) details.push("article preview");
        var infoString = details.join(", ");
        var extraClasses = extraClasses || "";
        buf.push("<article");
        buf.push(attrs({
            id: link._id,
            "data-json": "" + JSON.stringify(link) + "",
            "class": "link-item"
        }, {
            "class": true,
            id: true,
            "data-json": true
        }));
        buf.push('><div class="content"><ul class="meta"><li class="meta-li"><a class="meta-link tweets text-hide">');
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
        if (link._embedlyExtract) {
            buf.push("<h4>");
            if (link._embedlyExtract.favicon_url) {
                buf.push("<img");
                buf.push(attrs({
                    src: link._embedlyExtract.favicon_url
                }, {
                    src: true
                }));
                buf.push("/>");
            }
            buf.push("<a");
            buf.push(attrs({
                href: "" + link.url + ""
            }, {
                href: true
            }));
            buf.push(">" + ((interp = link._embedlyExtract.title || link._embedlyExtract.url) == null ? "" : interp) + "</a></h4><p>" + ((interp = link._embedlyExtract.description) == null ? "" : interp) + "</p>");
            if (link._embedlyExtract.media) {
                buf.push('<div class="flex-video">' + ((interp = link._embedlyExtract.media.html) == null ? "" : interp) + "</div>");
            }
        } else {
            buf.push("<h4>");
            var __val__ = link.url;
            buf.push(escape(null == __val__ ? "" : __val__));
            buf.push("</h4><p>fetching preview, please wait</p>");
        }
        buf.push("</div><a");
        buf.push(attrs({
            href: "/links/" + link._id + "",
            "class": "button" + " " + "secondary"
        }, {
            href: true
        }));
        buf.push(">more info - " + escape((interp = infoString) == null ? "" : interp) + "</a></div></article>");
    }
    return buf.join("");
};

// linkListItem.jade compiled template
exports.link.linkListItem = function anonymous(locals, attrs, escape, rethrow, merge) {
    attrs = attrs || jade.attrs;
    escape = escape || jade.escape;
    rethrow = rethrow || jade.rethrow;
    merge = merge || jade.merge;
    var buf = [];
    with (locals || {}) {
        var interp;
        buf.push("<li");
        buf.push(attrs({
            id: link._id,
            "class": "link-item"
        }, {
            "class": true,
            id: true
        }));
        buf.push(">");
        if (link._embedlyExtract && link._embedlyExtract.title) {
            buf.push("<a");
            buf.push(attrs({
                href: "/links/" + link._id + ""
            }, {
                href: true
            }));
            buf.push(">" + ((interp = link._embedlyExtract.title) == null ? "" : interp) + "</a>");
        } else {
            buf.push("<a");
            buf.push(attrs({
                href: "/links/" + link._id + ""
            }, {
                href: true
            }));
            buf.push(">" + ((interp = link.url) == null ? "" : interp) + "</a>");
        }
        buf.push("</li>");
    }
    return buf.join("");
};

// media.jade compiled template
exports.link.media = function anonymous(locals, attrs, escape, rethrow, merge) {
    attrs = attrs || jade.attrs;
    escape = escape || jade.escape;
    rethrow = rethrow || jade.rethrow;
    merge = merge || jade.merge;
    var buf = [];
    with (locals || {}) {
        var interp;
        buf.push('<div class="media">');
        if (link._embedlyExtract.media && link._embedlyExtract.media.type) {
            buf.push("" + ((interp = link._embedlyExtract.media) == null ? "" : interp) + "");
        }
        buf.push("</div>");
    }
    return buf.join("");
};

// meta.jade compiled template
exports.link.meta = function anonymous(locals, attrs, escape, rethrow, merge) {
    attrs = attrs || jade.attrs;
    escape = escape || jade.escape;
    rethrow = rethrow || jade.rethrow;
    merge = merge || jade.merge;
    var buf = [];
    with (locals || {}) {
        var interp;
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
exports.link.pagination = function anonymous(locals, attrs, escape, rethrow, merge) {
    attrs = attrs || jade.attrs;
    escape = escape || jade.escape;
    rethrow = rethrow || jade.rethrow;
    merge = merge || jade.merge;
    var buf = [];
    with (locals || {}) {
        var interp;
        buf.push('<div class="clear pagination"><a');
        buf.push(attrs({
            href: data.prev_page
        }, {
            href: true
        }));
        buf.push(">prev</a><a");
        buf.push(attrs({
            href: data.next_page
        }, {
            href: true
        }));
        buf.push(">next</a></div>");
    }
    return buf.join("");
};

// preview.jade compiled template
exports.link.preview = function anonymous(locals, attrs, escape, rethrow, merge) {
    attrs = attrs || jade.attrs;
    escape = escape || jade.escape;
    rethrow = rethrow || jade.rethrow;
    merge = merge || jade.merge;
    var buf = [];
    with (locals || {}) {
        var interp;
    }
    return buf.join("");
};

// searchForm.jade compiled template
exports.link.searchForm = function anonymous(locals, attrs, escape, rethrow, merge) {
    attrs = attrs || jade.attrs;
    escape = escape || jade.escape;
    rethrow = rethrow || jade.rethrow;
    merge = merge || jade.merge;
    var buf = [];
    with (locals || {}) {
        var interp;
        buf.push('<form action="/search" method="GET"><div class="large-9 small-9 columns"><input type="text" name="q" placeholder="enter a keyword and search for links"/></div><div class="large-3 small-3 columns"><button type="submit" class="postfix">find</button></div></form>');
    }
    return buf.join("");
};

// tweet.jade compiled template
exports.link.tweet = function anonymous(locals, attrs, escape, rethrow, merge) {
    attrs = attrs || jade.attrs;
    escape = escape || jade.escape;
    rethrow = rethrow || jade.rethrow;
    merge = merge || jade.merge;
    var buf = [];
    with (locals || {}) {
        var interp;
        buf.push('<li class="tweet"><img');
        buf.push(attrs({
            src: tweet.profile_image_url
        }, {
            src: true
        }));
        buf.push("/><h5>");
        var __val__ = tweet.from_user_name;
        buf.push(escape(null == __val__ ? "" : __val__));
        buf.push("</h5><p>");
        var __val__ = tweet.text;
        buf.push(escape(null == __val__ ? "" : __val__));
        buf.push("</p></li>");
    }
    return buf.join("");
};

// tweets.jade compiled template
exports.link.tweets = function anonymous(locals, attrs, escape, rethrow, merge) {
    attrs = attrs || jade.attrs;
    escape = escape || jade.escape;
    rethrow = rethrow || jade.rethrow;
    merge = merge || jade.merge;
    var buf = [];
    with (locals || {}) {
        var interp;
        buf.push('<ul class="tweets">');
        (function() {
            if ("number" == typeof link._tweets.length) {
                for (var $index = 0, $$l = link._tweets.length; $index < $$l; $index++) {
                    var tweet = link._tweets[$index];
                    buf.push('<li class="tweet"><img');
                    buf.push(attrs({
                        src: tweet.profile_image_url
                    }, {
                        src: true
                    }));
                    buf.push("/><h5>");
                    var __val__ = tweet.from_user_name;
                    buf.push(escape(null == __val__ ? "" : __val__));
                    buf.push("</h5><p>");
                    var __val__ = tweet.text;
                    buf.push(escape(null == __val__ ? "" : __val__));
                    buf.push("</p></li>");
                }
            } else {
                var $$l = 0;
                for (var $index in link._tweets) {
                    $$l++;
                    var tweet = link._tweets[$index];
                    buf.push('<li class="tweet"><img');
                    buf.push(attrs({
                        src: tweet.profile_image_url
                    }, {
                        src: true
                    }));
                    buf.push("/><h5>");
                    var __val__ = tweet.from_user_name;
                    buf.push(escape(null == __val__ ? "" : __val__));
                    buf.push("</h5><p>");
                    var __val__ = tweet.text;
                    buf.push(escape(null == __val__ ? "" : __val__));
                    buf.push("</p></li>");
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