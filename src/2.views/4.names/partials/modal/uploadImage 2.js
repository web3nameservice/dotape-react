import axios from 'axios';

async function callW3Api(urlpath, body) {
    let url = "https://api.domains.w3.one" + urlpath;
    let response = await axios({
        method: 'post',
        url: url,
        data: body
    });

    return response.data.value;
}

export async function uploadImage(src, editJson, setEditJson, setHash, setHashLoading) {
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");

    let size = 600;

    var image = new Image();

    image.src = src;
    image.onload = async function (e) {
        canvas.width = size; // target width
        canvas.height = image.height * (size / image.width); // target height
        ctx.drawImage(image,
            0, 0, image.width, image.height,
            0, 0, canvas.width, canvas.height
        );
        var resampledImage = new Image();
        resampledImage.src = canvas.toDataURL();
        let url = canvas.toDataURL();
        //let url2 = canvas.toBlob();
        try {
            let hash = await callW3Api("/database/ipfs/upload/image", { content: url });
            let json = editJson[0];
            json["avatar"] = "ipfs-" + hash;
            setEditJson([json]);
            setHash(hash);
            console.log(hash);
        } catch (e) {
            console.log(e);
            setHash("Error: File too large...");
        }
    };
};

