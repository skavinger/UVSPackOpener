function flipCard(id){
	document.getElementById(id).src = document.getElementById(id).alt;
	document.getElementById(id + 'Name').classList.remove("hidden");
}

function flipPack(packNum, numC, numUC, numR){
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
}