const items = [];

[].forEach.call(document.querySelectorAll('#sddm')[1].children, (li) => {
  const section = li.querySelector('a').text;
  [].forEach.call(li.querySelector('div').querySelectorAll('a'), (param) => {
    const onclick = param.attributes.onclick.value;
    if (onclick.indexOf('showimage') > -1) {
      const id = /showimage\(\"(.+)\"\)/.exec(onclick)[1];
      const text = param.text;

      const skipped = ['VADPROF', 'PDFSFC'];
      if (skipped.indexOf(id) > -1) {
        items.push({ section, id, text });
      }
    }
  });
});

// JSON.stringify(items);

const elements = [];

items.forEach(item => {
  const label = item.id.toUpperCase().replace('_', '');
  const section = item.section.replace(' ', '-').toLowerCase();
  elements.push(`<li><button className="${section}" onClick={() => updateParameter(\'${label}\', \'${item.text}\')}>${label}</button></li>`);
});

JSON.stringify(elements);
