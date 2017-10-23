var variante = require('./variante.json').min;
var TsConfigPathsPlugin = require('awesome-typescript-loader').TsConfigPathsPlugin;
var entryPaths=require('./entryPathsWP.json').entryPaths;

module.exports = {
    entry: entryPaths,
    output: {
        filename: "Bundles/" + variante + "/[name].js",
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"],
        /*alias: {
         "koko": path.resolve("", 'Direccion/AR'),
         //"SM.Edu.Comun.Pagador": path.resolve("", 'Pagador/SM.Edu.Comun.Pagador')
         },*/
        plugins: [
            new TsConfigPathsPlugin({
                tsconfig: 'C:/code/type4/tsconfig.json',
                compiler: 'typescript'
            })
        ]
        //alias: objAlias
    },

    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            {  test: /\.tsx?$/, loader: "awesome-typescript-loader"},
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
        ]
    }
};