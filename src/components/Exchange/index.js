import './index.scss'

/**
 * @param name
 * @param icon
 * @param buy
 * @param sell
 * @param buyRank
 * @param sellRank
 */

const Exchange = (props) => <div className={`exchange ${props.name}`}>
	<div className="title">
		<p>{props.name}</p>
		{props.buyNow ? 
		<div className={"recommend buy-now"} >
			<p>BUY</p>
		</div>
		: null }
		{props.sellNow ? 
		<div className={"recommend sell-now"} >
			<p>SELL</p>
		</div>
		: null }
	</div>

	<div className="prices">
		<div className="buy">
			<p>{props.buyPrice} Buy</p>
		</div>
		<div className="sell">
			<p>{props.sellPrice} Sell</p>
		</div>
	</div>
</div>

export default Exchange