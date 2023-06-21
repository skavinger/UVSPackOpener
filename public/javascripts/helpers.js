var setList = require("./setList.json")
var setData = require("./setData.json")
var cardList = require("./cardList.json")


var helpers = function() {}

helpers.getHeader = function () {
    var headerData = {};
    headerData.css = '<link rel="stylesheet" type="text/css" href="/stylesheets/header.css"/>';
    headerData.body = '<div class="header"><img src="/images/Logos/universus.png" height=62 width=93 class="logo"/><h1 class="title">UVS Pack Opner</h1></div>';
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
        output.body += '<div class="set"><a href="/packOpener/' + setList.SetList[set] + '"><img src="/images/Packs/' + setList.SetList[set] + '.png" height=75% width=75% class="boxArt"/><p>' + setList.SetList[set] + '</p></a></div>\n';
    }
    output.body += '</div>';
    return output;
}

helpers.getPacks = function (set, packCount) {
    var output = {};
    output.body = "";
    output.css = '<link rel="stylesheet" type="text/css" href="/stylesheets/packOpener.css"/><script type = "text/JavaScript" src="/javascripts/packOpener.js"/></script>';
    var card;
    var numC = 6;
    var numUC = 3;
    var numR = 1;
    for(var i = 0; i < packCount; i++){
        output.body += '<div class=packHeader><h2 class=floatLeft>Pack ' + (i + 1) + '</h2><h2 class=flipButton onclick="flipPack(' + i + ',' + numC + ',' + numUC + ',' + numR + ')">Flip All</h2></div><br style="clear:both" /><div class="packWrapper">';
        for(var j = 0; j < numC; j++){
            card = pickCard(setData[set].Commons);
            output.body += '<div class="card"><img src="/images/CardBacks/UVS_Back.webp" alt="' + cardList[card] + '" id="Pack' + i + 'CCard' + j + '" class=center onclick="flipCard(\'Pack' + i + 'CCard' + j + '\')" height=auto width=75%><p id="Pack' + i + 'CCard' + j + 'Name" class="hidden centerText">' + card + ' (C)</p></div>';
        }
        for(var j = 0; j < numUC; j++){
            if(j === 2 && setData[set].containsXRs && getRandomInt(setData[set].XRRate) === 0){
                card = pickCard(setData[set].Commons.concat(setData[set].Uncommons, setData[set].Rares, setData[set].UltraRares, setData[set].SecretRares));
                output.body += '<div class="card"><img src="/images/CardBacks/UVS_Back.webp" alt="' + cardList[card] + '" id="Pack' + i + 'UCCard' + j + '" class=center onclick="flipCard(\'Pack' + i + 'UCCard' + j + '\')" height=auto width=75%><p id="Pack' + i + 'UCCard' + j + 'Name" class="hidden centerText">' + card + ' (XR)</p></div>';
            }
            else{
                card = pickCard(setData[set].Uncommons);
                output.body += '<div class="card"><img src="/images/CardBacks/UVS_Back.webp" alt="' + cardList[card] + '" id="Pack' + i + 'UCCard' + j + '" class=center onclick="flipCard(\'Pack' + i + 'UCCard' + j + '\')" height=auto width=75%><p id="Pack' + i + 'UCCard' + j + 'Name" class="hidden centerText">' + card + ' (UC)</p></div>';
            }
        }
        for(var j = 0; j < numR; j++){
            if(j === 0 && getRandomInt(4) === 0){
                card = pickCard(setData[set].Ultrarares);
                output.body += '<div class="card"><img src="/images/CardBacks/UVS_Back.webp" alt="' + cardList[card] + '" id="Pack' + i + 'RCard' + j + '" class=center onclick="flipCard(\'Pack' + i + 'RCard' + j + '\')" height=auto width=75%><p id="Pack' + i + 'RCard' + j + 'Name" class="hidden centerText">' + card + ' (UR)</p></div>';
            }
            else if(j === 0 && setData[set].containsSRs && getRandomInt(setData[set].SRRate) === 0){
                card = pickCard(setData[set].Secretrares);
                output.body += '<div class="card"><img src="/images/CardBacks/UVS_Back.webp" alt="' + cardList[card] + '" id="Pack' + i + 'RCard' + j + '" class=center onclick="flipCard(\'Pack' + i + 'RCard' + j + '\')" height=auto width=75%><p id="Pack' + i + 'RCard' + j + 'Name" class="hidden centerText">' + card + ' (SR)</p></div>';
            }
            else{
                card = pickCard(setData[set].Rares);
                output.body += '<div class="card"><img src="/images/CardBacks/UVS_Back.webp" alt="' + cardList[card] + '" id="Pack' + i + 'RCard' + j + '" class=center onclick="flipCard(\'Pack' + i + 'RCard' + j + '\')" height=auto width=75%><p id="Pack' + i + 'RCard' + j + 'Name" class="hidden centerText">' + card + ' (R)</p></div>';
            }
        }
        output.body += '</div>';
    }
    return output;
}

var pickCard = function(cardSubList){
    return cardSubList[getRandomInt(cardSubList.length)];
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

exports.helpers = helpers;