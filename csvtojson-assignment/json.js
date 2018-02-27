const fs = require('fs');
const readline = require('readline');
const Stream = require('stream');

const instream = fs.createReadStream('../Indicators.csv');
const ostream1 = fs.createWriteStream('partone.json');
const ostream2 = fs.createWriteStream('parttwo.json');
const outstream = new Stream();
const rl = readline.createInterface(instream, outstream);
var a = 0;
let head;

// FILTER FOR ASIAN COUNTRIES
const list = ['Afghanistan', 'Armenia', 'Azerbaijan', 'Bahrain', 'Bangladesh', 'Bhutan', 'Brunei Darussalam', 'Cambodia', 'China', 'Cyprus',
  'Georgia', 'India', 'Indonesia', 'Iran', 'Iraq', 'Israel', 'Japan', 'Jordan', 'Kazakhstan', 'Kuwait', 'Lebanon',
  'Malaysia', 'Maldives', 'Mongolia', 'Myanmar', 'Nepal', 'Oman', 'Pakistan', 'Philippines', 'Qatar',
  'Saudi Arabia', 'Singapore', 'South Korea', 'Sri Lanka', 'Syrian Arab Republic', 'Taiwan', 'Tajikistan', 'Thailand',
  'Timor-Leste', 'Turkey', 'Turkmenistan', 'United Arab Emirates', 'Uzbekistan', 'Vietnam',
];

// Male MALE VALUES
// fmale MALE VALUES
// which will contain final data with countryname, MValue and FValue
const ans = [];
const male= {};
const fmale= {};
const total = {};
// LOOP FOR MAP ZERO WITH ASIAN COUNTRIES
for (let i = 0; i < list.length; i += 1) {
  male[list[i]] = 0;
  fmale[list[i]] = 0;
  total[list[i]] = 0;
}

// reading the file line by line
rl.on('line', (line) => {
  // converting line into string
  const str = line.toString();
  // seprating only headers from the csv into "head" variable using zero index //
  // else storing the data without headers in "spl" varianle//

  // creating header as a key
  if (a === 0) {
    head = str.split(',');

  // creating header value in "spl
  } else {
    const obj = {};

    let p = 0;
    const spl = str.split(',');
    for (let i = 0; i < list.length; i += 1) {
      if (spl[0] === list[i]) {
        p = 1;
        break;
      }
    }


    const pos = spl[2].search(/^"Life expectancy at birth/);
    if (pos !== -1 && p === 1) {
      // mapping headers with their corresponding values
      obj[head[0]] = [spl[0]];
      obj[head[1]] = [spl[1]];
      // merging spl[2] and spl[3] which is "life expectancy at birth"+"male (years)"
      const st = `${spl[2]},${spl[3]}`;
      obj[head[2]] = st.replace(/ /g, '');
      obj[head[3]] = [spl[4]];
      obj[head[4]] = [spl[5]];
      obj[head[5]] = [spl[6]];


      // checking if the 4th value which was made using "," (comma) seprating to be male or female
      if (spl[3].includes('female')) {
        fmale[spl[0]] += parseFloat(spl[6]);
      } else if (spl[3].includes('male')) {
        male[spl[0]] += parseFloat(spl[6]);
      } else if (spl[3].includes('total')) {
        total[spl[0]] += parseFloat(spl[6]);
      }
      ans.push(obj);
    }
  }

  a += 1;
});

rl.on('close', () => {
  // conversing ans which contain all maped object to JSON string
  /*
    ansjson = JSON.stringify(ans);
    ostream.write(ansjson);
*/
  const bar = [];

  const avg= [];
  for (let i = 0; i < 5; i += 1) {
    let k = 0;
    const dic = {};
    let max = 0;
    for (let j = 0; j < list.length; j += 1) {
      if (total[list[j]] > max) {
        max = total[list[j]];
        k = j;
      }
    }
    dic.Country = list[k];
    dic.AverageExpectancyTotal = total[list[k]];
    avg.push(dic);
    total[list[k]] = 0;
  }

  for (let i = 0; i < list.length; i += 1) {
    const dict = {};
    male[list[i]] /= 56.0;
    dict.Country = list[i];
    dict.MValue = male[list[i]];
    bar.push(dict);
    fmale[list[i]] /= 56.0;
    dict.FValue = fmale[list[i]];
  }
  let barjson = JSON.stringify(bar);
  ostream1.write(barjson);
  barjson = JSON.stringify(avg);
  ostream2.write(barjson);
});
