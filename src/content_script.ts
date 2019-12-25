let content_to_print = null;
initialize();

/// Main.
function initialize() {
  document.body.addEventListener(`DOMSubtreeModified`, () => {
    let area_to_print = document.getElementsByClassName(`annotator-wrapper`);
    if (area_to_print.length == 1) {
      content_to_print = area_to_print[0].getElementsByTagName(`section`)[0];
    }
  });

  append_download_option();
}

/// Print to file.
function print_to_file() {
  if (content_to_print == null) {
    alert(`Cannot find content to print. If you think this extension not working properly, please send an issue to me!`);
  }

  let style = dump_css_of_selected_element(document.body);
  let print_window = window.open(``, ``, `height=400,width=800`);
  print_window.document.write(`<html><head><title>DIV Contents</title>`);
  print_window.document.write(`<style> body {" + style + "} </style>`);
  print_window.document.write(`</head><body><div id="sbo-rt-content"><div class="annotator-wrapper">`);
  print_window.document.write(content_to_print.innerHTML);
  print_window.document.write(`</div></div></body></html>`);
  print_window.print();
  print_window.close();
}

/// Append `Download as PDF` option.
function append_download_option() {
  let drop_content = document.getElementsByClassName(`drop-content`);

  if (drop_content.length == 1) {
    let ul = drop_content[0].getElementsByTagName(`ul`)[0];
    let li = document.createElement(`li`);
    let a = document.createElement(`a`);
    a.setAttribute(`class`, `l1 nav-icn`);
    a.addEventListener(`click`, print_to_file);

    let span = document.createElement(`span`);
    let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute(`width`, `16`);
    svg.setAttribute(`height`, `16`);
    svg.setAttribute(`viewBox`, `0 0 512 512`);
    svg.setAttribute(`xmlns`, `http://www.w3.org/2000/svg`);
    let path = document.createElementNS(`http://www.w3.org/2000/svg`, `path`);
    path.setAttribute(`d`, `M216 0h80c13.3 0 24 10.7 24 24v168h87.7c17.8 0 26.7 21.5 14.1 34.1L269.7 378.3c-7.5 7.5-19.8 7.5-27.3 0L90.1 226.1c-12.6-12.6-3.7-34.1 14.1-34.1H192V24c0-13.3 10.7-24 24-24zm296 376v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h146.7l49 49c20.1 20.1 52.5 20.1 72.6 0l49-49H488c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z`)
    svg.appendChild(path);
    let text = document.createTextNode(`Download as PDF`);

    span.appendChild(svg);
    span.appendChild(text);
    a.appendChild(span);
    li.appendChild(a);
    ul.appendChild(li);
  } else {
    // Do nothing, just return.
    return;
  }
}

/// Dump stylesheets.
function dump_css_of_selected_element(element) {
  let s = ``;
  let o = getComputedStyle(element);
  for (var i = 0; i < o.length; i++) {
    s += o[i] + `:` + o.getPropertyValue(o[i]) + ``;
  }

  return s;
}