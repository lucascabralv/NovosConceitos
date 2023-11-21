function GetDate() {
  // Data atual
  const d = new Date();
  // Mês MM -> +1 pois getMonth retorna de 0 a 11
  const month = ("0" + (d.getMonth() + 1)).slice(-2);
  // Dia DD
  const day = ("0" + d.getDate()).slice(-2);
  // Ano AAAA
  const year = d.getFullYear();
  return month + "-" + day + "-" + year;
}

async function GetCotacao() {
  const cotacao = await fetch(
    "https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao='"+ GetDate()+"'&$top=100&$format=json&$select=cotacaoCompra,dataHoraCotacao"
  ).then((data) => {
    return data.json();
  });
  console.log(cotacao);
  return cotacao;
}

GetCotacao();

// OUTRA API https://docs.awesomeapi.com.br/api-de-moedas