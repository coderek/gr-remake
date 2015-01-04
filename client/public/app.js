!function(){"use strict";var e="undefined"!=typeof window?window:global;if("function"!=typeof e.require){var t={},i={},n=function(e,t){return{}.hasOwnProperty.call(e,t)},r=function(e,t){var i,n,r=[];i=/^\.\.?(\/|$)/.test(t)?[e,t].join("/").split("/"):t.split("/");for(var s=0,o=i.length;o>s;s++)n=i[s],".."===n?r.pop():"."!==n&&""!==n&&r.push(n);return r.join("/")},s=function(e){return e.split("/").slice(0,-1).join("/")},o=function(t){return function(i){var n=s(t),o=r(n,i);return e.require(o,t)}},a=function(e,t){var n={id:e,exports:{}};return i[e]=n,t(n.exports,o(e),n),n.exports},d=function(e,s){var o=r(e,".");if(null==s&&(s="/"),n(i,o))return i[o].exports;if(n(t,o))return a(o,t[o]);var d=r(o,"./index");if(n(i,d))return i[d].exports;if(n(t,d))return a(d,t[d]);throw new Error('Cannot find module "'+e+'" from "'+s+'"')},l=function(e,i){if("object"==typeof e)for(var r in e)n(e,r)&&(t[r]=e[r]);else t[e]=i},c=function(){var e=[];for(var i in t)n(t,i)&&e.push(i);return e};e.require=d,e.require.define=l,e.require.register=l,e.require.list=c,e.require.brunch=!0}}(),require.register("scripts/app",function(e,t,i){var n=t("./views/feeds"),r=t("./views/entries"),s=t("./models/feeds"),o=(t("./views/feed-form"),t("./views/feed-meta"));t("./etc/hbs-helpers"),t("./etc/setup");var a=new s(fds,{parse:!0}),d=new Marionette.Application;d.addRegions({feedsRegion:"#feed-list-region",entriesRegion:"#entries-region",feedMetaRegion:"#feed-meta-region"}),d.addInitializer(function(){this.feedsRegion.show(new n({collection:a})),this.feedMetaRegion.show(o)}),d.on("start",function(){t("./router"),Backbone.history.start({pushState:!0})}),d.commands.setHandler("show-entries",function(e,t){Bugsnag.notifyException(new Error("show entries"),"CustomErrorName");var i=new r({collection:t});d.entriesRegion.show(i),o.trigger("update",e)}),d.commands.setHandler("add-feed",function(e){var t=a.add(_.omit(e,"articles"));t.setEntries(e.articles),d.execute("show-entries",t,t.entries)}),d.commands.setHandler("delete-feed",function(e){var t=a.get(e);return t?t.destroy({success:function(){toastr.success("Deleted"),o.trigger("clear")}}):void 0}),d.commands.setHandler("show-feed",function(e){var t=a.get(e);t?d.execute("show-entries",t,t.entries):toastr.warning("Feed is not found.")}),window.app=d,i.exports=d,$(".welcome").click(function(){$(".left-column").toggleClass("hide")})}),require.register("scripts/controller",function(e,t,i){i.exports={showFeed:function(e){console.log("show feed",e),app.execute("show-feed",e)}}}),require.register("scripts/etc/hbs-helpers",function(){function e(e){var t=moment(e);return t.isValid()?t.format("YYYY-MM-DD HH:mma"):""}function t(e){var t=moment(e);return t.isValid()?t.fromNow():""}Handlebars.registerHelper("nice_date",e),Handlebars.registerHelper("ago",t)}),require.register("scripts/etc/setup",function(){$(window.document).on("click","a[href]:not([data-bypass])",function(e){if(!e.metaKey&&!e.ctrlKey&&!e.shiftKey){e.preventDefault();var t=this.protocol+"//",i=this.href;i=i.slice(t.length),i=i.slice(i.indexOf("/")+1),isInternalLink.call(this)&&(e.stopPropagation(),Backbone.history.navigate(i,{trigger:!0}))}})}),require.register("scripts/index",function(e,t){var i=t("./app");i.start()}),require.register("scripts/models/entries",function(e,t,i){var n=Backbone.Model.extend({idAttribute:"_id"}),r=Backbone.Collection.extend({model:n,initialize:function(e,t){this.url=t.url},comparator:function(e,t){return e.get("pubdate")>t.get("pubdate")?-1:1},getUnreadCount:function(){for(var e=0,t=0;t<this.length&&!this.at(t).get("isread");t++)e+=1;return e}});i.exports=r}),require.register("scripts/models/feeds",function(e,t,i){var n=t("./entries"),r=Backbone.Model.extend({idAttribute:"_id",parse:function(e){return this.setupEntriesCollection(e[this.idAttribute]),_.isArray(e.articles)&&this.setEntries(e.articles),delete e.articles,e},setupEntriesCollection:function(e){this.entries||(this.entries=new n([],{url:"/feeds/"+e+"/entries"}),this.entries.on("change:isread add",function(){this.trigger("read-entry")},this))},setEntries:function(e){this.entries.set(e)},initialize:function(){this.setupEntriesCollection(this.id),this.on("destroy",function(){this.entries&&this.entries.trigger("feed-destroyed"),this.entries=null})},getUnreadCount:function(){return this.entries?this.entries.getUnreadCount():0}}),s=Backbone.Collection.extend({model:r,url:"/feeds",comparator:function(e,t){return moment(e.get("pubdate"))>moment(t.get("pubdate"))?-1:1}});s.Feed=r,i.exports=s}),require.register("scripts/router",function(e,t){var i=Marionette.AppRouter.extend({appRoutes:{"feeds/:id":"showFeed"},controller:t("./controller")});new i}),require.register("scripts/templates/entries",function(e,t,i){var n=Handlebars.template(function(e,t,i,n,r){return this.compilerInfo=[4,">= 1.0.0"],i=this.merge(i,e.helpers),r=r||{},'<div class="articles">\n\n</div>\n\n<!--<div class="load-more">Load More</div>-->'});"function"==typeof define&&define.amd?define([],function(){return n}):"object"==typeof i&&i&&i.exports&&(i.exports=n)}),require.register("scripts/templates/entry-empty",function(e,t,i){var n=Handlebars.template(function(e,t,i,n,r){return this.compilerInfo=[4,">= 1.0.0"],i=this.merge(i,e.helpers),r=r||{},"No entries found"});"function"==typeof define&&define.amd?define([],function(){return n}):"object"==typeof i&&i&&i.exports&&(i.exports=n)}),require.register("scripts/templates/entry",function(e,t,i){var n=Handlebars.template(function(e,t,i,n,r){this.compilerInfo=[4,">= 1.0.0"],i=this.merge(i,e.helpers),r=r||{};var s,o,a,d="",l="function",c=i.helperMissing,u=this.escapeExpression;return d+='<div class="row title">\n\n    <div class="col-md-8">\n        ',(o=i.title)?s=o.call(t,{hash:{},data:r}):(o=t&&t.title,s=typeof o===l?o.call(t,{hash:{},data:r}):o),(s||0===s)&&(d+=s),d+='\n    </div>\n\n    <div class="col-md-4 text-right">\n        <time class="">'+u((o=i.ago||t&&t.ago,a={hash:{},data:r},o?o.call(t,t&&t.pubdate,a):c.call(t,"ago",t&&t.pubdate,a)))+'</time>\n\n        <a href="',(o=i.link)?s=o.call(t,{hash:{},data:r}):(o=t&&t.link,s=typeof o===l?o.call(t,{hash:{},data:r}):o),d+=u(s)+'" target="_blank" data-bypass>\n            <i class="fa fa-link fa-fw"></i>\n        </a>\n\n        <i class="fa fa-bookmark-o fa-fw"></i>\n    </div>\n</div>\n\n<div class="content" style="display: none">\n</div>\n'});"function"==typeof define&&define.amd?define([],function(){return n}):"object"==typeof i&&i&&i.exports&&(i.exports=n)}),require.register("scripts/templates/feed-item",function(e,t,i){var n=Handlebars.template(function(e,t,i,n,r){this.compilerInfo=[4,">= 1.0.0"],i=this.merge(i,e.helpers),r=r||{};var s,o,a="",d="function",l=this.escapeExpression;return a+='<div class="row">\n    <div class="col-xs-9">\n        <div class="title" title="',(o=i.title)?s=o.call(t,{hash:{},data:r}):(o=t&&t.title,s=typeof o===d?o.call(t,{hash:{},data:r}):o),a+=l(s)+'">',(o=i.title)?s=o.call(t,{hash:{},data:r}):(o=t&&t.title,s=typeof o===d?o.call(t,{hash:{},data:r}):o),a+=l(s)+'</div>\n        <div class="author">',(o=i.author)?s=o.call(t,{hash:{},data:r}):(o=t&&t.author,s=typeof o===d?o.call(t,{hash:{},data:r}):o),a+=l(s)+'</div>\n    </div>\n    <div class="col-xs-3 text-right">\n        <span class="unread-counter">',(o=i.unreadCount)?s=o.call(t,{hash:{},data:r}):(o=t&&t.unreadCount,s=typeof o===d?o.call(t,{hash:{},data:r}):o),a+=l(s)+"</span>\n    </div>\n</div>\n"});"function"==typeof define&&define.amd?define([],function(){return n}):"object"==typeof i&&i&&i.exports&&(i.exports=n)}),require.register("scripts/templates/feed-meta",function(e,t,i){var n=Handlebars.template(function(e,t,i,n,r){function s(e,t){var n,r,s,o="";return o+='\n    <span class="title">\n        ',(r=i.title)?n=r.call(e,{hash:{},data:t}):(r=e&&e.title,n=typeof r===d?r.call(e,{hash:{},data:t}):r),o+=l(n)+'\n    </span>\n    <time class="pull-right btn"><i class="fa fa-clock-o"></i> '+l((r=i.nice_date||e&&e.nice_date,s={hash:{},data:t},r?r.call(e,e&&e.pubdate,s):c.call(e,"nice_date",e&&e.pubdate,s)))+"</time>\n"}this.compilerInfo=[4,">= 1.0.0"],i=this.merge(i,e.helpers),r=r||{};var o,a="",d="function",l=this.escapeExpression,c=i.helperMissing,u=this;return o=i["if"].call(t,t&&t._id,{hash:{},inverse:u.noop,fn:u.program(1,s,r),data:r}),(o||0===o)&&(a+=o),a+="\n"});"function"==typeof define&&define.amd?define([],function(){return n}):"object"==typeof i&&i&&i.exports&&(i.exports=n)}),require.register("scripts/views/entries",function(e,t,i){var n=t("../templates/entry"),r=t("../templates/entries"),s=Marionette.ItemView.extend({template:n,className:"article",initialize:function(){this.model.get("isread")&&this.$el.addClass("is-read")},ui:{content:".content",title:".title"},events:{"click @ui.title":"toggleContent"},modelEvents:{"change:title":"render"},toggleContent:function(){var e=this;this._isContentRendered||this.ui.content.html(this.model.get("description")),this.ui.content.toggle(),this.model.save({isread:!0},{patch:!0}).then(function(){e.$el.addClass("is-read")})}}),o=Marionette.CompositeView.extend({childView:s,template:r,childViewContainer:".articles",initialize:function(){this.collection.fetch({merge:!0})},collectionEvents:{"feed-destroyed":"destroy"},ui:{loadMore:".load-more"},events:{"click @ui.loadMore":"loadMore"},loadMore:function(){this.ui.loadMore.text("Loading more...")}});i.exports=o}),require.register("scripts/views/feed-form",function(e,t,i){var n=Backbone.View.extend({events:{"click [data-action=add-feed]":"submitFeedUrl","keyup input":"checkEnter"},checkEnter:function(e){var t=e.keyCode||e.which;13===t&&this.submitFeedUrl()},submitFeedUrl:function(){var e=this.$("input").val();this.sendNewFeedRequest(e).then(function(e){toastr.success("Feed is added."),app.execute("add-feed",e)},function(e){var t=e.responseJSON.message;toastr.error(JSON.stringify(t))}).then(this.resetIcon.bind(this)),this.disableForm()},disableForm:function(){this.$("i.fa").addClass("fa-spin fa-refresh"),this.$(".btn").prop("disabled",!0),this.$("input").prop("disabled",!0)},resetIcon:function(){this.$("i.fa").removeClass("fa-spin fa-refresh"),this.$(".btn").prop("disabled",!1),this.$("input").prop("disabled",!1)},sendNewFeedRequest:function(e){var t=$.ajax({type:"POST",url:"/feeds",data:JSON.stringify({url:e}),headers:{"content-type":"application/json",accept:"application/json"}});return Promise.resolve(t)}});i.exports=new n({el:"#feed-form"})}),require.register("scripts/views/feed-meta",function(e,t,i){var n=t("../templates/feed-meta"),r=t("../models/feeds").Feed,s=Marionette.ItemView.extend({initialize:function(){this.model=new r,this.listenTo(this.model,"change",this.render),this.on("update",function(e){this.model.set(e.toJSON())}),this.on("clear",function(){this.model.clear()})},ui:{"delete":"[data-action=delete]"},events:{"click @ui.delete":"deleteFeed"},deleteFeed:function(){var e=this.ui.delete.data("id");app.execute("delete-feed",e),Backbone.history.navigate("/",{trigger:!0})},template:n});i.exports=new s}),require.register("scripts/views/feeds",function(e,t,i){var n=t("../templates/feed-item"),r=Marionette.ItemView.extend({tagName:"li",className:"feed",template:n,ui:{unreadCounter:".unread-counter"},modelEvents:{"read-entry add-entry":"updateUnreadCount"},events:{click:"loadFeed"},onShow:function(){this.updateUnreadCount()},updateUnreadCount:function(){this.ui.unreadCounter.text(this.model.getUnreadCount())},loadFeed:function(){this.$el.addClass("active"),this.$el.siblings().removeClass("active"),Backbone.history.navigate("/feeds/"+this.model.id,{trigger:!0})},showEntries:function(){this.trigger("show-entries",this.model.entries)}}),s=Marionette.CollectionView.extend({childView:r,className:"list-unstyled",tagName:"ul",childEvents:{"show-entries":"showEntries"},showEntries:function(e,t){e.$el.addClass("active"),e.$el.siblings(".active").removeClass("active"),app.execute("show-entries",e.model,t)}});i.exports=s});
//# sourceMappingURL=public/app.js.map
//# sourceMappingURL=app.js.map