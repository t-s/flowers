el = $('.vase');
var h = $(window).height() / 4 | 0;
var w = $(window).width() / 15 | 0;
el.css("border-top-width", +h + "px");
el.css("border-left-width", +w + "px");
el.css("border-right-width", +w + "px");
var blobs = [];
var nb = Math.floor(Math.random() * 8) + 2;
function draw_stem() {
  //var type = /(canvas|webgl)/.test(url.type) ? url.type : 'svg';
  var type = 'svg';
  var two = new Two({
    type: Two.Types[type],
    fullscreen: true
  }).appendTo(document.body);
  var bend = (Math.random() * .4);
  var curve = two.makeCurve(two.width / 2, two.height / 4,
    two.width / (2.2 - bend), two.height / 1.6,
    two.width / 2, two.height,
    true);
  curve.stroke = "rgba(0, 190, 0, 1)";
  curve.linewidth = 16;
  two.update();
}
function draw_flower() {
  var squished = false;
  //var type = /(canvas|webgl)/.test(url.type) ? url.type : 'svg';
  var type = 'svg';
  var two = new Two({
    type: Two.Types[type],
    fullscreen: true
  }).appendTo(document.body);
  Two.Resolution = 16;
  for (i = 0; i < nb; i++) {
    blobs.push(two.makeCircle(two.width / 8, two.height / 8, two.height / 2));
  }
  var colors = ["#1abc9c", "#2ecc71", "#3498db",
    "#9b59b6", "#34495e", "#f1c40f",
    "#e67e22", "#e74c3c", "#ecf0f1",
    "#16a085", "#27ae60", "#2980b9",
    "#8e44ad", "#f39c12", "#d35400",
    "#c0392b", "#bdc3c7"
  ];
  blobs.forEach(function(blob) {
    var rand_num = Math.floor((Math.random() * colors.length));
    var color = colors[rand_num];
    blob.fill = color;
    colors.splice(rand_num, 1);
    var j = nb - 1;
    blobs.forEach(function(blob) {
      blob.translation.set(two.width / 2, two.height / 3);
      squished = false;
      for (var i = 0; i < blob.vertices.length; i++) {
        var v = blob.vertices[i];
        var pct = (i + 1) / blob.vertices.length;
        var theta = pct * Math.PI * 2;
        var radius = (Math.random() * two.height / 8 + two.height / 8) / (nb - j);
        var x = radius * Math.cos(theta);
        var y = radius * Math.sin(theta);
        v.set((two.height / 4 * Math.cos(theta)), (two.height / 4 * Math.sin(theta)));
        v.destination = new Two.Vector(x, y);
        v.step = 0.1;
      }
      j = j - 1;
      two.bind('update', function() {
        if (!squished) {
          for (var i = 0; i < blob.vertices.length; i++) {
            var v = blob.vertices[i];
            var d = v.destination;
            if (v.equals(d)) {
              squished = true;
              break;
            }
            v.x += (d.x - v.x) * 0.125;
            v.y += (d.y - v.y) * 0.125;
          }
          return;
        }
      }).play();
    });
  });
}

draw_stem();
draw_flower();
