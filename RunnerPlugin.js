function RunnerPlugin(callbacks){

        callbacks = Object.assign({}, callbacks);

        this.CompilerEvents.forEach(function(entry){
           entry.callback =  callbacks[entry.event];
        });

        this.CompilationEvents.forEach(function(entry){
           entry.callback =  callbacks[entry.event];
        });
};

RunnerPlugin.prototype.CompilerEvents = [
        {event: "entry-option", type:"bailResult"},
        {event: "after-plugins", type:"sync"},
        {event: "after-resolvers", type:"sync"},
        {event: "environment", type:"sync"},
        {event: "after-environment", type:"sync"},
        {event: "before-run", type:"async"},
        {event: "run", type:"async"},
        {event: "watch-run", type:"async"},
        {event: "normal-module-factory", type:"sync"},
        {event: "context-module-factory", type:"sync"},
        
        {event: "before-compile", type:"async"},
        {event: "compile", type:"sync"},
        {event: "this-compilation", type:"sync"},
        {event: "compilation", type:"sync", 
            compilationEvents : true },
        {event: "make", type:"parallel"},
        {event: "after-compile", type:"async"},
        {event: "should-emit", type:"bailResult"},
        {event: "need-additional-pass",  type:"bailResult"},
        {event: "additional-pass", type:"bailResult"},
        {event: "emit", type:"async"},
        {event: "after-emit", type:"async"},
        
        {event: "done", type:"sync"},
        {event: "failed", type:"sync"},
        {event: "invalid", type:"sync"},
        ];


RunnerPlugin.prototype.CompilationEvents = [
                {event: 'normal-module-loader', type:"async"},,
                {event: 'seal', type:"async"},
                {event: 'optimize', type:"async"},
                {event: 'optimize-tree', type:"async", callback: RunnerPlugin.onCompilationOptimizeTree},
                {event: 'optimize-modules', type:"async"},
                {event: 'after-optimize-modules', type:"async"},
                {event: 'optimize-chunks', type:"async"},
                {event: 'after-optimize-chunks', type:"async"},
                {event: 'revive-modules', type:"async"},
                {event: 'optimize-module-order', type:"async"},
                {event: 'optimize-module-ids', type:"async"},
                {event: 'after-optimize-module-ids', type:"async"},
                {event: 'record-modules', type:"async"},
                {event: 'revive-chunks', type:"async"},
                {event: 'optimize-chunk-order', type:"async"},
                {event: 'optimize-chunk-ids', type:"async"},
                {event: 'after-optimize-chunk-ids', type:"async"},
                {event: 'record-chunks', type:"async"},
                {event: 'before-hash', type:"async"},
                {event: 'after-hash', type:"async"},
                {event: 'before-chunk-assets', type:"async"},
                {event: 'additional-chunk-assets', type:"async"},
                {event: 'record', type:"async"},
                {event: 'additional-assets', type:"async"},
                {event: 'optimize-chunk-assets', type:"async"},
                {event: 'after-optimize-chunk-assets', type:"async"},
                {event: 'optimize-assets', type:"async"},
                {event: 'after-optimize-assets', type:"async"},
                {event: 'build-module', type:"async"},
                {event: 'succeed-module', type:"async"},
                {event: 'failed-module', type:"async"},
                {event: 'module-asset', type:"async"},
                {event: 'chunk-asset', type:"async"},
];



RunnerPlugin.prototype.apply = function(compiler){
    
    var runner = this;
    this.CompilerEvents.forEach(function(entry){
        compiler.plugin(entry.event, function(compilation, callback) {
            runner.onCompilerEvents(runner, compiler, entry , compilation, callback);
        });  
    });
};

RunnerPlugin.prototype.onCompilerEvents = function onCompilationEvents(runner, compiler, entry , compilation, callback){
    console.log("Runner Plugin>>" + entry.event);

    if(entry.callback && typeof entry.callback === 'function'){
        entry.callback(compilation, callback);
    }

    if(typeof compilation === 'string'){
        console.log("Runner Plugin>>" + compilation);
    }
    else if (typeof compilation === 'object' && compilation.plugin && entry.compilationEvents){
        runner.CompilationEvents.forEach(function(e){
            compilation.plugin(e.event, function(com, callback1, callback2){
                runner.onCompilationEvents(runner, e,  com, callback1, callback2);
            });            
        });        
    }
    else if (typeof compilation === 'function'){
        compilation();
    }

    if(typeof callback === 'function'){
        callback();
    }
    else if(typeof callback === 'string'){
        console.log("Runner Plugin>>" + callback);
    }  
}

RunnerPlugin.prototype.onCompilationEvents = function onCompilationEvents(runner, entry, compilation, callback1, callback2){
    console.log("Runner Plugin>>" + entry.event);

    if(entry.callback && typeof entry.callback === 'function'){
        entry.callback(runner, entry, compilation, callback1, callback2);
    }

    if(typeof compilation === 'string'){
        console.log("Runner Plugin>>" + compilation);
    }
    else if(typeof compilation === 'function') {
        compilation();
    }

    if(typeof callback1 === 'string'){
       console.log("Runner Plugin>>" + callback1);
    }else if(typeof callback1 === 'function'){
       callback1();
    }

    if(typeof callback2 === 'string'){
       console.log("Runner Plugin>>" + callback2);
    }else if(typeof callback2 === 'function'){
       callback2();
    }

}

RunnerPlugin.prototype.onCompilationOptimizeTree = function onCompilationOptimizeTree(runner, entry, chunks, modules, callback2){
    
}

RunnerPlugin.prototype.onCompilationOptimizeTree = function onCompilationOptimizeTree(runner, entry, chunks, modules, callback2){
    
}

module.exports = RunnerPlugin;