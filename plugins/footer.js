window.$docsify.plugins = [].concat(window.$docsify.plugins, (hook, vm) => {
  let tmp = `
    <footer style="border-top: 1px solid rgba(0,0,0,.07); padding-top: 1rem;">
      <span>
        &copy; 2022, <a href="https://liupj.top/about/">lpj</a>
      </span>
    </footer>
  `;

  hook.afterEach((html) => {
    return html + tmp;
  });
});
