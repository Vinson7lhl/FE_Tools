(function() {
    var config = {
        paths: {
            jQuery: [
                '../../lib/jquery-3.0.0'
            ]
        },
        shim: {
            jQuery: {
                deps: [],
                exports: '$'
            }
        }
    };
    require.config(config);
})();