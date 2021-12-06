const kraken = (data) => {
    const d = Object.keys(data.result)[0]

    return {
        buy: parseFloat(data.result[d].a[0]).toFixed(2),
        sell: parseFloat(data.result[d].b[0]).toFixed(2)
    }
}

const gemini = (data) => {
    return {
        buy: data.ask,
        sell: data.bid 
    }
}

export {kraken, gemini}