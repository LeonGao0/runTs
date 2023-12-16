
## 题目：使用Promise实现一个延迟执行的函数。

要求：编写一个delay函数，接受一个延迟时间（以毫秒为单位）作为参数，并返回一个Promise。该Promise应在指定的延迟时间后解析为"done"。

示例用法和预期输出：
delay(2000).then(() => {
  console.log('done');
});
// 2秒后输出: "done"


## 题目：实现一个函数retry，接受一个异步操作函数和最大重试次数作为参数，返回一个Promise。该Promise应在异步操作成功时解析为操作的结果，如果操作失败，则根据最大重试次数进行重试，直到达到最大重试次数后才拒绝Promise并返回错误信息。

要求：

操作函数是一个返回Promise的异步函数，可以是任何异步操作，如网络请求、文件读取等。
如果操作函数成功执行，则Promise应该解析为操作结果。
如果操作函数执行失败，应该进行重试，直到达到最大重试次数。
每次重试之间应该有一个固定的延迟时间间隔。
示例用法和预期输出：

`function simulateAsyncOperation(): Promise<string> {
  return new Promise((resolve, reject) => {
    const random = Math.random();
    if (random < 0.8) {
      resolve('Operation succeeded');
    } else {
      reject('Operation failed');
    }
  });
}

retry(simulateAsyncOperation, 3)
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(error);
  });`

## 编写一个函数，接受一个 Promise 对象的数组作为参数，并返回一个新的 Promise 对象，当数组中所有的 Promise 都成功时，新的 Promise resolve，只要有一个Promise失败，新的 Promise即刻reject。

## 创建一个函数，接受一个包含多个异步操作的任务数组，要求只要有一个任务成功就立即返回成功结果，并终止其他任务的执行。

## 实现一个带有超时功能的 Promise，即在指定时间内没有得到处理结果，则自动reject。
