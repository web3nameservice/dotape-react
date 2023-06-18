import axios, * as others from 'axios';


/* export async function callW3Api(urlpath, body) {
    let url = process.env.REACT_APP_API_URL + urlpath;
    let response = await (await fetch(url, {
        method: 'POST',
        body: JSON.stringify(body)
    })).json();

    console.log(response);
    return response.value;
} */

export async function callW3Api(urlpath, body) {
    let url = process.env.REACT_APP_API_URL + urlpath;
    let response = await axios({
        method: 'post',
        url: url,
        data: body
    });

    // console.log(response.data);
    return response.data.value;
}

export async function callW3ExplorerApi(urlpath, body) {
    let url = "https://api.explorer.w3.one" + urlpath;
    let response = await axios({
        method: 'post',
        url: url,
        data: body
    });

    console.log(response.data);
    return response.data.value;
}


export async function getWnsDomain(address) {
    let result = await (await fetch("https://resolver.wnsdomains.io/resolve/address=" + address)).json()
    return result.value;
}

export async function getWnsAddress(domain) {
    let result = await (await fetch("https://resolver.wnsdomains.io/resolve/name=" + domain)).json()
    return result.value;
}

export async function getDomain(address) {
    let result = await (await fetch(process.env.REACT_APP_API_URL + "/resolve/address?address=" + address)).json()
    console.log(result);
    return result.value;
}

export async function getEnsDomain(address) {
    console.log("ens", address);
    let result = await (await fetch(`https://deep-index.moralis.io/api/v2/resolve/${address}/reverse`, {
        headers: {
            Accept: "application/json",
            "X-Api-Key": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImQ1MDQ1YjYwLTI3MjUtNDU2NS05NjJhLTM0NzI1ZmNiNjY1MCIsIm9yZ0lkIjoiMTQ0MjE2IiwidXNlcklkIjoiMTQzODYxIiwidHlwZUlkIjoiZWE4ZDZiNzMtNDBhYi00ZmMyLThmY2EtNTVmNTM1MzNhMzA1IiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE2ODMwNzIwMjEsImV4cCI6NDgzODgzMjAyMX0.dpS0-7G5V1fpb7U98Oz3r5slP920m5UzlHPjLaF68-E"
        }
    })).json();

    console.log(result);
    if (result.name == null || result.name == undefined || result.name == "" || result.name == "null") {
        return "null";
    } else {
        return result.name;
    }
}

export const MoralisApi = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImQ1MDQ1YjYwLTI3MjUtNDU2NS05NjJhLTM0NzI1ZmNiNjY1MCIsIm9yZ0lkIjoiMTQ0MjE2IiwidXNlcklkIjoiMTQzODYxIiwidHlwZUlkIjoiZWE4ZDZiNzMtNDBhYi00ZmMyLThmY2EtNTVmNTM1MzNhMzA1IiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE2ODMwNzIwMjEsImV4cCI6NDgzODgzMjAyMX0.dpS0-7G5V1fpb7U98Oz3r5slP920m5UzlHPjLaF68-E"
