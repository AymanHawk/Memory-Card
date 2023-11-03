import '/src/css/Cards.css';

function Cards({id, clickHandler, img, pokiLog}){

    return(
        <div className="card-wapper">
            <button 
                className="card-button" 
                onClick={() => {
                    clickHandler(id)
                    pokiLog(img)
               }}
            >
                    <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${img}.png`}/>
            </button>          
        </div>
    )
}
export default Cards