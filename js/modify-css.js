let _modifyCSS = (app_name, search_plugin) => {
  app_name.style.margin = '0';
  app_name.style.padding = '0';
  app_name.style.height = '4rem';
  app_name.style.lineHeight = '4rem';
  app_name.style.color = '#fff';
  app_name.style.backgroundColor = window.$docsify.themeColor;
  
  search_plugin.style.margin = '0';
  search_plugin.style.padding = '0';
}

document.addEventListener('DOMContentLoaded', () => {
  let app_name = document.getElementsByClassName('app-name')[0],
      search_plugin = document.getElementsByClassName('search')[0];

  search_plugin.parentNode.insertBefore(app_name, search_plugin);
  _modifyCSS(app_name, search_plugin);
}, false);
