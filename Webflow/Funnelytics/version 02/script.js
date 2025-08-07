function NC_Funnelytics_Form_Submit(form_auto_values, replacement_list) {
  function NC_Prop(prop) {
    replacement_list.forEach(function(replacement, index, list){
      if(prop === replacement[0]){
        prop = replacement[1];
        list.splice(index, 1);
      }
    });
    return prop.replaceAll(".", "_");
  }

  function NC_Format(value) {
    return value ? value : "";
  }

  var FORM = form_auto_values
    ? form_auto_values.formFieldValues
      ? form_auto_values.formFieldValues
      : false
    : false;
  if (!FORM) {
    console.error("Form does not have 'formAutomaticValues'");
    return;
  }
  var INFOS = {
    nc_script: true,
    formID: form_auto_values.formID,
    formName: form_auto_values.formName,
    formLocationpathname: form_auto_values.formLocation.pathname,
    formLocationurl: form_auto_values.formLocation.url,
  };
  for (var prop in FORM) {
    if (Object.prototype.hasOwnProperty.call(FORM, prop)) {
      INFOS[NC_Prop(prop)] = NC_Format(FORM[prop].value);
    }
  }
  window.funnelytics.events.trigger(event_name, INFOS);
}

var event_name = "customFormSubmitted_Pluri";
// Variável "{{nc_form_auto_values}}" necessária em NC_Funnelytics_Form_Submit();
//var form_auto_values = {{nc_form_auto_values}};
var replacement_list = [
  ["pessoa.nome", "name"],
  ["pessoa.emailPrincipal", "email"],
];
NC_Funnelytics_Form_Submit(form_auto_values, replacement_list);


