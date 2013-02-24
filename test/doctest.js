// Generated by CoffeeScript 1.4.0
var actual, code, d, exec, expected, expectedErrorMessage, f, fail, fs, i, lastTestTimestamp, line, lines, m, match, message, nFailed, nTests, outcome, path, repr, t0, trim, _i, _len, _ref;

fs = require('fs');

path = require('path');

exec = require('../lib/compiler').exec;

match = require('../lib/vocabulary')['≡'];

repr = JSON.stringify;

trim = function(s) {
  return s.replace(/(^ +| +$)/g, '');
};

nTests = nFailed = 0;

fail = function(reason, err) {
  nFailed++;
  console.error(reason);
  if (err) {
    return console.error(err.stack);
  }
};

t0 = Date.now();

d = __dirname + '/../src';

lastTestTimestamp = 0;

_ref = fs.readdirSync(d);
for (_i = 0, _len = _ref.length; _i < _len; _i++) {
  f = _ref[_i];
  if (!(f.match(/^\w+.coffee$/))) {
    continue;
  }
  lines = fs.readFileSync(d + '/' + f, 'utf8').split('\n');
  i = 0;
  while (i < lines.length) {
    line = lines[i++];
    while (i < lines.length && (m = lines[i].match(/^ *# *\.\.\.(.*)$/))) {
      line += '\n' + m[1];
      i++;
    }
    if (m = line.match(/^ *# {4,}([^]*)⍝([^]+)$/)) {
      nTests++;
      code = trim(m[1]);
      outcome = trim(m[2]);
      if (m = outcome.match(/^returns ([^]*)$/)) {
        expected = exec(m[1]);
        try {
          actual = exec(code);
          if (!match(exec(code), expected)) {
            fail("Test " + (repr(code)) + " failed: expected " + (repr(expected)) + " but got " + (repr(actual)));
          }
        } catch (e) {
          fail("Test " + (repr(code)) + " failed with " + e, e);
        }
      } else if (m = outcome.match(/^fails( [^]*)?$/)) {
        expectedErrorMessage = m[1] ? eval(m[1]) : '';
        try {
          exec(code);
          fail("Code " + (repr(code)) + " should have failed, but didn't");
        } catch (e) {
          if (expectedErrorMessage && e.message.slice(0, expectedErrorMessage.length) !== expectedErrorMessage) {
            fail("Code " + (repr(code)) + " should have failed with " + (repr(expectedErrorMessage)) + ", but it failed with " + (repr(e.message)), e);
          }
        }
      } else {
        fail("Unrecognised expectation in doctest string " + (repr(line)));
      }
      if (Date.now() - lastTestTimestamp > 100) {
        process.stdout.write(nTests + (nFailed ? " (" + nFailed + " failed)" : '') + '\r');
        lastTestTimestamp = Date.now();
      }
    }
  }
}

message = nFailed ? "" + nFailed + " out of " + nTests + " tests failed" : "All " + nTests + " tests passed";

message += " in " + (Date.now() - t0) + " ms.";

console.info(message);
