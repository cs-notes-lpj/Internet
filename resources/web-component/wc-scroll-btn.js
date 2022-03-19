let temp = document.createElement("template");
temp.setAttribute("id", "scrollBtnTemplate");
temp.innerHTML = `
  <div class="wrapper">
    <div class="toTop">
      <svg
        width="12"
        height="12"
        viewBox="0 0 1024 1024"
      >
        <path
          fill="white"
          d="M573.056 272l308.8 404.608A76.8 76.8 0 0 1 820.736 800H203.232a76.8 76.8 0 0 1-61.056-123.392L450.976 272a76.8 76.8 0 0 1 122.08 0z"
        ></path>
      </svg>
    </div>
    <div class="toBottom">
      <svg
        width="12"
        height="12"
        viewBox="0 0 1024 1024"
      >
        <path
          fill="white"
          d="M573.056 752l308.8-404.608A76.8 76.8 0 0 0 820.736 224H203.232a76.8 76.8 0 0 0-61.056 123.392l308.8 404.608a76.8 76.8 0 0 0 122.08 0z"
        ></path>
      </svg>
    </div>
  </div>

  <style>
    .wrapper {
      position: fixed;
      right: 1rem;
      bottom: 50%;
      background: black;
      border-radius: 10%;
    }
    
    .toTop, .toBottom {
      width: 5rem;
      height: 2.4rem;
      line-height: 2.4rem;
      box-sizing: border-box;
      text-align: center;
    }

    .toTop {
      border-bottom: 1px solid #3f3f3f;
    }
  </style>
`;

class ScrollButton extends HTMLElement {
  constructor() {
    super();
    this._render();
    this._bindEvent();
  }

  _render() {
    this.shadowDOM = this.attachShadow({ mode: 'closed' });
    this.shadowDOM.appendChild(
      temp.content.cloneNode(true)
    );
  }

  _bindEvent() {
    this.shadowDOM.querySelector('.toTop').addEventListener('click', this._scrollToTop);
    this.shadowDOM.querySelector('.toBottom').addEventListener('click', this._scrollToBottom);
  }

  _scrollToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  _scrollToBottom() {
    const height = document.body.scrollHeight;

    document.body.scrollTop = height;
    document.documentElement.scrollTop = height;
  }
}

export default ScrollButton;
window.customElements.define("wc-scroll-button", ScrollButton);
