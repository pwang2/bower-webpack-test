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
    externals: {
        $: 'jQuery',
        jQuery: 'jQuery',
        'whatInput': 'whatInput',
        'foundation-sites':'Foudation',
        'bootstrap': 'blackwhole', //bootstrap attach it's behavior as jquery plugin
        'tether': 'Tether',
        'd3': 'd3',
        'd3.chart': 'd3.chart'
    }
}
