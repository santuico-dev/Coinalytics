import { createContext, useContext, useState } from "react";

const StateContext = createContext({

    currencySymbol: '$',
    conversionValue: 0,
    philippineConversionValue: 0,
    usdConversionValue: 0,
    setCurrencySymbol: () => {},
    setConversionValue: () => {},
    setPhilippineConversionValue: () => {},
    setUsdConversionValue: () => {},

});

export const ConversionContext = ({children}) => {

    const [currencySymbol, _setCurrencySymbol] = useState('$');
    const [conversionValue, _setConversionValue] = useState(0);
    const [philippineConversionValue, _setPhilippineConversionValue] = useState(0);
    const [usdConversionValue, _setUsdConversionValue] = useState(0);

    const setCurrencySymbol = (symbol) => {
        if(symbol) {
            _setCurrencySymbol(symbol)
        }
    }

    const setConversionValue = (currConvValue) => {
        if(currConvValue) {
            _setConversionValue(currConvValue)
        }
    }

    const setPhilippineConversionValue = (phpConvValue) => {
        if(phpConvValue){
            _setPhilippineConversionValue(phpConvValue)
        }
    }

    const setUsdConversionValue = (usdConvValue) => {
        if(usdConvValue){
            _setUsdConversionValue(usdConvValue)
        }
    }

    return (
        <StateContext.Provider
            value={{
             
                currencySymbol,
                conversionValue,
                philippineConversionValue,
                usdConversionValue,
                setCurrencySymbol,
                setConversionValue,
                setPhilippineConversionValue,
                setUsdConversionValue
            }}
        >
            {children}
        </StateContext.Provider>
    );
}

export const useConversionContext = () => useContext(StateContext);

