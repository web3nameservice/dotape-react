import CityJson from "../../../1.resources/3.files/pricing/worldcities.json";
import NamesJson from "../../../1.resources/3.files/pricing/names.json";
import CountriesJson from "../../../1.resources/3.files/pricing/countries.json";
import DictionaryJson from "../../../1.resources/3.files/pricing/dictionary.json";

export async function getNames(name) {
    let names = [];

    if (name == "999 Club" || name == "10k Club" || name == "100k Club") {
        let lower;
        let upper;

        if (name == "999 Club") {
            lower = 0;
            upper = 999;
        } else if (name == "10k Club") {
            lower = 0;
            upper = 9999;
        } else if (name == "100k Club") {
            lower = 0;
            upper = 99999;
        }

        for (let i = lower; i <= upper; i++) {
            //make sure the name is three letter, if not add zeroes at start
            if (name == "999 Club") {
                names.push(i.toString().padStart(3, "0"));
            } else if (name == "10k Club") {
                names.push(i.toString().padStart(4, "0"));
            } else if (name == "100k Club") {
                names.push(i.toString().padStart(5, "0"));
            } else {
                names.push(i.toString().padStart(3, "0"));
            }
        }
    } else if (name == "3 Letters") {
        for (let i = 0; i < 26; i++) {
            for (let j = 0; j < 26; j++) {
                for (let k = 0; k < 26; k++) {
                    names.push(String.fromCharCode(97 + i) + String.fromCharCode(97 + j) + String.fromCharCode(97 + k));
                }
            }
        }
    } else if (name == "Dictionary") {
        let words = Object.keys(DictionaryJson);
        words.sort((a, b) => {
            return a.length - b.length;
        })
        for (let i = 0; i < words.length; i++) {
            if (words[i].length > 2 && words[i].length < 8) {
                names.push(words[i].toLowerCase().replaceAll(" ", "").replaceAll(".", ""));
            }
        }
    } else if (name == "First Names") {
        let words = Object.keys(NamesJson);
        // words.sort((a, b) => {
        //     return a.length - b.length;
        // })
        for (let i = 0; i < words.length; i++) {
            if (words[i].length > 2 && words[i].length < 10) {
                names.push(words[i].toLowerCase().replaceAll(" ", "").replaceAll(".", ""));
            }
        }
    } else if (name == "Countries") {
        let words = CountriesJson.map(country => { return country.country });
        console.log(words);
        for (let i = 0; i < words.length; i++) {
            if (words[i].length > 2 && words[i].length < 10) {
                names.push(words[i].toLowerCase().replaceAll(" ", "").replaceAll(".", ""));
            }
        }
    } else if (name == "Cities") {
        let words = CityJson.map(country => { return country.Name });

        for (let i = 0; i < words.length; i++) {
            if (words[i].length > 2 && words[i].length < 10) {
                names.push(words[i].toLowerCase().replaceAll(" ", "").replaceAll(".", ""));
            }
        }
    }
    console.log(names);
    return names;
}