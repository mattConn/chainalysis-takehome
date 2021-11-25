import api from '../../api.json'
import { kraken, gemini } from './transform'

const transformers = {
    'gemini': gemini,
    'kraken': kraken
}

const getPrices = (coin) => {
    const url = {}
    const markets = Object.keys(api)
    markets.forEach(a => url[a] = api[a][coin])
    const prices = {}

    Promise.all(markets.map(u => fetch(url[u])))
    .then(responses => Promise.all(responses.map(r => r.json())))
    .then(data => data.forEach((d,i) => {
        const t = transformers[markets[i]]
        prices[markets[i]] = t(d)
    }))

    return prices
}

export default getPrices