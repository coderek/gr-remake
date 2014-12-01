$(window.document).on('click', 'a[href]:not([data-bypass])', function (e) {
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

function isInternalLink() {

    // it may be a dummy anchor to trigger some event
    if ($(this).data('action') || _.isEmpty($(this).attr('href'))) {
        return false;
    }

    return true;
}
