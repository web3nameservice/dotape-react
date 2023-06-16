export function formatinusd(price) {
    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });
    return formatter.format(price)
}

export async function ethToUsd(value) {
    let ethPrice;
    let tempEthPrice = sessionStorage.getItem("ethPrice");
    if (tempEthPrice != null) {
        ethPrice = tempEthPrice;
    } else {
        const result = await fetch("https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD");
        const json = await result.json();
        ethPrice = json.USD;
        sessionStorage.setItem("ethPrice", ethPrice);
    }
    let usdprice = parseFloat(parseFloat(ethPrice * value).toFixed(2));
    return formatinusd(usdprice);
}


export async function usdToEth(value) {
    let ethPrice;
    let tempEthPrice = sessionStorage.getItem("ethPrice");
    if (tempEthPrice != null) {
        ethPrice = tempEthPrice;
    } else {
        const result = await fetch("https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD");
        const json = await result.json();
        ethPrice = json.USD;
        sessionStorage.setItem("ethPrice", ethPrice);
    }
    let usdprice = calculateZeroes((1 / parseFloat(ethPrice)) * parseFloat(value));
    return usdprice;
}

export async function currentEthPrice() {
    let ethPrice;
    let tempEthPrice = sessionStorage.getItem("ethPrice");
    if (tempEthPrice != null) {
        ethPrice = tempEthPrice;
    } else {
        const result = await fetch("https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD");
        const json = await result.json();
        ethPrice = json.USD;
        sessionStorage.setItem("ethPrice", ethPrice);
    }
    return ethPrice;
}

export function calculateZeroes(val) {
    val = parseFloat(val);
    let zeroes = getZeroes(val);
    if (zeroes == 0) {
        val = Math.ceil(val * 100) / 100;
    } else if (zeroes == 1) {
        val = Math.ceil(val * 1000) / 1000;
    } else if (zeroes == 2) {
        val = Math.ceil(val * 10000) / 10000;
    } else if (zeroes == 3) {
        val = Math.ceil(val * 100000) / 100000;
    }
    return (val).toLocaleString('fullwide', { useGrouping: false });
}

function getZeroes(val) {
    try {
        return val.toString().match(/(\.0*)/)[0].length - 1;
    } catch (e) {
        return 0
    }
}

export async function getWewePrice() {
    let result = await fetch('https://deep-index.moralis.io/api/v2/erc20/0x1e917e764BC34d3BC313fe8159a6bD9d9FFD450d/price?chain=eth&exchange=uniswap-v3', {
        headers: {
            'accept': 'application/json',
            'X-API-Key': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IjMyNTgzYjQyLTVmYzMtNDEyZi04ZDNmLTk4ODExNjE5NjBjYSIsIm9yZ0lkIjoiMTQ0MjE2IiwidXNlcklkIjoiMTQzODYxIiwidHlwZUlkIjoiZjQyMzE5OTEtZjkyYi00YzViLTliYjgtNDAyYzMyMTRiMWFhIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE2ODM5NDQ1NDAsImV4cCI6NDgzOTcwNDU0MH0.Vrf-LddaDGcfMtZ4bdyudH2jUZD_D1YZUecUgk_TH6k'
        }
    });
    let json = await result.json();
    return json.usdPrice
}
