<div id="dplayer"></div>
<script src="https://cdn.jsdelivr.net/hls.js/latest/hls.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/dplayer@1.26.0/dist/DPlayer.min.js"></script>
<script>
  const dp = new DPlayer({
    container: document.getElementById('dplayer'),
    video: {
        url: 'https://github.com/Brannua/static-assets/blob/master/playlist.m3u8',
        type: 'hls',
    },
    pluginOptions: {
        hls: {
            // hls config
        },
    },
  });
  console.log(dp.plugins.hls); // Hls 实例
</script>
