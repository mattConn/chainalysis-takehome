import './index.scss'

/**
 * @param name
 * @param icon
 * @param buy
 * @param sell
 * @param buyRank
 * @param sellRank
 */

const Exchange = (props) => {
	return <div className={`exchange ${props.name}`}>
		<div className="title">
			<p>{props.name}</p>
			<div className="recommend">
				<p className="buy" style={{ opacity: props.buyNow ? 1 : 0 }}>buy</p>
				<p className="sell" style={{ opacity: props.sellNow ? 1 : 0 }}>sell</p>
			</div>
		</div>

		<div className="prices">
			<div className="buy">
				<p>${props.buyPrice} Buy</p>
			</div>
			<div className="sell">
				<p>${props.sellPrice} Sell</p>
			</div>
		</div>
	</div>
}

export default Exchange