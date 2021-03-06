var cheerio = require('cheerio');
var _ = require('lodash');

var exceptions = ['abbr', 'accept', 'accept', 'charset', 'accesskey', 'action',
    'align', 'alt', 'axis', 'cellpadding', 'cellspacing', 'char', 'charoff', 'charset',
    'checked', 'cite', 'clear', 'cols', 'colspan', 'color', 'compact', 'coords', 'datetime',
    'dir', 'disabled', 'enctype', 'for', 'frame', 'headers', 'href', 'hreflang', 'id',
    'ismap', 'label', 'lang', 'longdesc', 'loop', 'loopcount', 'loopend', 'loopstart',
    'maxlength', 'media', 'method', 'multiple', 'name', 'nohref',
    'noshade', 'nowrap', 'poster', 'preload', 'prompt', 'readonly', 'rel', 'rev', 'rows', 'rowspan', 'rules', 'scope',
    'selected', 'shape', 'size', 'span', 'src', 'start', 'summary', 'tabindex', 'target', 'title',
    'type', 'usemap', 'valign', 'value', 'vspace', 'xml:lang'];

exports.wash = function (content) {
    var $ = cheerio.load(content);
    $('script').remove();
    $('*').each(function () {
        var attrs = _.keys($(this).attr());
        var $el = $(this);
        _.each(attrs, function (name) {
            if (!_.contains(exceptions, name)) {
                $el.removeAttr(name);
            }
        });
    });
    return $.html();
};