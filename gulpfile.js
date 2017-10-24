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
        counterBoots++;
        log("nombre fichero: " + file.path);
        bootstrapersObject["pagina" + counterBoots] =file.path;
        return cb();
    });
};

var writeBootObject = function(es) {
    return es.map(function(file, cb) {
        counterBoots++;
        log("nombre fichero: " + file.path);
        bootstrapersObject["pagina" + counterBoots] =file.path;
        return cb();
    });
};

var writeTsObject = function(es) {
    return es.map(function(file, cb) {
        log("nombre fichero: " + file.path);
        var nameSpace = file.path.substring(file.path.indexOf(directoryFolder)+4);

        log("namespce inicial: " + nameSpace);
        log("esVarianteActual: " + fnesVarianteActual(nameSpace));
        log("esBase: " + fnesBase(nameSpace));
        nameSpace = nameSpace.replace(".ES","").replace(".AR","").replace(".CL","").replace(".CO","").replace(".MX","");
        nameSpace = nameSpace.replace(".ts","");
        while (nameSpace.indexOf("\\")>0){
            nameSpace = nameSpace.replace("\\",".");
        }

        log("namespce final: " + nameSpace);
        var rutats = file.path.substring(file.path.indexOf(directoryFolder));
        rutats = rutats.replace(".ts","");
        while (rutats.indexOf("\\")>0){
            rutats = rutats.replace("\\","/");
            if (fnesVarianteActual(nameSpace)){
                rutasObject[nameSpace] =[rutats];
            }
        }
        if (fnesBase(nameSpace) && rutasObject[nameSpace]== undefined){
            rutasObject[nameSpace] =[rutats];
        }
        rutasObject[nameSpace] =[rutats];
        return cb();
    });
};

var fnesVarianteActual = function(ruta) {
    var esVariante=false;
    if (ruta.indexOf(".ES.ts")>0 && variante=="ES" ||
        ruta.indexOf(".AR.ts")>0 && variante=="AR" ||
        ruta.indexOf(".CL.ts")>0 && variante=="CL" ||
        ruta.indexOf(".CO.ts")>0 && variante=="CO" ||
        ruta.indexOf(".MX.ts")>0 && variante=="MX") esVariante=true;
    return esVariante;
};

var fnesBase = function(ruta) {
    var esBase=false;
    if (ruta.indexOf(".ES.ts")<0 &&
        ruta.indexOf(".AR.ts")<0 &&
        ruta.indexOf(".CL.ts")<0 &&
        ruta.indexOf(".CO.ts")<0 &&
        ruta.indexOf(".MX.ts")<0) esBase=true;
    return esBase;
};

gulp.task('leerboots', function() {
    return gulp.src('./src/**/bootstraper.ts').pipe(writeBootObject(es))
})

gulp.task('writeboots',['leerboots'], function() {
    return gulp.src('./entryPathsWP.json')
        .pipe(jsonTransform(function(data, file) {
            log("pagina 0: " + bootstrapersObject.pagina1);
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





/*var jsonTransform = require('gulp-json-transform');
 var gulp = require('gulp');
 var webpack = require('webpack');
 var variante = require('./variante.json').min;

 gulp.task('default', function() {
 gulp.src('./tsconfig.json')
 .pipe(jsonTransform(function(data, file) {
 var pathsBootStrap = addRutas(["./rutasModulos/rutasCore.json",
 "./rutasModulos/rutasDC.json",
 "./rutasModulos/rutasGE.json"]);

 var tsConfig = {
 "compilerOptions": {
 "baseUrl": ".",
 "paths": pathsBootStrap
 }
 };

 return tsConfig
 }))
 .pipe(gulp.dest('./'))
 });

 function addRutas(listRutas) {
 var entryObjru={};
 listRutas.forEach(function (rutaAbsoluta) {
 var JsonRuta = require(rutaAbsoluta)
 JsonRuta.rutas.forEach(function(ruta){
 for (nombre in ruta){
 var nn = "" + ruta[nombre];
 nn = nn.replace("[variante]",variante);
 entryObjru[nombre]= [nn];
 }
 });
 })
 return entryObjru;
 }*/