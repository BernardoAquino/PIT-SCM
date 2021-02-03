export default function horariosDisponiveis(start, end, interval) {
  var s = start.split(":").map((e) => +e);
  var e = end.split(":").map((e) => +e);
  var horarios = [];
  var t = [];

  while (!(s[0] === e[0] && s[1] > e[1])) {
    t.push(s[0] + ":" + (s[1] < 10 ? "0" + s[1] : s[1]));
    s[1] += interval;
    if (s[1] > 59) {
      s[0] += 1;
      s[1] %= 60;
    }
  }
  for (var i = 0; i < t.length - 1; i++) {
    horarios.push(t[i]);
  }
  return horarios;
}
