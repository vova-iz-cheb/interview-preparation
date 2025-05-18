import {
  Suspense,
  useEffect,
  lazy,
  use,
  useLayoutEffect,
  useState,
  JSX,
  useTransition,
} from 'react';

//3
const SlowComponent = lazy(
  () =>
    new Promise<{
      default: () => any;
    }>((res) => {
      setTimeout(() => {
        res({
          default: () => <div>privet</div>,
        });
      }, 5000);
    })
);

const pr = new Promise((r) => {
  setTimeout(() => {
    r('text');
  }, 3000);
});

function Message() {
  const messageContent: any = use(pr);
  return <p>Here is the message: {messageContent}</p>;
}

export const React18_19 = () => {
  // 1 тест батчинка в асинхронных функциях - смотри консоль
  // const [count, setCount] = useState(1);
  // const [anotherCount, setAnotherCount] = useState(100);

  // const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  // batching
  //   console.log('click start');
  //   setCount((x) => x + 1);
  //   setAnotherCount((x) => x + 1);
  //   console.log('click end');
  // };

  // useEffect(() => {
  //   // batching
  //   setTimeout(() => {
  //     console.log('timeout start');
  //     setCount((x) => x + 1);
  //     setAnotherCount((x) => x + 1);
  //     console.log('timeout end');
  //   }, 5000);
  // }, []);

  // console.log('render');

  //2
  const [a, setA] = useState(0);
  useEffect(() => {
    setA((x) => x + 1);
  }, []);

  useEffect(() => {
    console.log('effect 1 mount');
    return () => console.log('effect 1 unmount');
  }, [a]);

  useEffect(() => {
    console.log('effect 2 mount');
    return () => console.log('effect 2 unmount');
  }, [a]);

  useLayoutEffect(() => {
    console.log('layout effect mount');
    return () => console.log('layout effect unmount');
  }, [a]);

  // 3

  //4
  // const [isPending, startTransition] = useTransition();
  // const [input, setInput] = useState('');
  // const [list, setList] = useState([]);

  // const LIST_SIZE = 10000;

  // const handleChange = (e: any) => {
  //   const value = e.target.value;
  //   setInput(value);

  //   startTransition(() => {
  //     const newList = [];
  //     for (let i = 0; i < LIST_SIZE; i++) {
  //       newList.push(value);
  //     }
  //     setList(newList);
  //   });
  // };

  return (
    <>
      <p>
        Сначала реакт строит виртуальный дом, потом вносит изменения в
        реальный(разница), дальше вызывается useLayoutEffect (unmount, mount)
        потом repaint и уже дальше useEffect
      </p>
      {/* 1 <h3>тест батчинка в асинхронных функциях - смотри консоль</h3>
      <div>стейт count {count}</div>
      <div>стейт anotherCount {anotherCount}</div>
      <button onClick={handleClick}>Кликни</button> */}
      {/* 2 */}
      <h3>
        тест на useEffect {a}{' '}
        <button onClick={() => setA((a) => a + 1)}>increase a</button>
      </h3>
      {/* <h3>test suspense</h3>
      <Suspense fallback={<div>loading</div>}>
        <SlowComponent /> 
        <Message />
      </Suspense> */}

      {/* <h3>test transition</h3>
      <div>
        <input type='text' value={input} onChange={handleChange} />
        {isPending && <div>Loading...</div>}
        <ul>
          {list.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div> */}
    </>
  );
};
