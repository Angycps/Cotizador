
//Definir las constantes:
const form = document.querySelector('#coin-form');
const coin = document.querySelector('#coin');
const crypto = document.querySelector('#crypto');
const amount = document.querySelector('#amount');
const coinInfo = document.querySelector('#coin-info');



form.addEventListener('submit', async e => {
    e.preventDefault();
    const coinSelected = [... coin.children].find(option => option.selected).value;
    const cryptoSelected = [... crypto.children].find(option => option.selected).value;
    const amountValue = amount.value;
    try {

        //el loader:
            coinInfo.classList.add('center');
            coinInfo.innerHTML = `
            <div class="loader"></div>
            `

        //API
        const response = await (await fetch(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptoSelected}&tsyms=${coinSelected}`)).json();

        //definir las constantes y sus valores:
        const price = response.DISPLAY[cryptoSelected][coinSelected].PRICE;
        const priceHigh = response.DISPLAY[cryptoSelected][coinSelected].HIGH24HOUR;
        const priceLow = response.DISPLAY[cryptoSelected][coinSelected].LOW24HOUR;
        const variation = response.DISPLAY[cryptoSelected][coinSelected].CHANGEPCT24HOUR;
        console.log(response.RAW[cryptoSelected][coinSelected].PRICE);

        //La info que se va a mostrar:
            if (amountValue !== '') {
                const result = Number(amountValue) / response.RAW[cryptoSelected][coinSelected].PRICE;
                // console.log(result);
                //La info que aparece:
                coinInfo.innerHTML = `
                <p class="info">El precio es: <span class="price">${price}</span></p>
                <p class="info">El precio mas alto de hoy es: <span class="price">${priceHigh}}</span></p>
                <p class="info">El precio mas bajo de hoy es: <span class="price"></span>${priceLow}</p>
                <p class="info">Variacion 24H, es: <span class="price">${variation}%</span></p>
                <p class="info">Puede comprar: <span class="price">${result.toFixed(4)} ${cryptoSelected}</span></p>
                `;
                
            } else {
                //La info que aparece si no colocan un monto:
                coinInfo.innerHTML = `
                <p class="info">El precio es: <span class="price">${price}</span></p>
                <p class="info">El precio mas alto de hoy es: <span class="price">${pricehigh}}</span></p>
                <p class="info">El precio mas bajo de hoy es: <span class="price"></span>${pricelow}</p>
                <p class="info">Variacion 24H, es: <span class="price">${variation}%</span></p>
                `;
            }

    } catch (error) {
        console.log(error);
    }

//Para quitar el centrado del loading, y que el texto de la info no quede centrado:
coinInfo.classList.remove('center');
});





