const kraken = (data) => {
    const d = Object.keys(data.result)[0]

    return {
        buy: data.result[d].a[0],
        sell: data.result[d].b[0]
    }
}

const gemini = (data) => {
    return {
        buy: data.ask,
        sell: data.bid 
    }
}

export {kraken, gemini}