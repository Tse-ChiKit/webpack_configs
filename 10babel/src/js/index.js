import "../css/index.css";
import "../css/index.scss";

import "core-js/features";

function test(a, b) {
  return a + b;
}
console.log(`xie${2}`);
console.log(test(2, 3));

const fun1 = (a) => {
  console.log(a + 10);
  window.alert(a + 10);
};

const p = new Promise((res) => {
  res(12);
});

p.then((val) => {
  console.log(val);
});

fun1(12);
