import React from 'react';
import CoinCard from '../CoinCard';

import './index.scss'

class App extends React.Component {
	state = {
		coins: [
			{
				name: 'ETH',
				icon: 'eth.svg',
				exchanges: [
					{
						name: 'Coinbase',
						buy: '$1000',
						sell: '$2000',
						label: 'BUY',
					},
					{
						name: 'Blockchain',
						buy: '$1800',
						sell: '$1400',
						label: null,
					}
				]
			},
			{
				name: 'BTC',
				icon: 'btc.svg',
				exchanges: [
					{
						name: 'Coinbase',
						buy: '$1000',
						sell: '$2000',
						label: null,
					},
					{
						name: 'Blockchain',
						buy: '$1800',
						sell: '$1400',
						label: null,
					}
				]
			},
		]
	}

	render(){
		return <div className="app">
			<div className="container">
			<div className="title">
				<h1>CoinPicker</h1>
			</div>
			<div className="coins">
			{
				this.state.coins.map(coin => <CoinCard
					name={coin.name}
					icon={`/${coin.icon}`}
					exchanges={coin.exchanges}
				/>)
			}
			</div>
			</div>
		</div>
	}
}

export default App