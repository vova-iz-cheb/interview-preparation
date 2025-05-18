import { BrowserRouter, Routes, Route, NavLink } from 'react-router';
import { Webpack } from '../pages/Webpack';
import { AlgBubbleSort } from '../pages/AlgBubbleSort';
import { Main } from '../pages/Main';
import './style.scss';
import { Todo } from '../pages/Todo';
import { Typescript } from '../pages/Typescript';
import { Theory } from '../pages/Theory';
import { TheoryCriticalRenderingPath } from '../pages/TheoryCriticalRenderingPath';

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
          <NavLink to='/alg-sort-bubble' className={classNameFn}>
            Алгоритмы. Сортировка пузырьком
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
            <Route path='typescript' element={<Typescript />} />
            <Route path='/' element={<Main />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};
