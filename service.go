package main

import (
	"encoding/json"
	"log"
	"net/http"
)

type exchange struct {
	Buy     string `json:"buy"`
	Sell    string `json:"sell"`
	BuyNow  bool   `json:"buyNow"`
	SellNow bool   `json:"sellNow"`
}

type coinbaseSchema struct {
	Data struct {
		Base     string `json:"base"`
		Currency string `json:"currency"`
		Amount   string `json:"amount"`
	} `json:"data"`
}

func getRespJSON(w http.ResponseWriter, url string, schema interface{}) ([]byte, error) {
	response, err := http.Get(url)
	if err != nil {
		return nil, err
	}

	json.NewDecoder(response.Body).Decode(schema)

	j, err := json.Marshal(schema)
	if err != nil {
		return nil, err
	}
	return j, nil
}

func main() {
	apis := map[string]map[string]map[string]struct {
		schema interface{}
		url    string
	}{
		"coinbase.com": {
			"btc": {
				"buy": {
					schema: &coinbaseSchema{},
					url:    "https://api.coinbase.com/v2/prices/BTC-USD/buy",
				},
				"sell": {
					schema: &coinbaseSchema{},
					url:    "https://api.coinbase.com/v2/prices/BTC-USD/sell",
				},
			},

			"eth": {
				"buy": {
					schema: &coinbaseSchema{},
					url:    "https://api.coinbase.com/v2/prices/ETH-USD/buy",
				},
				"sell": {
					schema: &coinbaseSchema{},
					url:    "https://api.coinbase.com/v2/prices/ETH-USD/sell",
				},
			},
		},
	}

	http.HandleFunc("/btc", func(w http.ResponseWriter, r *http.Request) {

		response := &coinbaseSchema{}
		j, err := getRespJSON(w, "https://api.coinbase.com/v2/prices/BTC-USD/buy", response)

		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		w.Header().Set("Content-Type", "application/json")
		w.Write(j)
	})

	log.Fatal(http.ListenAndServe(":8080", nil))
}
