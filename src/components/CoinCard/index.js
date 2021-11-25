import Exchange from "../Exchange"
import './index.scss'
import 'glyphicons-only-bootstrap/css/bootstrap.min.css'

/**
 * 
 * @param name 
 * @param icon 
 * @param exchanges
 */
const CoinCard = (props) => <div className={`coin-card ${props.name} ${!props.loaded ? 'loading' : null}`}>
	<div className="coin-title">
		<img className="icon" alt="icon" src={props.icon}/>
		<p>{props.name}</p>
		{/* <span className="glyphicon glyphicon-refresh" onClick={props.refreshHandler}></span> */}
	</div>

	<div className="exchanges">
		{
			Object.keys(props.exchanges).map(exchange => <Exchange 
				name={exchange}
				buyPrice={props.exchanges[exchange].buy}
				sellPrice={props.exchanges[exchange].sell}
				buyNow={props.exchanges[exchange].buyNow}
				sellNow={props.exchanges[exchange].sellNow}
			/>)
		}
	</div>
</div>

export default CoinCard