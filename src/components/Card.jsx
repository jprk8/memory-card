import '../styles/Card.css'

export default function Card({ name, imgUrl }) {
    return (
        <button className='card'>
            <div className='card-name'>
                {name}
            </div>
            <img src={imgUrl} alt={name} />
        </button>
    )
}