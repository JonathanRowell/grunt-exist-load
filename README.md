# grunt-exist-load

> Plugin to load a package into the eXist database

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-exist-load --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-exist-load');
```

## The "exist_load" task

### Overview
In your project's Gruntfile, add a section named `exist_load` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
	exist_load: {
		options: {
			host: 'localhost',
			port: 8080,
			loginUser: 'admin',
			loginPassword : ''
    },
    file: 'build/*.xar'
  },
});
```

### Options

#### options.host
Type: `String`
Default value: `'locahost'`

Name or I/P of host where the eXist database is running.

#### options.port
Type: `Integer`
Default value: `8080`

#### options.loginUser
Type: `String`
Default value: `admin`

#### options.loginPassword
Type: `String`
Default value: none

#### file
Type: `String`
Default value: none

The .xar file to install. If you use a version bump, you can simply use a * placeholder to match the name.


### Usage Examples


```js
grunt.initConfig({
  exist_load: {
    options: {
	    host: 'localhost',
		 port: 8080,
		 loginUser: 'admin',
		 loginPassword: 'admin'
	 },
    file: 'build/*.xar'
  },
});
```

```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
