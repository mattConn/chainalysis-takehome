import Exchange from "../Exchange"
import './index.scss'
/**
 * 
 * @param name 
 * @param icon 
 * @param exchanges
 */
const CoinCard = (props) => <div className={`coin-card ${props.name}`}>
	<div className="coin-title">
		<img className="icon" alt="icon" src={props.icon}/>
		<p>{props.name}</p>
	</div>

	<div className="exchanges">
		{
			Object.keys(props.exchanges).map(exchange => <Exchange 
				name={exchange}
				// icon={exchange.icon}
				buyPrice={props.exchanges[exchange].buy}
				sellPrice={props.exchanges[exchange].sell}
				buyNow={props.exchanges[exchange].buyNow}
				sellNow={props.exchanges[exchange].sellNow}
			/>)
		}
	</div>
</div>

export default CoinCard