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
			props.exchanges.map(exchange => <Exchange 
				name={exchange.name}
				icon={exchange.icon}
				buy={exchange.buy}
				sell={exchange.sell}
				label={exchange.label}
			/>)
		}
	</div>
</div>

export default CoinCard