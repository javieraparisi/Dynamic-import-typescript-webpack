var jsonTransform = require('gulp-json-transform');
var gulp = require('gulp');
var variante = require('./variante.json').min;
var bootstrapersObject = {};
var rutasObject = {};
var directoryFolder = "src";
//var tsFolder = "C:\\code\\type4\\";

var es, log, logFile, counterBoots=0;
es = require('event-stream');
log = require('gulp-util').log;

var writeBootObject = function(es) {
    return es.map(function(file, cb) {
        var nameSpace = file.path.substring(file.path.indexOf(":")+2).replace(".ts","");
        while (nameSpace.indexOf("\\")>0){
            nameSpace = nameSpace.replace("\\","_");
        }
        while (nameSpace.indexOf("-")>0){
            nameSpace = nameSpace.replace("-","_");
        }
        bootstrapersObject[nameSpace] =file.path;
        return cb();
    });
};

var writeTsObject = function(es) {
    return es.map(function(file, cb) {
        log("nombre fichero: " + file.path);
        var nameSpace = file.path.substring(file.path.indexOf(directoryFolder)+4);
        nameSpace = nameSpace.replace(".ES","").replace(".AR","").replace(".CL","").replace(".CO","").replace(".MX","");
        nameSpace = nameSpace.replace(".ts","");
        while (nameSpace.indexOf("\\")>0){
            nameSpace = nameSpace.replace("\\",".");
        }

        var rutats = file.path.substring(file.path.indexOf(directoryFolder));
        rutats = rutats.replace(".ts","");
        while (rutats.indexOf("\\")>0){
            rutats = rutats.replace("\\","/");
        }


        if (fnesVarianteActual(rutats)){
            //When is variant
            rutasObject[nameSpace] =[rutats];
        }else if (fnesBase(rutats) && rutasObject[nameSpace]== undefined){
            //If is base
            rutasObject[nameSpace] =[rutats];
            console.log("3." + nameSpace);
        }

        return cb();
    });
};

var fnesVarianteActual = function(ruta) {
    var esVariante=false;
    if (ruta.indexOf(".ES")>0 && variante=="ES" ||
        ruta.indexOf(".AR")>0 && variante=="AR" ||
        ruta.indexOf(".CL")>0 && variante=="CL" ||
        ruta.indexOf(".CO")>0 && variante=="CO" ||
        ruta.indexOf(".MX")>0 && variante=="MX") esVariante=true;
    return esVariante;
};

var fnesBase = function(ruta) {
    var esBase=false;
    if (ruta.indexOf(".ES")<0 &&
        ruta.indexOf(".AR")<0 &&
        ruta.indexOf(".CL")<0 &&
        ruta.indexOf(".CO")<0 &&
        ruta.indexOf(".MX")<0) esBase=true;
    return esBase;
};

gulp.task('leerboots', function() {
    return gulp.src('./src/**/bootstraper.ts').pipe(writeBootObject(es))
})

gulp.task('writeboots',['leerboots'], function() {
    return gulp.src('./entryPathsWP.json')
        .pipe(jsonTransform(function(data, file) {
            //log("pagina 0: " + bootstrapersObject.pagina1);
            var config = {
                "entryPaths": bootstrapersObject
            };

            return config
        }))
        .pipe(gulp.dest('./'))
})

gulp.task('leerts', function() {
    return gulp.src('./src/**/*.ts').pipe(writeTsObject(es))
})

gulp.task('writets',['leerts'], function() {
    return gulp.src('./tsconfig.json')
        .pipe(jsonTransform(function(data, file) {

            var tsConfig = {
                "compilerOptions": {
                    "baseUrl": ".",
                    "paths": rutasObject
                }
            };

            return tsConfig
        }))
        .pipe(gulp.dest('./'))
})

gulp.task('default',['writeboots','writets'])