import '../styles/Card.css'

export default function Card({ name, imgUrl, onClick }) {
    return (
        <button className='card' onClick={onClick}>
            <img src={imgUrl} alt={name} />
            <div className='card-name'>
                {name}
            </div>
        </button>
    )
}