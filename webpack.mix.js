const mix = require('laravel-mix');

mix.js([
    './private/worker.js'
], './assets/js/worker.js')
.babel([
    './assets/js/worker.js'
], './assets/js/worker.js');

