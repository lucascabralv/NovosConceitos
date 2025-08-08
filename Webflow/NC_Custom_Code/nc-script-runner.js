
class NcScriptRunner extends HTMLElement {
  connectedCallback() {
    const rawCode = this.innerHTML.trim();
    const decodedCode = this.decodeHTMLEntities(rawCode);

    const restricted = {
      window: undefined,
      document: undefined,
      eval: undefined,
      Function: undefined,
      alert: undefined,
      prompt: undefined,
      fetch: undefined,
      location: undefined,
      navigator: undefined
    };

    try {
      const fn = new Function(...Object.keys(restricted), decodedCode);
      fn(...Object.values(restricted));
    } catch (e) {
      console.error("Erro ao executar código no <nc-script-runner>:", e.message);
    }
  }

  decodeHTMLEntities(str) {
    const textarea = document.createElement("textarea");
    textarea.innerHTML = str;
    return textarea.value;
  }
}

customElements.define('nc-script-runner', NcScriptRunner);
