import { Loading } from 'notiflix/build/notiflix-loading-aio';

export default function loading() {
  const orange = getComputedStyle(document.documentElement).getPropertyValue(
    '--color-orange'
  );
  Loading.standard({ svgColor: orange });
}
