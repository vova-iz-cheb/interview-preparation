import { useEffect, useRef } from 'react';
import './TheoryEventLoop.scss';

export const TheoryEventLoop = () => {
  const time = useRef(Date.now());
  // 5 idle всегда в конце
  // requestIdleCallback(() => {
  //   console.log('5 requestIdleCallback всегда в конце');
  // });

  // // 3 requestAnimationFrame
  // requestAnimationFrame(() => {
  //   console.log('3 1 requestAnimationFrame next paint 16ms');
  // });

  // // 4 macro setTimeout setInterval setImmediate события DOM (click, load, и т.д.) MessageChannel
  // setTimeout(() => {
  //   console.log('4 macro setTimeout 1');
  // });
  // setTimeout(() => {
  //   console.log('4 macro setTimeout 2');
  // }, 1);
  // requestAnimationFrame(() => {
  //   console.log('3 2 requestAnimationFrame next paint 16ms');
  // });

  // // 2 micro tasks - promise callbacks, mutation observer callback, queueMicrotask
  // queueMicrotask(() => console.log('2 micro queueMicrotask'));
  // Promise.resolve().then(() => console.log('2 micro promise then'));

  // // 1 sync code
  // console.log('1 sync code');
  // new Promise((res) => {
  //   console.log('1 sync code in promise');
  //   res(1);
  // });

  useEffect(() => {
    console.log('begin', Date.now(), time.current, time.current + 3000);
    // while (Date.now() < time.current + 3000) {
    //   console.log('1');

    //   requestIdleCallback(() => {
    //     console.log('5 requestIdleCallback всегда в конце');
    //   });

    //   setTimeout(() => {
    //     console.log('4 macro setTimeout');
    //   });

    //   requestAnimationFrame(() => {
    //     console.log('3 requestAnimationFrame next paint 16ms');
    //   });

    //   queueMicrotask(() => console.log('2 micro queueMicrotask'));

    //   console.log('2');
    // }
    let i = 0;
    console.log('i', i);
    const fn = () => {
      console.log('i', i);
      setTimeout(() => console.log('timeout'));
      requestAnimationFrame(() => console.log('requestAnimationFrame'));
      requestIdleCallback(() => console.log('requestIdleCallback'));
      i++;

      if (i < 5000) setTimeout(fn);
      // if (i < 100000) setTimeout(fn); // not block render
      // if (i < 100000) queueMicrotask(fn); // block render
    };
    setTimeout(() => {
      fn();
    }, 3000);
    console.log('end');
  }, []);

  return (
    <>
      <div>EventLoop see console</div>
      Бесконечный цикл с очередью(fifo) тасок - micro and macro, данные хранятся
      в куче
      <p>
        micro таски выполняются все сразу и блокируют перерисовку, если есть
        очередь из макрозадач и одна выполнилась потом сразу же чекаются
        микротаски и опять выполняются все
      </p>
      <p>после всех микрозадач - рендер и макрозадача и опять микро</p>
      <div className='red'>123</div>
    </>
  );
};
