/* Exercise the geometry/readouts and 2D fallback without a GPU or network. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const elements = {};
const defaults = { theta: '0', alpha: '30', h: '5', r: '2' };
function element(id, extra = {}) {
  return elements[id] = { textContent: '', hidden: true, handlers: {},
    addEventListener(event, handler) { this.handlers[event] = handler; },
    setAttribute() {}, ...extra };
}
for (const [id, value] of Object.entries(defaults)) {
  element(id + 'Slider', { value, defaultValue: value });
  element(id + 'Val');
}
for (const id of ['xcVal', 'ycVal', 'aVal', 'bVal', 'demo-status', 'reset-demo', 'canvas3d_container']) element(id);
let drawCount = 0;
const drawing = new Proxy({}, { get() { return () => { drawCount++; }; }, set() { return true; } });
element('canvas2d', { parentElement: { clientWidth: 600, clientHeight: 450 }, getContext() { return drawing; } });
vm.runInNewContext(fs.readFileSync(path.join(__dirname, '../demos/cylinder/cylinder.js'), 'utf8'), {
  document: { getElementById(id) { assert.ok(elements[id], 'Unknown element ' + id); return elements[id]; } },
  window: { devicePixelRatio: 2, addEventListener() {} },
  ResizeObserver: class { observe() {} }
});
assert.match(elements['demo-status'].textContent, /top view and all controls still work/);
assert.equal(elements['demo-status'].hidden, false);
assert.ok(drawCount > 0, '2D drawing should run without Three.js');
assert.equal(elements.aVal.textContent, '2.31');
assert.equal(elements.xcVal.textContent, '2.89');
assert.equal(elements.canvas2d.width, 1200, 'Canvas should account for device pixel ratio');

for (const [key, value] of Object.entries({ theta: '90', alpha: '60', h: '10', r: '3' })) elements[key + 'Slider'].value = value;
elements.thetaSlider.handlers.input();
assert.equal(elements.aVal.textContent, '6.00');
assert.equal(elements.bVal.textContent, '3.00');
assert.equal(elements.xcVal.textContent, '0.00');
assert.equal(elements.ycVal.textContent, '17.32');

for (const [key, value] of Object.entries({ theta: '360', alpha: '75', h: '15', r: '5' })) elements[key + 'Slider'].value = value;
elements.alphaSlider.handlers.input();
assert.equal(elements.aVal.textContent, '19.32');
assert.equal(elements.xcVal.textContent, '55.98');
elements['reset-demo'].handlers.click();
for (const [key, value] of Object.entries(defaults)) assert.equal(elements[key + 'Slider'].value, value);
assert.equal(elements.aVal.textContent, '2.31');
assert.equal(elements.ycVal.textContent, '0.00');
console.log('PASS: original geometry values, extrema, reset, pixel density, and 2D fallback without WebGL or Three.js.');
