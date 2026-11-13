// XML biçimlendirme mantığı — tarayıcının DOMParser'ı ile; TR ve EN sayfalar ortak kullanır.

/** XML'i ayrıştırır; hata varsa { error, line } döner. */
export function parse(text) {
  const doc = new DOMParser().parseFromString(text, 'application/xml');
  const err = doc.getElementsByTagName('parsererror')[0];
  if (err) {
    const msg = (err.textContent || '').replace(/\s+/g, ' ').trim();
    const m = /line\s+(\d+)/i.exec(msg) || /satır\s+(\d+)/i.exec(msg);
    return { error: msg, line: m ? Number(m[1]) : null };
  }
  return { doc };
}

const escText = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const escAttr = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');

function attrs(el) {
  let s = '';
  for (const a of el.attributes) s += ` ${a.name}="${escAttr(a.value)}"`;
  return s;
}

/** Düğümü girintili yazar. indent: '  ', '    ' ya da '\t'. */
function pretty(node, indent, depth, out) {
  const pad = indent.repeat(depth);
  switch (node.nodeType) {
    case 1: { // eleman
      const kids = [...node.childNodes].filter((c) => !(c.nodeType === 3 && !c.nodeValue.trim()));
      const open = `<${node.nodeName}${attrs(node)}`;
      if (kids.length === 0) { out.push(`${pad}${open}/>`); return; }
      if (kids.length === 1 && kids[0].nodeType === 3) {
        out.push(`${pad}${open}>${escText(kids[0].nodeValue.trim())}</${node.nodeName}>`); return;
      }
      out.push(`${pad}${open}>`);
      for (const k of kids) pretty(k, indent, depth + 1, out);
      out.push(`${pad}</${node.nodeName}>`);
      return;
    }
    case 3: out.push(pad + escText(node.nodeValue.trim())); return;
    case 4: out.push(`${pad}<![CDATA[${node.nodeValue}]]>`); return;
    case 7: out.push(`${pad}<?${node.target} ${node.data}?>`); return;
    case 8: out.push(`${pad}<!--${node.nodeValue}-->`); return;
    case 10: out.push(`<!DOCTYPE ${node.name}${node.publicId ? ` PUBLIC "${node.publicId}" "${node.systemId}"` : node.systemId ? ` SYSTEM "${node.systemId}"` : ''}>`); return;
    default: return;
  }
}

/** XML bildirimini (<?xml ...?>) korur; DOMParser onu düğüm olarak vermez. */
function declaration(text) {
  const m = /^\s*(<\?xml[^?]*\?>)/.exec(text);
  return m ? m[1] : '';
}

export function format(text, indent = '  ') {
  const r = parse(text);
  if (r.error) return r;
  const out = [];
  const decl = declaration(text);
  if (decl) out.push(decl);
  for (const n of r.doc.childNodes) pretty(n, indent, 0, out);
  return { xml: out.join('\n') };
}

export function minify(text) {
  const r = parse(text);
  if (r.error) return r;
  const out = [];
  for (const n of r.doc.childNodes) pretty(n, '', 0, out);
  return { xml: declaration(text) + out.map((l) => l.trim()).join('') };
}

export function stats(doc) {
  let elements = 0, attributes = 0, depth = 0;
  const walk = (n, d) => { if (n.nodeType === 1) { elements++; attributes += n.attributes.length; depth = Math.max(depth, d); } for (const c of n.childNodes) walk(c, d + 1); };
  walk(doc.documentElement, 1);
  return { elements, attributes, depth, root: doc.documentElement.nodeName };
}
