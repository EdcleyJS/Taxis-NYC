$(document).ready(function () {
	var anos=[2016,2017,2018];
	var trimestre=[1,2,3,4];
	var meses=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
	//var mesmediaN;
	var dias=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
	function sleep(ms) {
	  return new Promise(resolve => setTimeout(resolve, ms));
	}

	//var laço= anos.length;
	//var laço= trimestre.length;
	//var laço= dias.length;
	//console.log(laço);
	var sorteados=shuffle(meses); //[];
	/*for (var i = 0; i <3; i++) {
		n=true;
		while(n==true){
			var s= Math.floor((Math.random()*12));
			n = sorteados.includes(meses[s]);
			if (n==false) {
				sorteados.push(meses[s]);
			}
		}
	}*/
	async function animacao(){
		for (var i = 0; i < sorteados.length; i++) {
			//anoSelecionado=anos[i];
			//trimestreSelecionado= trimestre[i];

			//diaSelecionado= dias[i];
			if(hops){
				mesmedia= sorteados[i];
				if(sorteados[i]=='Jan'){
					mesmediaN=0;
				}else if(sorteados[i]=='Fev'){
					mesmediaN=1;
				}else if(sorteados[i]=='Mar'){
					mesmediaN=2;
				}else if(sorteados[i]=='Apr'){
					mesmediaN=3;
				}else if(sorteados[i]=='May'){
					mesmediaN=4;
				}else if(sorteados[i]=='Jun'){
					mesmediaN=5;
				}else if(sorteados[i]=='Jul'){
					mesmediaN=6;
				}else if(sorteados[i]=='Aug'){
					mesmediaN=7;
				}else if(sorteados[i]=='Sep'){
					mesmediaN=8;
				}else if(sorteados[i]=='Oct'){
					mesmediaN=9;
				}else if(sorteados[i]=='Nov'){
					mesmediaN=10;
				}else if(sorteados[i]=='Dec'){
					mesmediaN=11;
				}
				inicioMedia(dataset);
				Vis04TutorialFunction(dataset);
			}
			if(i==(sorteados.length-1)){
				i=-1;
			}
			await sleep(460);
		}
	}
	animacao();
});
