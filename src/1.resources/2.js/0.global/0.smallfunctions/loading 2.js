export function loading() {
    if (document.getElementById("loading")) {
        let w = window.innerWidth;
        let h = window.innerHeight;
        let header = document.getElementById("headerbar");
        let headerheight = header.offsetHeight;
        console.log(h - headerheight);
        document.getElementById("loading").style.height = (h - headerheight) + "px";
        document.getElementById("loadingimg").style.display = "block";
        console.log("loading");
    } else {
        console.log("hmm");
    }
}

export function endloading() {
    try {
        document.getElementById("loading").style.display = "none";
    } catch { }
    try {
        document.getElementById("body").style.display = "block";
    } catch { }
    try {
        document.getElementById("upper").style.display = "block";
    } catch { }
    try {
        document.getElementById("uppermobile").style.display = "block";
    } catch { }
    try {
        document.body.style.backgroundImage = "none";
    } catch { }


}

export const delay = ms => new Promise(res => setTimeout(res, ms));

