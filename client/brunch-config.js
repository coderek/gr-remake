exports.config = {

    files: {
        javascripts: {
            joinTo: {
                'app.js': /^app\/scripts\//,
                'vendor.js': /^(vendor\/scripts|bower_components)\//
            }
        },

        stylesheets: {
            joinTo: {
                'app.css': /app\/styles[\\/]/
            }
        },

        templates: {
            joinTo: 'app.js',
            defaultExtension: 'hbs'
        }
    },

    overrides: {
        production: {
            optimize: true,
            sourceMaps: true
        }
    }
};
