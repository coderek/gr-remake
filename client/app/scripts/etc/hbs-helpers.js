Handlebars.registerHelper('nice_date' , niceDate);
Handlebars.registerHelper('ago' , ago);

function niceDate(str) {
    var date = moment(str);
    if (!date.isValid()) return '';

    return date.format('YYYY-MM-DD HH:mma');
}

function ago(str) {
    var date = moment(str);
    if (!date.isValid()) return '';
    return date.fromNow();
}