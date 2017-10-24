var variante = require('./variante.json').min;
var TsConfigPathsPlugin = require('awesome-typescript-loader').TsConfigPathsPlugin;
var entryPaths=require('./entryPathsWP.json').entryPaths;

module.exports = {
    entry: entryPaths,
    output: {
        filename: "Bundles/" + variante + "/[name].js",
    },
    devtool: "source-map",
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"],
        plugins: [
            new TsConfigPathsPlugin({
                tsconfig: 'tsconfig.json',
                compiler: 'typescript'
            })
        ]
    },
    module: {
        rules: [
            {  test: /\.tsx?$/, loader: "awesome-typescript-loader"},
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
        ]
    }
};