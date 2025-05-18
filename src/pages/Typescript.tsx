export const Typescript = () => {
  return (
    <>
      <div>Typescript</div>
      Выгоды использования{' '}
      <ul>
        <li>Автодополнение</li>
        <li>Поиск мест использования и переименоание и т д IDE вообщем</li>
        <li>
          Раннее выявление ошибок на этапе написания кода компиляции а не на
          этапе исполнения
        </li>
        <li>самодокументация</li>
        <li>любой js код это по сути ts код</li>
        <li>типизация - интерфейсы дженерики утилиты и т д</li>
      </ul>
      <p>
        Js - слабая(string + number) и динамическая типизация(let a = 10; a =
        'str'), TS - сильная и статическая. TS это надстройка над JS, появляются
        еще типы never, any, unknown, void, литералы, enum, дженерики, union,
        intersection, interface, utils(composite types)
      </p>
      <p>
        в ts структурная типизация, значит в тип {'{'} a: number {'}'} можно
        передать {'{'} a: number; b:string; {'}'}
      </p>
      <p>
        any - отключает любую типизацию, noImplicit any - не указал тип - ошибка
      </p>
      <p>
        unknown - является супер типом, поэтому let c:unknown; c = 100;
        работает, так же unknown вынуждает использовать type guard чтобы
        обратиться к свойствам
      </p>
      <p>
        never - является подтипом всех типов, если функция выкидывает ошибку и
        то результат never или если в switch case if уже нет условий и еще
        выходит что const _exhaustiveCheck: never = action; если action не
        never" будет ошибка
      </p>
      <p>
        Дженерики - механизм позволяющий функциям, классам и типам работать с
        разными типами данных. Generic Constraint -{' '}
        {'<T extends { length: number }>'} <br />
        Generic default {'<T = string>'} <br />
        Conditional Types
        {
          "type isString<T> = T extends string ? true :false; const str: isString<'asd'> = true;"
        }
      </p>
      <p>Сужение narrowing типов - используем typeof, if, instanceof ...</p>
      <p>
        Type Guard{' '}
        {
          'const isCat = (arg: Cat | Dog): arg is Cat => { if((arg as Cat).mya) return true; else return false }'
        }
      </p>
      <p>Неявное преобразование типов const b = 100+'asdf';</p>
      <p>
        {`Явное преобразование as 
    interface User {
      name: string;
      age: number;
    }

    const obj = {
      name: 'Vasya',
    } as User;

    const obj2 = {
      name: 'Vasya', 
      age: 100
    } satisfies User;

    const obj3 = {
      name: 'Vasya' // @ts-expect-error: Property 'age' is missing
    } satisfies User;
  `}
      </p>
      <p>
        разница между типами и интерфейсами, для примитивов используем типы,
        интерфейсы могут иметь не уникальные значения и они объединяются
      </p>
      <p>{`
      type ReadOnlyType<T> = {
  readonly [P in keyof T]: T[P]  // Верно!
}`}</p>
      <p>{` remapping
      type OmitType<T, K extends keyof T> = {
  [P in keyof T as P extends K ? never : P]: T[K]
}`}</p>
      <p>{`
  type MutableNotPartial<T> = {
  -readonly [K in keyof T]-?: T[K]
}
}`}</p>
      <p>
        {`
  function assertIsString(val: any): asserts val is string {
  if (typeof val !== "string") {
    throw new AssertionError("Not a string!");
  }
}`}
      </p>
      <p>{`type MyReturn<T> = T extends (...args: any[]) => infer U ? U : never;`}</p>
      <p>{`type MyParam<T> = T extends (...args: infer P) => any ? P : never;`}</p>
    </>
  );
};
