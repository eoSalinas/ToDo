import logoImg from '../../../public/images/logo.svg'

import style from './styles.module.scss'

export function Header() {
  return (
    <header className={style.headerContainer}>
      <img src={logoImg} alt="ToDo Logotipo" />
    </header>
  );
}