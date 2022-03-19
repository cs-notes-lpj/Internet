// // 处理用户传入的参数
// // --------------------------------
// const defaultOptions = {};
// window.$docsify["footer"] = Object.assign( defaultOptions, window.$docsify["footer"] );

// 实现插件
function footer(hook, vm) {

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

}

// 加载插件
window.$docsify.plugins = [].concat(window.$docsify.plugins, footer);
