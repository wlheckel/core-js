import { DESCRIPTORS } from '../helpers/constants';

if (DESCRIPTORS) QUnit.test('Uint8Clamped conversions', function (assert) {
  var uint8clamped = new Uint8ClampedArray(1);
  var uint8array = new Uint8Array(uint8clamped.buffer);

  function toString(it) {
    return it === 0 && 1 / it === -Infinity ? '-0' : it;
  }

  var data = [
    [0, 0, [0]],
    [-0, 0, [0]],
    [1, 1, [1]],
    [-1, 0, [0]],
    [1.1, 1, [1]],
    [-1.1, 0, [0]],
    [1.9, 2, [2]],
    [-1.9, 0, [0]],
    [127, 127, [127]],
    [-127, 0, [0]],
    [128, 128, [128]],
    [-128, 0, [0]],
    [255, 255, [255]],
    [-255, 0, [0]],
    [255.1, 255, [255]],
    [255.9, 255, [255]],
    [256, 255, [255]],
    [32767, 255, [255]],
    [-32767, 0, [0]],
    [32768, 255, [255]],
    [-32768, 0, [0]],
    [65535, 255, [255]],
    [65536, 255, [255]],
    [65537, 255, [255]],
    [65536.54321, 255, [255]],
    [-65536.54321, 0, [0]],
    [2147483647, 255, [255]],
    [-2147483647, 0, [0]],
    [2147483648, 255, [255]],
    [-2147483648, 0, [0]],
    [2147483649, 255, [255]],
    [-2147483649, 0, [0]],
    [4294967295, 255, [255]],
    [4294967296, 255, [255]],
    [4294967297, 255, [255]],
    [9007199254740991, 255, [255]],
    [-9007199254740991, 0, [0]],
    [9007199254740992, 255, [255]],
    [-9007199254740992, 0, [0]],
    [9007199254740994, 255, [255]],
    [-9007199254740994, 0, [0]],
    [Infinity, 255, [255]],
    [-Infinity, 0, [0]],
    [-1.7976931348623157e+308, 0, [0]],
    [1.7976931348623157e+308, 255, [255]],
    [5e-324, 0, [0]],
    [-5e-324, 0, [0]],
    [NaN, 0, [0]]
  ];
  for (var i = 0, length = data.length; i < length; ++i) {
    var value = data[i][0];
    var conversion = data[i][1];
    var little = data[i][2];
    uint8clamped[0] = value;
    assert.same(uint8clamped[0], conversion, 'Uint8ClampedArray ' + toString(value) + ' -> ' + toString(conversion));
    assert.arrayEqual(uint8array, little, 'Uint8ClampedArray ' + toString(value) + ' -> [' + little + ']');
  }
});
