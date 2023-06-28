import './main.css';
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <>
      <div className='container'>
        <div className='row align-items-center min-vh-100'>
          <div className="main-navbar col-xs-3 order-2 order-xs-2 col-sm-2 order-sm-1 col-md-2 order-md-1 col-lg-2 order-lg-1 col-xl-2 order-xl-1 col-xxl-2 order-xxl-1"></div>
          <div className="main-content col-xs-9 order-1 order-xs-1 col-sm-10 order-sm-2 col-md-10 order-md-2 col-lg-10 order-lg-2 col-xl-10 order-xl-2 col-xxl-10 order-xxl-2 text-center">
            <img className="logo " src='/img/logo.svg' alt='logo' />
            <h1>Добро пожаловать</h1>
            <p className='mt-3 '>На сайт для быстрого создания личного словаря для любого языка в Мире</p>
            <div className="row">
              <div className="test1 col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                <div className="text col"><p>Зарегистрируйся и пользуйся</p></div>
                <div className="col"><Link to='https://wordsaver-frontend.vercel.app/register'><button>Зарегистроваться</button></Link></div>
              </div>
              <div className="test2 mt-3 col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12">
                <div className="text col"><p>Войти в свой аккаунт</p></div>
                <div className="col"><Link to='https://wordsaver-frontend.vercel.app/login'><button>Войти</button></Link></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
