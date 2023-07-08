const fs = require('fs-extra');
const concat = require('concat');
const glob = require('util').promisify(require('glob'));
(async function build() {
  try {
  /* 
  NOTE : below script is written to transform build styles.css to styles.js due to deprecation of extractCSS in angular 13
  ref : https://github.com/angular/angular-cli/issues/22198
  file write is used to append and prepend text , can be optimized if needed.
  */

  const stylesCSS = fs.readFileSync('dist/header-layout1/styles.css'); // reads css file
  const stylesJS = fs.openSync('dist/header-layout1/styles.js', 'w+'); // writes into js file
  const prependScript = Buffer.from(`const headerStyleElement = document.createElement('style');headerStyleElement.appendChild(document.createTextNode(\``);
  const appendScript = Buffer.from(`\`));document.getElementsByTagName('head')[0].appendChild(headerStyleElement);`)
  const length = prependScript.length+stylesCSS.length+appendScript.length;
  fs.write(stylesJS, `${prependScript}${stylesCSS}${appendScript}`, 0, length, 0); // adds file content
  fs.close(stylesJS);  

    const files = await glob(__dirname + '/dist/header-layout1/*.js');
    await fs.ensureDir('output');
    await concat(files, 'output/m1-header.js')
    console.info('\u001b[1;32m M1 Header built successfully!')
  } catch (error) {
    console.error("\u001b[1;31m Error creating M1 Header", error);
  }
  
})()
