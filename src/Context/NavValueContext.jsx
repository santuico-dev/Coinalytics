import { createContext, useContext, useState } from "react";

const StateContext = createContext({

    totalMarketCap: 0,
    total24hVolume: 0,
    totalCoins: 0,
    totalExchanges: 0,
    top2DominantCoins: [],
    top2DominantCoinsChange: [],
    totalMarketCapChange: 0,
    total24hVolumeChange: 0,
    setTotalMarketCap: () => {},
    setTotal24hrsVolume: () => {},
    setTotalCoins: () => {},
    setTotalExchanges: () => {},
    set2DominantCoins: () => {},
    setTop2DominantCoinsChange: () => {},
    setTotalMarketCapChange: () => {},
    setTotal24hrsVolumeChange: () => {},

});

export const NavValueContext = ({children}) => {
    const [totalMarketCap, _setTotalMarketCap] = useState(0);
    const [total24hVolume, _setTotal24hrsVolume] = useState(0);
    const [totalCoins, _setTotalCoins] = useState(0);
    const [totalExchanges, _setTotalExchanges] = useState(0);
    const [top2DominantCoins, _set2DominantCoins] = useState([]);
    const [top2DominantCoinsChange, _setTop2DominantCoinsChange] = useState([]);
    const [totalMarketCapChange, _setTotalMarketCapChange] = useState(0);
    const [total24hrsVolumeChange, _setTotal24hrsVolumeChange] = useState(0);

    const setTotalMarketCap = (marketCap) => {
        if (marketCap) {
            _setTotalMarketCap(marketCap);
            localStorage.setItem("totalMarketCap", marketCap);
        }
    }

    const setTotal24hrsVolume = (volume) => {
        if (volume) {
            _setTotal24hrsVolume(volume);
            localStorage.setItem("total24hVolume", volume);
        }
    }

    const setTotalCoins = (coins) => {
        if (coins) {
            _setTotalCoins(coins);
            localStorage.setItem("totalCoins", coins);
        }
    }

    const setTotalExchanges = (exchanges) => {
        if (exchanges) {
            _setTotalExchanges(exchanges);
            localStorage.setItem("totalExchanges", exchanges);
        }
    }
    
    const set2DominantCoins = (coins) => {
        if (coins) {
            _set2DominantCoins(coins);
            localStorage.setItem("top2DominantCoins", JSON.stringify(coins));
        }
    }

    const setTop2DominantCoinsChange = (coinsChange) => {
        if (coinsChange) {
            _setTop2DominantCoinsChange(coinsChange);
            localStorage.setItem("top2DominantCoinsChange", JSON.stringify(coinsChange));
        }
    }

    const setTotalMarketCapChange = (marketCapChange) => {
        if (marketCapChange) {
            _setTotalMarketCapChange(marketCapChange);
            localStorage.setItem("totalMarketCapChange", marketCapChange);
        }
    }

    const setTotal24hrsVolumeChange = (volumeChange) => {
        if (volumeChange) {
            _setTotal24hrsVolumeChange(volumeChange);
            localStorage.setItem("total24hrsVolumeChange", volumeChange);
        }
    }

    return (
        <StateContext.Provider
            value={{
             
                totalMarketCap,
                total24hVolume,
                totalCoins,
                totalExchanges,
                top2DominantCoins,
                top2DominantCoinsChange,
                totalMarketCapChange,
                total24hrsVolumeChange,
                setTotalMarketCap,
                setTotal24hrsVolume,
                setTotalCoins,
                setTotalExchanges,
                set2DominantCoins,
                setTop2DominantCoinsChange,
                setTotalMarketCapChange,
                setTotal24hrsVolumeChange,
             
            }}
        >
            {children}
        </StateContext.Provider>
    );
}

export const useNavValueContext = () => useContext(StateContext);

