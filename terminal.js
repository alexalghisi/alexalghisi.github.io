(function () {
  var output = document.getElementById("output");
  var input = document.getElementById("termInput");
  var inputLine = document.getElementById("inputLine");
  var body = document.getElementById("termBody");
  if (!output || !input || !inputLine || !body) return;

  var routes = {
    cv: "/Alessandro-Paolo-Alghisi-Resume-2026.pdf",
    resume: "/Alessandro-Paolo-Alghisi-Resume-2026.pdf",
    collab: "https://github.com/alexalghisi/collab",
    a11ydojo: "https://github.com/alexalghisi/A11yDojo",
    agenttower: "https://github.com/alexalghisi/agenttower",
    oragrija: "https://alexalghisi.github.io/OraGrija/",
    interview: "https://alexalghisi.github.io/ai-interview-helper/",
    "pdf-editor": "https://github.com/alexalghisi/pdf-editor",
    explorer: "https://github.com/alexalghisi/react-modern-drag-and-drop",
    linkedin: "https://www.linkedin.com/in/alghisi/",
    github: "https://github.com/alexalghisi",
    mail: "mailto:alexalghisi@gmail.com",
    meditatiidirect: "https://www.meditatiidirect.ro/",
    etichetetextile: "https://etichetetextile.ro/",
    cabanly: "https://cabanly.ro/",
    bremenauto: "https://bremenauto.ro/",
    grileadmitere: "https://grileadmitere.ro/",
    optimcatering: "https://optimcatering.ro/",
    collaborare: "https://collaborare.ro/",
    dcorentacarcluj: "https://dcorentacarcluj.ro/"
  };

  function promptHtml() {
    return '<span class="prompt"><span class="user">alghisi</span><span class="at">@</span><span class="host">macbook</span><span class="colon">:</span><span class="path">~</span><span class="dollar">$</span></span>';
  }

  function escapeHtml(s) {
    return s.replace(/[&<>"']/g, function (c) {
      return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c];
    });
  }

  function append(html) {
    var pre = document.createElement("pre");
    pre.className = "line";
    pre.innerHTML = html;
    inputLine.parentNode.insertBefore(pre, inputLine);
    body.scrollTop = body.scrollHeight;
  }

  function text(lines) {
    lines.forEach(function (line) {
      append(line);
    });
  }

  function help() {
    text([
      '<span class="comment"># commands</span>',
      "help          this list",
      "whoami        short bio",
      "ls            windows on the right",
      "open &lt;name&gt;   collab, cv, oragrija, a11ydojo, agenttower, etichetetextile…",
      "contact       email, phone, LinkedIn",
      "stack         what I use",
      "clear         wipe the scrollback",
      '<span class="muted">or type a project name and press Enter</span>'
    ]);
  }

  function whoami() {
    text([
      '<span class="hi">Alessandro Paolo Alghisi</span>',
      "Senior full stack · React · TypeScript · Node.js · Python",
      "Cluj-Napoca · remote CET · Italian passport"
    ]);
  }

  function contact() {
    text([
      '<a class="link" href="mailto:alexalghisi@gmail.com">alexalghisi@gmail.com</a>',
      '<a class="link" href="tel:+40770763175">+40 770 763 175</a>',
      '<a class="link" href="https://www.linkedin.com/in/alghisi/">linkedin.com/in/alghisi</a>'
    ]);
  }

  function stack() {
    text([
      "React, TypeScript, Node.js, Python, PostgreSQL, AWS, RAG"
    ]);
  }

  function ls() {
    text([
      "cv  collab  oragrija  a11ydojo  agenttower  etichetetextile.ro  meditatiidirect.ro"
    ]);
  }

  input.addEventListener("keydown", function (e) {
    if (e.key !== "Enter") return;
    e.preventDefault();
    var raw = (input.value || "").trim();
    if (!raw) return;
    append(promptHtml() + " <span class=\"cmd\">" + escapeHtml(raw) + "</span>");
    var cmd = raw.toLowerCase();
    var parts = cmd.split(/\s+/);
    var name = parts[0] === "open" || parts[0] === "cat" || parts[0] === "cd" ? parts[1] : parts[0];
    if (cmd === "help" || cmd === "man") {
      help();
    } else if (cmd === "whoami" || cmd === "about") {
      whoami();
    } else if (cmd === "contact") {
      contact();
    } else if (cmd === "stack" || cmd === "skills") {
      stack();
    } else if (cmd === "ls" || cmd === "projects") {
      ls();
    } else if (cmd === "clear") {
      output.innerHTML = "";
    } else if (name && routes[name]) {
      window.location.href = routes[name];
      return;
    } else {
      var grow = [];
      for (var i = 1; i <= raw.length; i++) grow.push(escapeHtml(raw.slice(0, i)));
      grow.forEach(function (l) {
        append('<span class="path">' + l + "</span>");
      });
    }
    input.value = "";
    body.scrollTop = body.scrollHeight;
  });

  document.body.addEventListener("click", function () {
    input.focus();
  });
})();
