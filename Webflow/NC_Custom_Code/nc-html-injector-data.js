
class NcHtmlInjector extends HTMLElement {
  connectedCallback() {
    const encoded = this.getAttribute('data-html');
    if (!encoded) return;

    const decoded = this.decodeHTMLEntities(encoded);

    const wrapper = document.createElement('div');
    wrapper.innerHTML = decoded;

    // Executa scripts manualmente
    wrapper.querySelectorAll("script").forEach(oldScript => {
      const newScript = document.createElement("script");
      if (oldScript.src) {
        newScript.src = oldScript.src;
      } else {
        newScript.textContent = oldScript.textContent;
      }
      document.body.appendChild(newScript);
    });

    this.replaceWith(wrapper);
  }

  decodeHTMLEntities(str) {
    const textarea = document.createElement("textarea");
    textarea.innerHTML = str;
    return textarea.value;
  }
}

customElements.define('nc-html-injector', NcHtmlInjector);
