var ncUserData = {
  nomeCompleto: "",
  email: "",
  cpf: "",
  dataNascimento: "",
  telefonePrincipal: "",
  codOferta: "",
  localOferta: "",
};

function ncFormat(value) {
  return value ? value : "";
}

// FIND DATALAYER -> FORM ID = "rbFormEtapa1";
var nc_fs1 = dataLayer.find(function (el) {
  if (
    el &&
    el.formAutomaticValues &&
    el.formAutomaticValues.formID &&
    el.formAutomaticValues.formID === "rbFormEtapa1"
  ) {
    return true;
  }
  return false;
});

if (nc_fs1) {
  var fs1_data = nc_fs1.formAutomaticValues.formFieldValues;

  ncUserData.nomeCompleto = ncFormat(fs1_data["pessoa.nome"].value);
  ncUserData.email = ncFormat(fs1_data["pessoa.emailPrincipal"].value);
  ncUserData.cpf = ncFormat(fs1_data["pessoa.cpf"].value);
  ncUserData.dataNascimento = ncFormat(fs1_data["pessoa.dataNascimento"].value);
  ncUserData.telefonePrincipal = ncFormat(
    fs1_data["pessoa.telefonePrincipal"].value
  );

  console.log(ncUserData, "FS 1");
}

// FIND DATALAYER -> FORM ID = "rbFormEtapa2";
var nc_fs2 = dataLayer.find(function (el) {
  if (
    el &&
    el.formAutomaticValues &&
    el.formAutomaticValues.formID &&
    el.formAutomaticValues.formID === "rbFormEtapa2"
  ) {
    return true;
  }
  return false;
});

if (nc_fs2) {
  var fs2_data = nc_fs2.formAutomaticValues.formFieldValues;

  ncUserData.codOferta = ncFormat(fs2_data["evento.codOferta"].value);
  ncUserData.localOferta = ncFormat(fs2_data["evento.localOferta"].value);

  console.log(ncUserData, "FS 2");
}

window.funnelytics.events.trigger("customFormSubmitted", {
  formName: "{{formName}}",
  nomeCompleto: ncUserData.nomeCompleto,
  email: ncUserData.email,
  codOferta: ncUserData.codOferta,
  localOferta: ncUserData.localOferta,
  cpf: ncUserData.cpf,
  dataNascimento: ncUserData.dataNascimento,
  formID: "{{Form ID}}",
  telefonePrincipal: ncUserData.telefonePrincipal,
  formLocationpathname: "{{formLocation.pathname}}",
  formLocationurl: "{{formLocation.url}}",
  userID: "{{userID}}",
  Enem_2024: "{{Rubeus_Realizou_ENEM_de_2024}}",
  Modalidade: "{{Rubeus_Modalidade}}",
  Campus: "{{Rubeus_Campus}}",
  Curso_presencial_Cascavel: "{{Rubeus_Cursos_Presenciais_Cascavel}}",
  Curso_presencial_Cianorte: "{{Rubeus_Cursos_Presenciais_Cianorte}}",
  Curso_presencial_Francisco_Beltrao:
    "{{Rubeus_Cursos_Presenciais_Francisco_Beltrao}}",
  Curso_presencial_Guaira: "{{Rubeus_Cursos_Presenciais_Guaíra}}",
  Curso_presencial_Paranavai: "{{Rubeus_Cursos_Presenciais_Paranavaí}}",
  Curso_presencial_Toledo: "{{Rubeus_Cursos_Presenciais_Toledo}}",
  Curso_presencial_Umuarama: "{{Rubeus_Cursos_Presenciais_Umuarama}}",
  Curso_semipresencial: "{{Rubeus_Cursos_Semipresenciais}}",
});
