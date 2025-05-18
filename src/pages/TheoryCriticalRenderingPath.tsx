import './TheoryCriticalRenderingPath.scss';

export const TheoryCriticalRenderingPath = () => {
  return (
    <div>
      TheoryCriticalRenderingPath{' '}
      <p>
        Что такое критический путь рендера? это то как браузер принимает html
        css js и превращает все это в пиксели на экране. Понимание этого
        помогает разработчику оптимизировать приложение.
        <ul>
          <li>
            построение DOM. если встречается script или стили пауза пока не
            скачается js (кроме атрибутов async defer) или не распарсятся стили,
            хорошая новость - html дерево строится по частям. узлы создаются для
            каждого тэга и текста на странице
            <br /> defer- грузит асинхронное(не блокирует html) , но выполняется
            когда ведь dom загрузится async - грузится асинхронно и выполняется
            сразу же как загрузился
          </li>
          <li>
            построение CSSOM, т к стили кастадны то мы не можем перейти к след
            стадии пока полностью не распарсим css, но если в атрибуте указано
            orientation landscape, а мы в portrait то стили не блокируют ничего{' '}
          </li>
          <li>
            (не считается пунктом) если доходим до script - скачиваем и
            запускаем, если скрипт обращается к html то лучше размещать его в
            конце дерева
          </li>
          <li>
            построение render дерева (html+css) но теги с dispay none не
            учитываются, а так же тэги из head
          </li>
          <li>
            layout, зависит от viewport как где в каком порядке отрисовать,
            размеры элементов и т д Узкое место - запускается при смене
            ориентации, скроле, изменении размеров экрана, вставки элемента или
            изменения стилей элемента (которые влияют на размеры)
          </li>
          <li>
            paint выставление цвета каждому элементу. Это не то место где стоит
            оптимизировать что то
          </li>
          <li>
            composite финальная стадия CRP, на которой происходит сборка слоёв,
            их отрисовка и отображение пользователю (z-index , transform и т д)
            ИСПОЛЬЗУЙ чтобы не попасть в layout transform (translate, rotate,
            scale) opacity will-change(вынос в отдельный слой) анимации с
            transform !!! избегайте читать высоту ширину offsetHeight and
            getBoundingClientRect сразу после изменения стилей - вынуждаете
            делать force layout
          </li>
        </ul>
        <button
          onClick={() => {
            const elements = document.body.getElementsByClassName('box');
            for (let i = 0; i < elements.length; i++) {
              const elem: HTMLDivElement = elements[i] as any;
              elem.style.transform = `translateX(${50 + i * 50}px)`;
            }
          }}
        >
          click
        </button>
        <div className='box'>123</div>
        <div className='box'>123</div>
        <div className='box'>123</div>
        <div className='box'>123</div>
        <div className='box'>123</div>
        <div className='box'>123</div>
        <div className='box'>123</div>
        <div className='box'>123</div>
        <div className='box'>123</div>
      </p>
    </div>
  );
};
