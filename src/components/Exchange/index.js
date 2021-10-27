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
	let recommend = null
	if(props.buyNow && props.sellNow){
		recommend = {
			class: "buy-sell-now",
			content: <p>
				<p className="buy">buy</p>
				<p className="sell">sell</p>
				</p>
		}
	} else if(props.buyNow) {
		recommend = {
			class: "buy-now",
			content: <p>buy</p>
		}
	} else if(props.sellNow){
		recommend = {
			class: "sell-now",
			content: <p>sell</p>
		}
	}

	return <div className={`exchange ${props.name}`}>
		<div className="title">
			<p>{props.name}</p>
			{!recommend ? null :
				<div className={`recommend ${recommend.class}`} >
					{recommend.content}
				</div>
			}
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