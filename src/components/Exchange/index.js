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
		{props.label ? 
		<div className={`label ${props.label.toLowerCase()}`}>
			<p>{props.label}</p>
		</div>
		: null }
	</div>

	<div className="prices">
		<div className="buy">
			<p>{props.buy} Buy</p>
		</div>
		<div className="sell">
			<p>{props.sell} Sell</p>
		</div>
	</div>
</div>

export default Exchange