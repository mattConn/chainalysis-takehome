import api from '../../api.json'
import { kraken, gemini } from './transform'

const transformers = {
    'gemini': gemini,
    'kraken': kraken
}

const getPrices = (coin) => {
    return new Promise((resolve, reject) => {
        const url = {}
        const markets = Object.keys(api)
        markets.forEach(a => url[a] = api[a][coin])
        const prices = {}

        const minBuy = {
            exchange: null,
            price: Infinity 
        }

        const maxSell = {
            exchange: null,
            price: 0 
        }

        Promise.all(markets.map(u => fetch(url[u])))
            .then(responses => Promise.all(responses.map(r => r.json())))
            .then(data => data.forEach((d, i) => {
                const t = transformers[markets[i]]
                prices[markets[i]] = t(d)

                if(prices[markets[i]].buy < minBuy.price){
                    minBuy.price = prices[markets[i]].buy
                    minBuy.exchange = markets[i]
                }
                if(prices[markets[i]].sell > maxSell.price){
                    maxSell.price = prices[markets[i]].sell
                    maxSell.exchange = markets[i]
                }
            }))
            .then(() => {
                prices[minBuy.exchange].buyNow = true
                prices[maxSell.exchange].sellNow = true
            })
            .then(() => resolve(prices))
    })
}

export default getPrices