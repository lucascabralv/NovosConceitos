(function () {
  function NC_Funnelytics_Form_Submit(form_auto_values) {
    function NC_Prop(obj, prop) {
      if (
        !obj.hasOwnProperty("name") &&
        (prop.includes("name") || prop.includes("nome"))
      ) {
        return "name";
      } else if (
        !obj.hasOwnProperty("email") &&
        (prop.includes("email") || prop.includes("e-mail"))
      ) {
        return "email";
      }
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
        INFOS[NC_Prop(INFOS, prop)] = NC_Format(FORM[prop].value);
      }
    }
    console.log(INFOS);
    window.funnelytics.events.trigger("customFormSubmitted", INFOS);
  }
  NC_Funnelytics_Form_Submit();
})();

// Variável "{{nc_form_auto_values}}" necessária em NC_Funnelytics_Form_Submit();
