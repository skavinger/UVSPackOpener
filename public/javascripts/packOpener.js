function flipCard(id){
	document.getElementById(id).src = document.getElementById(id).alt;
	document.getElementById(id + 'Name').classList.remove("hidden");
}

function flipPack(packNum, numC, numUC, numR, numCH){
	for(var i = 0; i < numC; i++){
		document.getElementById("Pack" + packNum + "CCard"+ i).src = document.getElementById("Pack" + packNum + "CCard"+ i).alt;
		document.getElementById("Pack" + packNum + "CCard"+ i + 'Name').classList.remove("hidden");
	}
	for(var i = 0; i < numUC; i++){
		document.getElementById("Pack" + packNum + "UCCard"+ i).src = document.getElementById("Pack" + packNum + "UCCard"+ i).alt;
		document.getElementById("Pack" + packNum + "UCCard"+ i + 'Name').classList.remove("hidden");
	}
	for(var i = 0; i < numR; i++){
		document.getElementById("Pack" + packNum + "RCard"+ i).src = document.getElementById("Pack" + packNum + "RCard"+ i).alt;
		document.getElementById("Pack" + packNum + "RCard"+ i + 'Name').classList.remove("hidden");
	}
	for(var i = 0; i < numCH; i++){
		document.getElementById("Pack" + packNum + "CHCard"+ i).src = document.getElementById("Pack" + packNum + "CHCard"+ i).alt;
		document.getElementById("Pack" + packNum + "CHCard"+ i + 'Name').classList.remove("hidden");
	}
}

function copyPulls(pulls){
	let txt = document.getElementById("pulls").value;
	navigator.clipboard.writeText(txt)
        .then(() => {
          alert('Text copied to clipboard');
        })
        .catch(err => {
          alert('Error in copying text: ', err);
        });
}

