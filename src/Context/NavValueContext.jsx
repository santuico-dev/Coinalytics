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
    const [totalMarketCap, setTotalMarketCap] = useState(0);
    const [total24hVolume, setTotal24hrsVolume] = useState(0);
    const [totalCoins, setTotalCoins] = useState(0);
    const [totalExchanges, setTotalExchanges] = useState(0);
    const [top2DominantCoins, set2DominantCoins] = useState([]);
    const [top2DominantCoinsChange, setTop2DominantCoinsChange] = useState([]);
    const [totalMarketCapChange, setTotalMarketCapChange] = useState(0);
    const [total24hrsVolumeChange, setTotal24hrsVolumeChange] = useState(0);

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

