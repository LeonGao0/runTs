
/** problem 1 */
function delay(time: number): Promise<string> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('done');
    }, time);
  })
}

// delay(2000).then((value) => {
//   console.log(value)
// })

/** problem 2 */
/** answer 1 */
// function retry<T>(handle: () => Promise<T>, retryTime: number = 3): Promise<T> {
//   return new Promise((resolve, reject) => {
//     handle().then(resolve).catch(() => {
//       if (retryTime > 0) {
//         retryTime--;
//         setTimeout(() => {
//           retry(handle, retryTime).then(resolve).catch(reject);
//         }, 1000);
//       } else {
//         reject('retry time finish, process end');
//       }
//     })
//   })
// }

/** answer2 */
async function retry<T>(handle: () => Promise<T>, retryTime: number): Promise<T> {
  try {
    const p = await handle();
    return p;
  } catch (err) {
    if (retryTime > 0) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return retry(handle, retryTime - 1);
    } else {
      throw err;
    }
  }
}
// async function retry<T>(handle: () => Promise<T>, retryTime: number, delay = 1000): Promise<T> {
//   let result;
//   for (let i = 0; i < retryTime; i++) {
//     try {
//       const p = await handle();
//     } catch (err) {
//       if (i === retryTime -1) throw err;
//       console.log("🚀 ~ file: Hello.ts:51 ~ retryTime:", retryTime)
//       await sleep(delay); 
//       delay *= 2;
//     }
//   }
//   return result;
// }

// function sleep(ms: number) {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }

// function simulateAsyncOperation(): Promise<string> {
//   return new Promise((resolve, reject) => {
//     const random = Math.random();
//     console.log("🚀 ~ file: Hello.ts:33 ~ random:", random)
//     if (random < 0.15) {
//       resolve('Operation succeeded');
//     } else {
//       reject('Operation failed');
//     }
//   });
// }

// retry(simulateAsyncOperation, 5)
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((error) => {
//     console.error(error);
//   });

/** problem3 */
function promiseArray<T>(pArr: Promise<T>[]): Promise<T[]> {
  return new Promise<T[]>((resolve, reject) => {
    Promise.all(pArr).then(resolve).catch(reject);
  })
}

/** problem 4 */
async function racePromises(pArr) {
  let resolved = false;
  let rejectedCount = 0;
  for (const p of pArr) {
    try {
      const result = await p;
      if (!resolved) {
        resolved = true;
        return result;
      }
    } catch (error) {
      rejectedCount++;
    }
  }
  if (rejectedCount === pArr.length && !resolved) {
    throw new Error('All promises failed');
  }
}

const p1 = new Promise((resolve) => {
  setTimeout(() => {
    resolve('p1');
    console.log("🚀 ~ file: Hello.ts:103 ~ setTimeout ~ p1 done:");
  }, 1000);
})
const p2 = new Promise((resolve) => {
  setTimeout(() => {
    resolve('p2');
    console.log("🚀 ~ file: Hello.ts:103 ~ setTimeout ~ p2 done:");
  }, 2000);
})
const p3 = new Promise((resolve) => {
  setTimeout(() => {
    resolve('p3');
    console.log("🚀 ~ file: Hello.ts:103 ~ setTimeout ~ p3 done:");
  }, 3000);
})

// try {
//   await racePromises([p1, p2, p3]);
// } catch (error) {
//   console.error(error);
// }

/** problem 5 */
function withTimeout<T>(promise: () => Promise<T>, timeout: number): Promise<T> | Promise<unknown> {
  let timeoutId;
  let timeoutPromise = new Promise((resolve, reject) => {
    timeoutId = setTimeout(() => {
      reject(new Error('Promise timed out'));
    }, timeout);
  })

  return Promise.race([timeoutPromise, promise]).then(result => {
    clearTimeout(timeoutId);
    return result;
  });
}
