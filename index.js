const colorButton = document.getElementById("colorselect");
const modeButton = document.getElementById("modeselect");
const fetchButton = document.getElementById("getbutton");
const countButton = document.getElementById("countbutton");

fetchButton.addEventListener("click", e => {
    console.log(colorButton.value, modeButton.value);
    let hexVal = colorButton.value.slice(1).toUpperCase();
    let modeVal = modeButton.value.toLowerCase();
    let count = Math.min(8, Math.max(1, countButton.value));
    let url = `https://www.thecolorapi.com/scheme?hex=${hexVal}&mode=${modeVal}&count=${count}&format=json`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            let colorHexvalues = [];
            for(let color of data.colors){
                colorHexvalues.push(color.hex.clean);
            }
            let colorsHtml = "";
            document.getElementById("colors-div").style.gridTemplateColumns = `repeat(${count}, auto`;
            for(let hexVal of colorHexvalues){
                console.log(hexVal);
                colorsHtml += ` 
                                <div class="colorholder" style="background-color:#${hexVal}"></div>
                                <h3 class="colorVal" style="border-color: #${hexVal};" data-hexval="${hexVal}">#${hexVal}</h3>
                                `;
            }
            document.getElementById("colors-div").innerHTML = colorsHtml;
            console.log(colorHexvalues);
        })
});

document.getElementById("colors-div").addEventListener("click", (e) => {
    if(e.target.dataset.hexval){
        let textData = e.target.dataset.hexval;
        console.log(textData)
        navigator.clipboard.writeText(textData);
        document.getElementById("popup-heading").style.animation = "fadeIn 0.5s ease-in-out forwards";
        setTimeout(function (){
            document.getElementById("popup-heading").style.animation = "fadeOut 0.5s ease-in-out forwards";
        }, 1500);
    }
})