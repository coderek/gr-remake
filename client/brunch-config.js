exports.config = {

    files: {
        javascripts: {
            joinTo: 'app.js'
        },

        stylesheets: {
            joinTo: {
                'app.css': /app\/styles[\\/]/
            }
        },

        templates: {
            joinTo: 'app.js'
        }
    }
};
