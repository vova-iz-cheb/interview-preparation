import { createRoot } from 'react-dom/client';
import { App } from './components/App';
import { HttpResponse, http } from 'msw';
import { setupWorker } from 'msw/browser';

// MSW
const postsResolver = ({}) => {
  return HttpResponse.json([
    {
      id: '0',
      title:
        'Что такое генераторы статических сайтов и почему Astro — лучший фреймворк для разработки лендингов',
      url: 'https://habr.com/ru/articles/779428/',
      author: '@AlexGriss',
    },
    {
      id: '1',
      title: 'Как использовать html-элемент <dialog>?',
      url: 'https://habr.com/ru/articles/778542/',
      author: '@AlexGriss',
    },
  ]);
};

// request handler
const postsHandler = http.get('/api/posts', postsResolver);

const worker = setupWorker(postsHandler as any);

async function enableMocking() {
  if (process.env.NODE_ENV === 'development') {
    setTimeout(() => {
      fetch('/api/posts')
        .then((x) => {
          console.log('x', x, x.json);
          return x.json();
        })
        .then((x) => {
          console.log('then', x);
        })
        .catch((e) => {
          console.log('catch', e);
        });
    }, 4000);
    return worker.start();
  }
}

const root = createRoot(document.getElementById('root')!);

enableMocking().then(() => {
  root.render(<App />);
});
