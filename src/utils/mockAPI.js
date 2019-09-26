import timeElapsedClass from './timeElapsedClassTwo';
import timeElapsedModule from './timeElapsedModule';

const timeElapsedClass1 = new timeElapsedClass();
const timeElapsedClass2 = new timeElapsedClass();

const timeElapsedModule1 = timeElapsedModule();
const timeElapsedModule2 = timeElapsedModule();

function closureFuncDemo1(lexicalEnvVar) {
  return function(y) {
    return `${lexicalEnvVar}-${y}`;
  };
}

// ------------------------------------------------------------------------

export function getRandomInt() {
  return Math.floor(Math.random() * (100 - 1)) + 1;
}

function basicPromiseResolveRejectImmediate(p) {
  return new Promise((resolve, reject) => {
    if (p) {
      //
    } else {
      //
    }
  });
}

function basicPromiseResolvePending() {
  return new Promise(resolve => {
    setTimeout(() => resolve( {
      city: 'New York',
      forecast: 'partly cloudy'
    } ), 200);
  });
}

function awaitForReturnValueOfAFunction(r) {
  return r;
}

function startSetTimeout(delay) {
  setTimeout(() => console.log('###### mockAPI > startSetTimeout > secondsElapsed: ', timeElapsedModule1.getSecondsElapsed()), delay);
}

function startResolvedPromise(delay) {
  return new Promise(resolve => {
    setTimeout(() => resolve( timeElapsedModule1.getSecondsElapsed() ), delay);
    // setTimeout(() => resolve( timeElapsedClass1.getSecondsElapsed() ), delay);
  });
}

function startResolvedRejectedPromise(v, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (v === 'resolve') {
        resolve({
          value: `${v}`,
          // timeElapsed: timeElapsedClass1.getSecondsElapsed(),
          timeElapsed: timeElapsedModule1.getSecondsElapsed(),
          time: Date.now(),
          delay: `${delay}`,
          message: 'RESOLVED! This came from the mock API.'
        });
      } else {
        reject({
          value: `${v}`,
          // timeElapsed: timeElapsedClass1.getSecondsElapsed(),
          timeElapsed: timeElapsedModule1.getSecondsElapsed(),
          time: Date.now(),
          delay: `${delay}`,
          message: 'REJECTED! This came from the mock API.'
        });
      }
    }, delay);
  });
};

function postRequestConcatResolveRejectPromise(dataObj, r, delay) {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (r === 'resolve') {
        resolve({
          value: `${r}`,
          timeElapsed: timeElapsedModule1.getSecondsElapsed(),
          time: Date.now(),
          delay: `${delay}`,
          message: 'RESOLVED! 200 - Data Found.',
          status: 200,
          data: dataObj.data.concat(dataObj.newData)
        });
      } else {
        reject({
          value: `${r}`,
          timeElapsed: timeElapsedModule1.getSecondsElapsed(),
          time: Date.now(),
          delay: `${delay}`,
          message: 'REJECTED! 404 - Data Not Found.',
          status: 404,
          // data: dataObj.data
        });
      }
    }, delay);
  });
  return promise;
};

async function doSomeAsyncSyncLikeOperations() {

  // -------------------------

  const p = await startResolvedPromise(1500);

  // -------------------------

  startSetTimeout(10000);

  // -------------------------

  const g = await startResolvedPromise(4000);

  // -------------------------

  const b = await startResolvedPromise(100);

  const z = await startResolvedPromise(4000);

  // -------------------------

  timeElapsedClass2.setStartTime();
  timeElapsedModule2.setStartTime();

}

// ------------------------------------------------------------------------

function doSomePromiseAll() {

  const timeoutArrayLong = [];
  timeoutArrayLong.push(startResolvedPromise(2500));
  timeoutArrayLong.push(startResolvedPromise(22250));

  // non-promise iterable values are ignored, but counted in the returned promise array
  const timeoutArrayFast = [];
  timeoutArrayFast.push(startResolvedPromise(100));
  timeoutArrayFast.push(9999999);
  timeoutArrayFast.push(startResolvedPromise(300));
  timeoutArrayFast.push('FooooooBerrrrrrrrr');

  const pAlong = Promise.all(timeoutArrayLong);

  pAlong
    .then(values => {
      //
    })

  const pAfast = Promise.all(timeoutArrayFast);

  pAfast
    .then(values => {
      //
    })
}

// =========================================================================
// =========================================================================

export async function getSomeAsyncData(location) {

  timeElapsedClass1.setStartTime();
  timeElapsedModule1.setStartTime();

  // doSomeAsyncSyncLikeOperations();
  // await doSomeAsyncSyncLikeOperations();

  const response = await startResolvedRejectedPromise('resolve', 1200);
  return await response;
}

// ------------------------------------------------------------------------

export function postRequestConcatExportASYNC(req) {

  timeElapsedModule1.setStartTime();

  // doSomePromiseAll();

  const promise = postRequestConcatResolveRejectPromise(req, 'resolve', 1600);

  const thenProm = promise
    .then(result => {
      result.message += ' P1,'
      return result;
    })
    .then(result => {
      result.message += ' P2,'
      return result;
    })
    .then(result => {
      result.message += ' P3,'
      return result;
    })

  return thenProm;

}

// ------------------------------------------------------------------------

export async function postRequestConcatExportSYNC(req) {

  timeElapsedModule1.setStartTime();

  // resolved promise object returned
  let promise = await postRequestConcatResolveRejectPromise(req, 'resolve', 1600);

  // return await promise;
  return promise;
}

// ------------------------------------------------------------------------

export function mockAPI(doWhat, delay) {
  return new Promise(( resolve ) => {
    setTimeout( () => resolve( doWhat() ), delay);
  });
}
