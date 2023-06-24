var setList = require("./setList.json")
var setData = require("./setData.json")
var cardList = require("./cardList.json")


var helpers = function() {}

helpers.getHeader = function () {
    var headerData = {};
    headerData.css = '<link rel="stylesheet" type="text/css" href="/stylesheets/header.css"/><script type = "text/JavaScript" src="/javascripts/landingPage.js"/></script>';
    headerData.body = '<div class="header"><img src="/images/Logos/universus.png" height=62 width=93 class="logo"/><h1 class="title">UVS Pack Opener</h1></div>';
    return headerData;
}

helpers.getFooter = function (){
    var footerData = {};
    footerData.css = '<link rel="stylesheet" type="text/css" href="/stylesheets/footer.css"/>';
    footerData.body = '<div class="footer"><img href="#default" src="/images/Logos/universus.png" height=62 width=93 class="logo"/></div>';
    return footerData;
}

helpers.getSetsBoxes = function () {
    var output = {};
    output.body = '<div class="setWrapper">';
    output.css = '<link rel="stylesheet" type="text/css" href="/stylesheets/setBoxes.css"/>';
    for(var set in setList.SetList){
        output.body += '<div class="set"><a href="#" onclick="genPage(\'' + setList.SetList[set] + '\')"><img src="/images/Packs/' + setList.SetList[set] + '.png" height=75% width=75% class="boxArt"/><p>' + setList.SetList[set] + '</p></a><input type="number" name="' + setList.SetList[set] + 'Count" id="' + setList.SetList[set] + 'Count" min="0" value="1"></div>\n';
    }
    output.body += '</div>';
    return output;
}

helpers.getPacks = function (set, packCount) {
    var output = {};
    var pulls = [];
    output.body = "";
    output.css = '<link rel="stylesheet" type="text/css" href="/stylesheets/packOpener.css"/><script type = "text/JavaScript" src="/javascripts/packOpener.js"/></script>';
    var card;
    var numC = 6;
    var numUC = 3;
    var numR = 1;
    var numCH = 0;
    if(setData[set].sperateCharacters){
        numCH = 1;
    }
    var currentPulls = [];
    output.body += '<button type="button" onclick="copyPulls()">Copy Pulls</button>';
    for(var i = 0; i < packCount; i++){
        currentPulls = [];
        output.body += '<div class=packHeader><h2 class=floatLeft>Pack ' + (i + 1) + '</h2><h2 class=flipButton onclick="flipPack(' + i + ',' + numC + ',' + numUC + ',' + numR + ',' + numCH + ')">Flip All</h2></div><br style="clear:both" /><div class="packWrapper">';
        for(var j = 0; j < numC; j++){
            card = pickCard(setData[set].Commons, currentPulls);
            if(pulls[card.name] !== undefined){
                pulls[card.name]++;
            }
            else{
                pulls[card.name] = 1;
            }
            currentPulls.push(card.name);
            output.body += '<div class="card"><img src="/images/CardBacks/UVS_Back.webp" alt="' + card.url + '" id="Pack' + i + 'CCard' + j + '" class=center onclick="flipCard(\'Pack' + i + 'CCard' + j + '\')" height=auto width=75%><p id="Pack' + i + 'CCard' + j + 'Name" class="hidden centerText">' + card.name + ' (C)</p></div>';
        }
        for(var j = 0; j < numUC; j++){
            if(j === 2 && setData[set].containsXRs && getRandomInt(setData[set].XRRate) === 0){
                card = pickCard(setData[set].Commons.concat(setData[set].Uncommons, setData[set].Rares, setData[set].Ultrarares, setData[set].Secretrares), []);
                output.body += '<div class="card"><img src="/images/CardBacks/UVS_Back.webp" alt="' + card.url + '" id="Pack' + i + 'UCCard' + j + '" class=center onclick="flipCard(\'Pack' + i + 'UCCard' + j + '\')" height=auto width=75%><p id="Pack' + i + 'UCCard' + j + 'Name" class="hidden centerText">' + card.name + ' (XR)</p></div>';
            }
            else{
                card = pickCard(setData[set].Uncommons, currentPulls);
                output.body += '<div class="card"><img src="/images/CardBacks/UVS_Back.webp" alt="' + card.url + '" id="Pack' + i + 'UCCard' + j + '" class=center onclick="flipCard(\'Pack' + i + 'UCCard' + j + '\')" height=auto width=75%><p id="Pack' + i + 'UCCard' + j + 'Name" class="hidden centerText">' + card.name + ' (UC)</p></div>';
            }
            if(pulls[card.name] !== undefined){
                pulls[card.name]++;
            }
            else{
                pulls[card.name] = 1;
            }
            currentPulls.push(card.name);
        }
        for(var j = 0; j < numR; j++){
            if(j === 0 && getRandomInt(4) === 0){
                card = pickCard(setData[set].Ultrarares, currentPulls);
                output.body += '<div class="card"><img src="/images/CardBacks/UVS_Back.webp" alt="' + card.url + '" id="Pack' + i + 'RCard' + j + '" class=center onclick="flipCard(\'Pack' + i + 'RCard' + j + '\')" height=auto width=75%><p id="Pack' + i + 'RCard' + j + 'Name" class="hidden centerText">' + card.name + ' (UR)</p></div>';
            }
            else if(j === 0 && setData[set].containsSRs && getRandomInt(setData[set].SRRate) === 0){
                card = pickCard(setData[set].Secretrares, currentPulls);
                output.body += '<div class="card"><img src="/images/CardBacks/UVS_Back.webp" alt="' + card.url + '" id="Pack' + i + 'RCard' + j + '" class=center onclick="flipCard(\'Pack' + i + 'RCard' + j + '\')" height=auto width=75%><p id="Pack' + i + 'RCard' + j + 'Name" class="hidden centerText">' + card.name + ' (SR)</p></div>';
            }
            else{
                card = pickCard(setData[set].Rares, currentPulls);
                output.body += '<div class="card"><img src="/images/CardBacks/UVS_Back.webp" alt="' + card.url + '" id="Pack' + i + 'RCard' + j + '" class=center onclick="flipCard(\'Pack' + i + 'RCard' + j + '\')" height=auto width=75%><p id="Pack' + i + 'RCard' + j + 'Name" class="hidden centerText">' + card.name + ' (R)</p></div>';
            }
            if(pulls[card.name] !== undefined){
                pulls[card.name]++;
            }
            else{
                pulls[card.name] = 1;
            }
            currentPulls.push(card.name);
        }
        if(setData[set].sperateCharacters){
           for(var j = 0; j < numCH; j++){
                card = pickCard(setData[set].Characters, currentPulls);
                output.body += '<div class="card"><img src="/images/CardBacks/UVS_Back.webp" alt="' + card.url + '" id="Pack' + i + 'CHCard' + j + '" class=center onclick="flipCard(\'Pack' + i + 'CHCard' + j + '\')" height=auto width=75%><p id="Pack' + i + 'CHCard' + j + 'Name" class="hidden centerText">' + card.name + ' (CH)</p></div>';
            }
            if(pulls[card.name] !== undefined){
                pulls[card.name]++;
            }
            else{
                pulls[card.name] = 1;
            }
            currentPulls.push(card.name);
        }
        output.body += '</div>';
    }
    var pullsout = "";
    for(var card in pulls){
        pullsout += pulls[card] + " " + card + "\n";
    }
    output.body += '<textarea id="pulls" class="none">' + pullsout + '</textarea>';
    return output;
}

var pickCard = function(cardSubList, currentPulls){
    var card = cardSubList[getRandomInt(cardSubList.length - 1)];
    for(var i = 0; i < currentPulls.length; i++){
        if(currentPulls[i] === card){
            card = pickCard(cardSubList, currentPulls).name;
            break;
        }
    }
    return {
        "name": card,
        "url": cardList[card.toLowerCase()]
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

exports.helpers = helpers;