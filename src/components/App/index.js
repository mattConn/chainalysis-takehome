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
						buyPrice: '$4118.73',
						sellPrice: '$4076.18',
						buyNow: true,
					},
					{
						name: 'Blockchain',
						buyPrice: '$1800',
						sellPrice: '$1400',
					}
				]
			},
			{
				name: 'BTC',
				icon: 'btc.svg',
				exchanges: [
					{
						name: 'Coinbase',
						buyPrice: '$63344.18',
						sellPrice: '$62767.50',
					},
					{
						name: 'Blockchain',
						buyPrice: '$1800',
						sellPrice: '$1400',
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