## Get Started
```
npm i
npm run build
npm run bundle
```

## ProvidePlugin and wiredep
### Background
**wiredep** requires the depencency component out of bundler.  this could be done using webpack external.
when a page need to be previewed, wiredep instrucment dependencies as script tag in HTML, this will make the library variables available in window object.
In this case, we could use webpack `external` as follow to prevent the bundling and use wiredep as the
vendor of libraries.

### Case study
In dependency source code we don't control.
 1. global window.xxx module, like [tether](https://github.com/twbs/bootstrap/blob/v4.0.0-alpha.6/dist/js/bootstrap.js#L2978) in bootstrap.
    * for normal build case, we use wiredep to set `window.xxx` reference. we are good.
    * for bundle build case, we use **ProvidePlugin** to bundle those free variable here.
 2. umd/commonjs module. like [d3.chart](https://github.com/misoproject/d3.chart/blob/master/d3.chart.js#L8)
    * for normal build case, we use external to point `require('d3')` to `window.d3`
    * for bundle build case, we remove external from webpack config to enable `requrie('d3')` to resolve and bundle

In our own source code, we shall consistently use commonjs module, which is same as #2 above.

### Conclusion

**kinda repeating above, just categorized by normal and bundling case**

For normal build case, 
* In our own source, always use external to make all library out of bundling, but use `require('xxxx')` to reference.
* In dependencies source code, external should also cover both cases like `require('xxxx')` and window.xxx in dependency code 

For bundling case,
* In our own source, always use external to make all library out of bundling, but use `require('xxxx')` to reference.
* In dependencies source code, if __a dependency or dependency's dependency__ is used as free variable, we need to use **ProviderPlugin** to allow it to be bundled explicitly. 
  if `require('xxx')` was used, just need to make sure xxx could be resolved from current webpack setting.

### Caveat
We need to know what we are doing and what the package itself requires us to do. This is not an easy and confident practice thought.
