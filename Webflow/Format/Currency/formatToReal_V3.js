const formatToReal = (el) => {
  el.each(function () {
    let resp = ""; // 
    const spltNum = $(this).text().split(".");
    let inteiros = "";
    let j = 0;
    for (let i = spltNum[0].length - 1; i >= 0; i--) {
    	if (j == 3) {
    		inteiros = spltNum[0][i] + "." + inteiros;
        	j = 1;
      	} else {
        	inteiros = spltNum[0][i] + inteiros;
        	j++;
      	}
    }
    if (spltNum.length == 2) {
		if(spltNum[1].length == 2){
			resp = "R$ " + inteiros + "," + spltNum[1];
		} else {
			resp = "R$ " + inteiros + "," + spltNum[1] + "0";
		}
    } else {
    	resp = "R$ " + inteiros + "," + "00";
    }
	$(this).text(resp);
  });
};
