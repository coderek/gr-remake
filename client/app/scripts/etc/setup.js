// in page link handling
// hijack all in page anchor links, unless [data-bypass] is present
$(window.document).on('click', 'a[href]:not([data-bypass])', function(e) {
    if (!e.metaKey && !e.ctrlKey && !e.shiftKey) {

        // always prevent default

        e.preventDefault();
        var protocol = this.protocol + '//';
        var href = this.href;
        href = href.slice(protocol.length);
        href = href.slice(href.indexOf('/') + 1);

        if (isInternalLink.call(this)) {
            e.stopPropagation();
            Backbone.history.navigate(href, {trigger: true});
        }
    }
});