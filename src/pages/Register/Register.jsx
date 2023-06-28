import { Link, useNavigate } from 'react-router-dom';
import { useState } from "react";
import axios from "../../axios.js";


const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPass, setRepeatPass] = useState('');

  const handleChangeUsername = (event) => {
    setUsername(event.target.value);
  }
  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  }
  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  }
  const handleChangeRepeatPass = (event) => {
    setRepeatPass(event.target.value);
  }
  async function userRegister() {
    try {
      const data = {
        username: username,
        email: email.trim().toLowerCase(),
        password: password,
      }
      await axios.post('https://wordsaver-pyroject-488fda2b8133.herokuapp.com/register', data);
      alert('Вы успешно зарегистрированы');
      navigate(`https://wordsaver-pyroject-488fda2b8133.herokuapp.com/login`);

    } catch (err) {
      console.log(err);
      alert(err.response.data.errors);
    }
  }

  return (
    <>
      <div className='container'>
        <div className='row align-items-center min-vh-100'>
          <div className="main-navbar col-xs-3 order-2 order-xs-2 col-sm-2 order-sm-1 col-md-2 order-md-1 col-lg-2 order-lg-1 col-xl-2 order-xl-1 col-xxl-2 order-xxl-1"></div>
          <div className="main-content col-xs-9 order-1 order-xs-1 col-sm-10 order-sm-2 col-md-10 order-md-2 col-lg-10 order-lg-2 col-xl-10 order-xl-2 col-xxl-10 order-xxl-2 text-center">
            <img className="logo" src='/img/logo.svg' alt='logo' />
            <h1>Регистрация</h1>
            <div className="row">
              <div className="d-flex flex-column align-items-center mt-4">
                <input className="mb-2" type="text" placeholder='Имя' value={username} onChange={handleChangeUsername}/>
                <input className="mb-2" type="text" placeholder='Почта' value={email} onChange={handleChangeEmail}/>
                <input className="mb-2" type="password" placeholder='Пароль' value={password} onChange={handleChangePassword}/>
                <input className="mb-2" type="password" placeholder='Повторите пароль' value={repeatPass} onChange={handleChangeRepeatPass} />
              </div>
              <div className="d-flex flex-column align-items-center mt-3">
              <button className='mb-2' onClick={() => { password === repeatPass ? userRegister() : alert('Пароли не совпадают') }}>Зарегистроваться</button>
              <Link to="/login"><button>Войти</button></Link>
              </div>
            </div>

          </div>
        </div>
      </div>

    </>
  )
}

export default Register;