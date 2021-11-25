import React from 'react';
import CoinCard from '../CoinCard';
import getPrices from './api';

import './index.scss'

class App extends React.Component {
	state = {
		coins: null,
		error: null,
		loaded: false
	}

	componentDidMount(){
		const symbols = [
			"eth",
			"btc"
		]

		setInterval(() => {
		Promise.all(symbols.map(s => getPrices(s)))
		.then(data => {
			const coins = {}
			symbols.forEach((symbol, i) => {
				coins[symbol] = {exchanges: data[i]}
				coins[symbol].loaded = true
			})
			this.setState({
				coins: coins,
				loaded: true
			})
		})
		.catch(() => this.setState({
			error: "Cannot make initial fetch",
			loaded: true
		}))
	}, 1000)
}

	render(){
		if(!this.state.loaded){
		return <div className="app">
				<div className="container">
					<div className="title">
						<h1>CoinPicker</h1>
					</div>
					<div className="loading"></div>
				</div>
			</div>
		}

		return <div className="app">
			<div className="container">
			<div className="title">
				<h1>CoinPicker</h1>
			</div>

			{this.state.error ?
				<div className="error">
					<p>Something went wrong. <span onClick={
						()=> window.location.reload()
					}>Retry</span></p>
				</div>
			: null}

			<div className="coins">
			{
				!this.state.coins ? null :
				Object.keys(this.state.coins).map(coin => <CoinCard
					name={coin}
					icon={`/${coin}.svg`}
					exchanges={this.state.coins[coin].exchanges}
					loaded={this.state.coins[coin].loaded}
					// refreshHandler={()=>{
					// 	const coins = this.state.coins
					// 	coins[coin].loaded = false
					// 	this.setState({coins: coins})

					// 	fetch(`${process.env.REACT_APP_BACKEND}/${coin}`)
					// 	.then(response => response.json())
					// 	.then(data => {
					// 		const coins = this.state.coins
					// 		coins[coin].exchanges=data
					// 		coins[coin].loaded = true 
					// 		this.setState({coins: coins})
					// 	})
					// 	.catch(error => this.setState({error: `Cannot fetch ${process.env.REACT_APP_BACKEND}/${coin}`}))
					// }}
				/>)
			}
			</div>
			<p className="source">
				<a href="https://github.com/mattConn/chainalysis-takehome" target="_blank">Source</a>
			</p>
			</div> {/* end container */}
		</div>
	}
}

export default App