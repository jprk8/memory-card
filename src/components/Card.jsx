import '../styles/Card.css'

export default function Card({ name, imgUrl, onClick, animate }) {
    return (
        <button className={`card ${animate ? 'animate' : ''}`} onClick={onClick}>
            <img src={imgUrl} alt={name} />
            <div className='card-name'>
                {name}
            </div>
        </button>
    )
}