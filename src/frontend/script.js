// const { RAE } = require('rae-api');

// const rae = new RAE(true);
import './style.css';
document.addEventListener("DOMContentLoaded", () => {
    let secretWord = "COSER"
    let tableGame = document.getElementById("game_table");
    for (let i = 0; i < 6; i++) {
        let tr = tableGame.insertRow();
        for (let x = 0; x < 5; x++) {
            let td = tr.insertCell();
            td.setAttribute('id', i + "" + x);
            // td.className = "flip"
        }
    }

    const headers = {
        "method": "GET",
        "headers": {
            "Content-Type": "application/json",
            "Accept": "*/*",
            "app_id": "d47566ef",
            "app_key": "88f766237b89e034159f90377d124fd5"
        }
    }

    let word = "avion"

    fetch("https://od-api.oxforddictionaries.com/api/v2/entries/es/" + word + "?fields=definitions&strictMatch=false", headers)
    .then(response => {
        console.log(response);
    })
    .catch(err => {
        console.error(err);
    });

    // checkWordExists();

    // fetch("https://textgears-textgears-v1.p.rapidapi.com/detect", {
	// "method": "POST",
	// "headers": {
	// 	"content-type": "application/x-www-form-urlencoded",
	// 	"x-rapidapi-host": "textgears-textgears-v1.p.rapidapi.com",
	// 	"x-rapidapi-key": "acba48f8a1msh136c2f57d4027fap1ee53ejsn586bd2190804"
	// },
	// "body": {
	// 	"text": "Readability (legibility) is a feature of the text that represents ease of its perception by the reader, as well as the evaluation of its simplicity. The two main factors of readability are the printing and linguistic features of the text.    The Flesch Kinkaid Score is the most popular way to measure the readability of English text. It works on the principle of “the fewer words in the text, and the fewer syllables in them, the easier it is to perceive” and is most often used for checking essays in schools and universities. The higher the index value on a 100-point scale, the better the readability of the text.    Smart human-trained search algorithms evaluate all site content for completeness of topic disclosure, and in a form that is understandable to the reader. For this purpose, readability indexes are used. In other words, pages containing simple and clear text get higher positions in the search results. Improving the text in terms of its printing and linguistic qualities will increase the user's viewing time. It turns out that the readability significantly affects the ranking of sites in the search engine."
	// }
// })
// .then(response => {
// 	console.log(response);
// })
// .catch(err => {
// 	console.error(err);
// });

// const search = rae.searchWord('hola');
// const wordId = search.getRes()[0].getId(); // gets 'hola' word id

// const result = rae.fetchWord(wordId); // fetches the word as object
// console.log(search);
// console.log(wordId);
// console.log(result);
    let currentRow = 0;
    let currentLetter = 0;

    document.addEventListener('keydown', (e) => {
        console.log(e);


        if (/^([a-zA-Z])$/.test(e.key) && currentLetter < 5 && currentRow < 6) {
            let keyDOM = document.getElementById(currentRow + "" + currentLetter);
            keyDOM.innerHTML = e.key
            // keyDOM.classList.add("correct")
            if (currentLetter < 4) currentLetter++;

            console.log("entra if 1");
            console.log("CurrentRow", currentRow);
            console.log("CurrentLetter", currentLetter);


        } else if (e.key === 'Enter' && currentLetter == 4) {
            currentLetter = 0;
            // let word = getWord(currentRow);
            // if (checkWord(secretWord, currentRow)) {

            // }
            currentRow++;


        } else if (e.key === 'Backspace' && currentLetter >= 0) {
            let keyDOM = document.getElementById(currentRow + "" + currentLetter);
            keyDOM.innerHTML = "";
            if (currentLetter > 0) currentLetter--;
            console.log("entra if 3");
            console.log("CurrentRow", currentRow);
            console.log("CurrentLetter", currentLetter);
        } else {
            console.log(false);
        }

    });

    let getWord = (row) => {
        let res = "";
        for (let x = 0; x < 5; x++) {
            let td = document.getElementById(row + "" + x);
            res += td.textContent;
        }
        return res;
    }


    let checkWord = (secret, row) => {
        let word = getWord(row);
        let upperSecret = secret.toUpperCase();
        let upperWord = word.toUpperCase();
        let arrSecret = upperSecret.split("");
        let arrWord = upperWord.split("");
        if (upperSecret == upperWord) {
            // printTd(arrSecret, arrWord, row);
            print(arrSecret, arrWord, row).then(() => {
                setTimeout(() => {
                    alert("Enhorabona capitan te l'has passat")
                }, 100)
            })

        } else {

            printTd(arrSecret, arrWord, row)



        }
    }

    let printTd = (arrSecret, arrWord, row) => {
        for (let x = 0; x < 5; x++) {
            let td = document.getElementById(row + "" + x);
            setTimeout(() => {
                if (arrWord[x] == arrSecret[x]) {
                    td.className = "flip correct";
                } else if (arrSecret.includes(arrWord[x])) {
                    td.className = "flip missed";
                } else {
                    td.className = "flip wrong";
                }
                // td.classList.add("flip");
            }, 300)
        }
        return true;
    }

    let print = (arrSecret, arrWord, row) => {
        return new Promise((resolve, reject) => {
            for (let x = 0; x < 5; x++) {
                let td = document.getElementById(row + "" + x);
                setTimeout(() => {
                    if (arrWord[x] == arrSecret[x]) {
                        td.className = "flip correct";
                    } else if (arrSecret.includes(arrWord[x])) {
                        td.className = "flip missed";
                    } else {
                        td.className = "flip wrong";
                    }
                    // td.classList.add("flip");
                }, 300)

            }
            resolve();
        })
    }

    // let animationFlip = () => {
    //     for (let x = 0; x < 5; x++) {
    //         let td = document.getElementById(row + "" + x);
    //         td.classList.add("flip");
    //     }
    // }

    let checkWordExists = () => {
        // 4KMa6tsNPd1P3FRT
        // import textgears from 'textgears-api';

        fetch("https://textgears-textgears-v1.p.rapidapi.com/detect", {
                "method": "POST",
                "headers": {
                    "content-type": "application/x-www-form-urlencoded",
                    "x-rapidapi-host": "textgears-textgears-v1.p.rapidapi.com",
                    "x-rapidapi-key": "4KMa6tsNPd1P3FRT"
                },
                "body": {
                    "text":"GATO"
                }
            })
            .then(response => {
                console.log(response);
            })
            .catch(err => {
                console.error(err);
            });
    }

})