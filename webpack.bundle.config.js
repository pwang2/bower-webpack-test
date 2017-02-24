var path = require('path');

module.exports = {
    entry: ['./index.js'],
    context: '.',
    output: {
        filename: 'bundle.js'
    },
    resolve: {
        //   :( :( :( :( :( :(
        // webpack can not process main fields in array format as it was desiged for npm package mostly and
        // in package.json spec, main is a single module id
        alias: {
            "foundation-sites": path.join(__dirname, './bower_components/foundation-sites/dist/js/foundation.js'),
            "bootstrap": path.join(__dirname, './bower_components/bootstrap/dist/js/bootstrap.js')
        },
        descriptionFiles: [".bower.json"],
        mainFields: ["main"],
        modules: [require('path').join(__dirname, "bower_components")]
    },
    plugins: [
        // jQuery, Tether was appeared in foundation as free variable
        // (PS: foundation is a global module which attach to window)
        new(require('webpack').ProvidePlugin)({
            $: 'jquery',
            jQuery: 'jquery',
            'what-input': 'whatInput', //just an enhancement for foundation, not in the source
            'Tether': 'tether'
        })

    ]
}
