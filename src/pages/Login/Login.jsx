
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "../../axios.js";

const login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  }
  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  }
  async function handleClick() {
    try {
      const data = {
        email: email.trim().toLowerCase(),
        password: password,
      }
      const response = await axios.post('https://wordsaver-pyroject-488fda2b8133.herokuapp.com/login', data);
      if ('token' in response.data) {
        window.localStorage.setItem('token', response.data.token);
        window.localStorage.setItem('username', response.data.username);
      } else {
        console.log('Токена нет')
      }
      const userId = response.data._id;
      navigate(`https://wordsaver-pyroject-488fda2b8133.herokuapp.com/users/${userId}`);
    } catch (err) {
      console.log('Ошибка:', err);
      alert('Неверный логин или пароль');
    }
  }

  return (
    <>
      <div className='container'>
        <div className='row align-items-center min-vh-100'>
          <div className="main-navbar col-xs-3 order-2 order-xs-2 col-sm-2 order-sm-1 col-md-2 order-md-1 col-lg-2 order-lg-1 col-xl-2 order-xl-1 col-xxl-2 order-xxl-1"></div>
          <div className="main-content col-xs-9 order-1 order-xs-1 col-sm-10 order-sm-2 col-md-10 order-md-2 col-lg-10 order-lg-2 col-xl-10 order-xl-2 col-xxl-10 order-xxl-2 text-center">
            <img className="logo " src='/img/logo.svg' alt='logo' />
            <h1>Вход в систему</h1>
            <div className="row">
              <div className="d-flex flex-column align-items-center mt-4">
                <input className='mb-2' type="text" placeholder="Почта" value={email} onChange={handleChangeEmail} />
                <input type="password" placeholder="Пароль" value={password} onChange={handleChangePassword} />
              </div>
              <div className="d-flex flex-column align-items-center mt-5">
                <button className="mb-2" onClick={handleClick}>Войти</button>
                <Link to="/register"><button>Зарегистроваться</button></Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default login;