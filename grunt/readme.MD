# Grunt Stuff

## Prepare grunt project
* **package.json**: metadata for project, grunt and grunt plugins should in `devDependencies`(```$npm install -D```)
  * at **root** directory of project, next to Gruntfile(```$npm init```)
  * should commit along with project source

* **Gruntfile**: configure and define task, load grunt plugins 
  * use ```$ npm install <module> --save-dev ``` to install grunt and grunt plugins

## The Gruntfile
### A ```Gruntfile``` is comprised of the following parts:
* The `wrapper` function
* Project and task configuration
* Loading Grunt plugins and tasks
* Custom tasks

### The `wrapper` function
```Javascript
module.exports = function(grunt) {
  // Do grunt-related things in here
};
```

### Project and task configuration
* Most Grunt tasks rely on configuration data defined in an ```object``` passed to the ```grunt.initConfig``` method
* You can also programmatically generate the configuration if necessary
* Like most tasks, the ```grunt-contrib-uglify``` plugin's uglify task expects its configuration to be specified in a property of the `same name`

### Loading Grunt plugins and tasks
```Javascript
// Load the plugin that provides the "uglify" task.
grunt.loadNpmTasks('grunt-contrib-uglify');
```

### Custom tasks
* You can configure Grunt to run one or more tasks
```Javascript
// Custom task(s)
// Any number of tasks (with or without arguments) may be specified in the array.
grunt.registerTask('custom', ['task1', 'task2']);
```


## Configuring tasks
### Grunt configurations
Task configuration is specified in your Gruntfile via the ```grunt.initConfig``` method. This configuration will mostly be under `task-named properties`,  but may contain any arbitrary data. As long as properties don't conflict with properties your tasks require, they will be otherwise ignored.
```Javascript
grunt.initConfig({
  concat: {
    // concat task configuration goes here.
  },
  uglify: {
    // uglify task configuration goes here.
  },
  // Arbitrary non-task-specific properties.
  my_property: 'whatever',
  my_src_files: ['foo/*.js', 'bar/*.js'],
});
```

### Task Configuration and Targets
When a task is run, Grunt looks for its configuration under a `property of the same name`. Multi-tasks can have multiple configurations, defined using arbitrarily named "targets." In the example below, the concat task has foo and bar targets, while the uglify task only has a bar target.
```Javascript
grunt.initConfig({
  concat: {
    foo: {
      // concat task "foo" target options and files go here.
    },
    bar: {
      // concat task "bar" target options and files go here.
    },
  },
  uglify: {
    bar: {
      // uglify task "bar" target options and files go here.
    },
  },
});
```
Specifying both a task and target like ```grunt concat:foo``` or ```grunt concat:bar``` will process just the specified target's configuration, while running grunt concat will `iterate over all targets`, processing each in turn. Note that if a task has been renamed with ```grunt.task.renameTask```, Grunt will look for a property with the new task name in the config object.

### Options
Inside a task configuration, an `options` property may be specified to override `built-in defaults`.
In addition, each target may have an `options` property which is specific to that target. Target-level options will `override task-level options`.
```Javascript
grunt.initConfig({
  concat: {
    options: {
      // Task-level options may go here, overriding task defaults.
    },
    foo: {
      options: {
        // "foo" target options may go here, overriding task-level options.
      },
    },
    bar: {
      // No options specified; this target will use task-level options.
    },
  },
});
```

### Files
Because most tasks perform `file operations`, Grunt has powerful abstractions for declaring on which files the task should operate. 
There are several ways to define `src-dest (source-destination)` file mappings, offering varying degrees of verbosity and control. 
Any multi task will understand all the following formats, so choose whichever format best meets your needs.

### Compact Format
This form allows a `single` src-dest (source-destination) file mapping per-target. 
It is most commonly used for `read-only tasks`, like grunt-contrib-jshint, where a single src property is needed, and no dest key is relevant. 
This format also supports additional properties per src-dest file mapping.
```Javascript
grunt.initConfig({
  jshint: {
    foo: {
      src: ['src/aa.js', 'src/aaa.js']
    },
  },
  concat: {
    bar: {
      src: ['src/bb.js', 'src/bbb.js'],
      dest: 'dest/b.js',
    },
  },
});
```

### Files Object Format
This form supports `multiple src-dest mappings` per-target, where the `property name is the destination` file, and its `value is the source file(s)`. 
Any number of src-dest file mappings may be specified in this way, but additional properties may not be specified per mapping.
```Javascript
grunt.initConfig({
  concat: {
    foo: {
      files: {
        'dest/a.js': ['src/aa.js', 'src/aaa.js'],
        'dest/a1.js': ['src/aa1.js', 'src/aaa1.js'],
      },
    },
    bar: {
      files: {
        'dest/b.js': ['src/bb.js', 'src/bbb.js'],
        'dest/b1.js': ['src/bb1.js', 'src/bbb1.js'],
      },
    },
  },
});
```

### Files Array Format
This form supports multiple src-dest file mappings per-target, while also allowing additional properties per mapping.
```Javascript
grunt.initConfig({
  concat: {
    foo: {
      files: [
        {src: ['src/aa.js', 'src/aaa.js'], dest: 'dest/a.js'},
        {src: ['src/aa1.js', 'src/aaa1.js'], dest: 'dest/a1.js'},
      ],
    },
    bar: {
      files: [
        {src: ['src/bb.js', 'src/bbb.js'], dest: 'dest/b/', nonull: true},
        {src: ['src/bb1.js', 'src/bbb1.js'], dest: 'dest/b1/', filter: 'isFile'},
      ],
    },
  },
});
```
