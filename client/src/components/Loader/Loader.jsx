import "./Loader.css"

function Loader({messageToDisplay}) {
  return (
   <div className="loader-overlay">
    <div className="loader-message">
        <div className="loader-circle"></div>
        <p>{messageToDisplay}</p>
    </div>
   </div>
  )
}

export default Loader