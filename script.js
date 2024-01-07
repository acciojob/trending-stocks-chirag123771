async function trendingStocks(n) {
   try {
    // Fetch stock symbols
    const symbolsResponse = await fetch("https://api.frontendexpert.io/api/fe/stock-symbols");
    const symbolsData = await symbolsResponse.json();
    
    // Select top n symbols
    const topSymbols = symbolsData.slice(0, n).map(stock => stock.symbol);

    // Fetch stock prices
    const pricesResponse = await fetch(`https://api.frontendexpert.io/api/fe/stock-prices?symbols=${JSON.stringify(topSymbols)}`);
    const pricesData = await pricesResponse.json();

    // Fetch stock market caps
    const marketCapsResponse = await fetch("https://api.frontendexpert.io/api/fe/stock-market-caps");
    const marketCapsData = await marketCapsResponse.json();

    // Create the final result array
    const result = topSymbols.map(symbol => {
      const priceInfo = pricesData.find(stock => stock.symbol === symbol);
      const marketCapInfo = marketCapsData.find(stock => stock.symbol === symbol);

      return {
        name: symbolsData.find(stock => stock.symbol === symbol).name,
        symbol: symbol,
        price: priceInfo.price,
        "52-week-high": priceInfo["52-week-high"],
        "52-week-low": priceInfo["52-week-low"],
        "market-cap": marketCapInfo["market-cap"],
      };
    });

    return result;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
  }
module.exports=trendingStocks;  
