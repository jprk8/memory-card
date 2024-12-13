import logo from '../assets/pokemon-logo.png'
import '../styles/Header.css'

export default function Header() {
    return (
        <div className='header'>
            <div className='logo'>
                <img src={logo} alt='pokemon memory logo' height='100px' />
            </div>
            <p className='instruction'>
                <strong>How to play:</strong> Get points by clicking on a different image every turn!
            </p>
        </div>
    )
}