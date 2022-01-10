const ncp = require("ncp");
const fs = require("fs");

/**
 * ----------------------------------
 * COPY CHUNKS
 * ----------------------------------
 */
ncp("./build/static/js", "../view/frontend/web/js", function (err) {
  if (err) { return console.log(err); }
  return console.log("Copy Javascript Done")
})

ncp("./build/static/css", "../view/frontend/web/css/source", function (err) {
  if (err) { return console.log(err); }
  return console.log("Copy CSS Done")
})



/**
 * ----------------------------------
 * READ INDEX.HTML BUILD
 * THEN MERGE TO TEMPLATES
 * ----------------------------------
 */
fs.readFile('./build/index.html', 'utf8', function (err, data) {
  let string = data
    .replace(/\/static\/media/ig, "<?php echo $this->getViewFileUrl('Sandika_PwaCheckout::images'); ?>")
    .replace(/\/static\/js/ig, "<?php echo $this->getViewFileUrl('Sandika_PwaCheckout::js'); ?>")
    .replace(/\/static\/css/ig, "<?php echo $this->getViewFileUrl('Sandika_PwaCheckout::css/source'); ?>");

  fs.writeFile("../view/frontend/templates/index.phtml", string, (err) => {
    if (err)
      console.log(err);
    else {
      console.log("Call Chunks On Static Html Done");
    }
  });
});



/**
 * ----------------------------------
 * COPY CSS TO THE HEAD OF XML
 * THEN MERGE TO TEMPLATES
 * ----------------------------------
 */
var cssList = fs.readdirSync('./build/static/css')
var cssHead = `
<?xml version="1.0"?>
<page xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="urn:magento:framework:View/Layout/etc/page_configuration.xsd">
  <head>
  ${cssList.map((css) => (`<css src="Sandika_PwaCheckout::/css/${css}"/>`)).join(' ')}
  </head>
</page>
`
fs.writeFile("../view/frontend/layout/default.xml", cssHead, (err) => {
  if (err)
    console.log(err);
  else {
    console.log("Call CSS On Default.xml Done");
  }
});
