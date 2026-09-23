const a = require('./a.cjs'); // 此时 a 还没执行完，返回空对象 {}
console.log('b: ', a);
module.exports = { b: 2 };
