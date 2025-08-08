
class NcHtmlInjector extends HTMLElement {
  connectedCallback() {
    const isEnabledAttr = this.getAttribute('data-enable');
    const isEnabled = isEnabledAttr === null || isEnabledAttr === '' || isEnabledAttr === 'true';

    if (!isEnabled) return;

    const encoded = this.getAttribute('data-html');
    if (!encoded) return;

    const decodeHTMLEntities = str => {
      const textarea = document.createElement("textarea");
      textarea.innerHTML = str;
      return textarea.value;
    };

    const inject = () => {
      if (this.dataset.injected === 'true') return;

      const decoded = decodeHTMLEntities(encoded);
      const wrapper = document.createElement('div');
      wrapper.innerHTML = decoded;

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
      this.dataset.injected = 'true';
    };

    const isInsideTab = this.closest('.w-tab-pane');
    if (isInsideTab) {
      const tabName = isInsideTab.getAttribute('data-w-tab');
      const observer = new MutationObserver(() => {
        if (isInsideTab.style.display !== 'none') {
          inject();
          observer.disconnect();
        }
      });
      observer.observe(isInsideTab, { attributes: true, attributeFilter: ['style'] });

      if (isInsideTab.style.display !== 'none') {
        inject();
        observer.disconnect();
      }
    } else {
      inject();
    }
  }
}

customElements.define('nc-html-injector', NcHtmlInjector);
