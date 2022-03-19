import './Spinner.css'

function Spinner({ message }) {
    return (
        <div className='text-center p-10'>
            <h1 className='text-xl'>{message}</h1>
            <div className='spinner mx-10' />
        </div>
    )
}

export default Spinner;