import { BrowserRouter, Routes, Route, NavLink } from 'react-router';
import { Webpack } from '../pages/Webpack';
import { AlgBubbleSort } from '../pages/AlgBubbleSort';
import { Main } from '../pages/Main';
import './style.scss';
import { Todo } from '../pages/Todo';
import { Typescript } from '../pages/Typescript';
import { Theory } from '../pages/Theory';
import { TheoryCriticalRenderingPath } from '../pages/TheoryCriticalRenderingPath';
import { React18_19 } from '../pages/React18-19';
import { TheoryEventLoop } from '../pages/TheoryEventLoop';
import { ReduxComponent } from '../pages/redux';

export const App = () => {
  const classNameFn = ({ isActive }: { isActive: boolean }) =>
    isActive ? 'active' : 'not-active';

  return (
    <BrowserRouter>
      <header className='header'>Подготовка к собесам</header>
      <div className='container'>
        <menu className='menu'>
          <NavLink to='/todo' className={classNameFn}>
            TODO
          </NavLink>
          <NavLink to='/react' className={classNameFn}>
            React
          </NavLink>
          <NavLink to='/webpack' className={classNameFn}>
            Webpack
          </NavLink>
          <NavLink to='/typescript' className={classNameFn}>
            Type Script
          </NavLink>
          <NavLink to='/theory' className={classNameFn}>
            Theory
          </NavLink>
          <NavLink to='/theory-crp' className={classNameFn}>
            Theory Critical Rendering Path
          </NavLink>
          <NavLink to='/theory-event-loop' className={classNameFn}>
            Theory EventLoop
          </NavLink>
          <NavLink to='/alg-sort-bubble' className={classNameFn}>
            Алгоритмы. Сортировка пузырьком
          </NavLink>
          <NavLink to='/redux' className={classNameFn}>
            Redux tool kit
          </NavLink>
        </menu>
        <main className='main'>
          <Routes>
            <Route path='alg-sort-bubble' element={<AlgBubbleSort />} />
            <Route path='webpack' element={<Webpack />} />
            <Route path='todo' element={<Todo />} />
            <Route path='theory' element={<Theory />} />
            <Route
              path='theory-crp'
              element={<TheoryCriticalRenderingPath />}
            />
            <Route path='theory-event-loop' element={<TheoryEventLoop />} />
            <Route path='typescript' element={<Typescript />} />
            <Route path='react' element={<React18_19 />} />
            <Route path='redux' element={<ReduxComponent />} />
            <Route path='/' element={<Main />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};
