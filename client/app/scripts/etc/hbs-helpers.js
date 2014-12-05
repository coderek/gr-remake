Handlebars.registerHelper('nice_date' , niceDate);

function niceDate(str) {
    return moment(str).format('YYYY-MM-DD HH:mma');
}