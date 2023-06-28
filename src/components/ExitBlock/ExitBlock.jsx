import './style.css'
import { Link } from "react-router-dom";

const Exitblock = (props) => {
    return (
        <>
            <div className="container">
            <div className="exit-block d-flex flex-column align-items-center justify-content-center">
                    <div className="col"><span>{props.username}</span><img onClick={props.func} className="arrow-active mt-1" src="/img/arrow.svg" alt=""/></div>
                    <Link to={"/"}><button className='exit-block-button mb-2'>Выйти из профиля</button></Link>
                  </div>
            </div>
        </>
    )
}


export default Exitblock;