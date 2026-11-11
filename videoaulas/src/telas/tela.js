// Desenha uma cena no palco. Roda dentro do Chromium; o render.mjs chama window.desenhar(cena, meta).
// Todo texto entra por textContent: o que o roteiro escreve aparece como texto, nunca como marcação.
(function () {
  const OFFICE = ['word', 'excel', 'powerpoint'];
  const NOMES = { word: 'Word', excel: 'Excel', powerpoint: 'PowerPoint', writer: 'LibreOffice Writer', calc: 'LibreOffice Calc', impress: 'LibreOffice Impress' };
  const ARQUIVOS = { word: 'Documento1', excel: 'Pasta1', powerpoint: 'Apresentação1', writer: 'Sem título 1', calc: 'Sem título 1', impress: 'Sem título 1' };
  const CORES = ['#2B579A', '#217346', '#B7472A', '#0369A3', '#43A047', '#D0530F'];
  const COLUNAS = 'ABCDEF';
  const LINHAS = 8;

  function el(tag, attrs, filhos) {
    const e = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs || {})) {
      if (v === undefined || v === null || v === false) continue;
      if (k === 'class') e.className = v;
      else if (k === 'text') e.textContent = v;
      else if (k === 'style') e.setAttribute('style', v);
      else if (k.startsWith('data-')) e.setAttribute(k, v);
      else e[k] = v;
    }
    for (const f of [].concat(filhos || [])) if (f) e.appendChild(f);
    return e;
  }
  const t = (tag, classe, texto) => el(tag, { class: classe, text: texto });

  // "Ctrl+Shift++" -> ["Ctrl", "Shift", "+"]
  function partesDoAtalho(teclas) {
    return teclas.endsWith('++') ? teclas.slice(0, -2).split('+').concat('+') : teclas.split('+');
  }

  function atalho(teclas) {
    if (!teclas) return el('div', { class: 'atalho sem', text: '—' });
    const caixa = el('div', { class: 'atalho', 'data-teclas': teclas });
    partesDoAtalho(teclas).forEach((p, i) => {
      if (i > 0) caixa.appendChild(t('span', 'mais', '+'));
      caixa.appendChild(t('kbd', '', p));
    });
    return caixa;
  }

  const TELAS = {
    capa(tela, meta) {
      return el('section', { class: 'capa' }, [
        t('div', 'rotulo', `AULA ${meta.n} · OFFICE 2019 E LIBREOFFICE 7`),
        t('h1', '', tela.titulo),
        t('p', '', tela.subtitulo),
        el('div', { class: 'faixas' }, CORES.map((c) => el('i', { style: `background:${c}` }))),
      ]);
    },

    secao(tela) {
      return el('section', { class: 'secao' }, [
        t('h1', '', tela.titulo),
        tela.itens && el('ul', {}, tela.itens.map((i) => t('li', '', i))),
      ]);
    },

    janela(tela, meta) {
      const office = OFFICE.includes(tela.app);
      const item = (nome) => el('div', { class: 'item' + (nome === tela.destaque ? ' destaque' : ''), text: nome });
      const abas = el('div', { class: 'abas', 'data-caber': office ? 'guias' : 'menus' },
        meta.abas[tela.app].map((a) => el('div', { class: 'aba' + (a === tela.aba ? ' ativa' : ''), text: a })));
      const titulo = el('div', { class: 'barra-titulo' }, [
        el('span', {}, [el('i', { class: 'selo' }), document.createTextNode(`${ARQUIVOS[tela.app]} - ${NOMES[tela.app]}`)]),
        t('span', 'controles', '–□×'),
      ]);
      const grupos = tela.itens.map((i) => (typeof i === 'string' ? { grupo: null, itens: [i] } : i));
      let miolo;
      if (office && tela.aba === 'Arquivo') {
        // A guia Arquivo não tem faixa de opções: abre o Backstage, uma coluna de comandos na cor do programa.
        const coluna = el('div', { class: 'backstage', 'data-caber': 'Backstage' }, grupos.flatMap((g) => g.itens).map(item));
        miolo = el('div', { class: 'corpo-backstage' }, [coluna, el('div', { class: 'painel-backstage' }, [t('span', '', 'Modo de exibição Backstage')])]);
      } else if (office) {
        // Itens soltos seguidos ficam num grupo só, sem nome.
        const juntos = [];
        for (const g of grupos) {
          const ultimo = juntos[juntos.length - 1];
          if (!g.grupo && ultimo && !ultimo.grupo) ultimo.itens = ultimo.itens.concat(g.itens);
          else juntos.push({ grupo: g.grupo, itens: g.itens.slice() });
        }
        miolo = el('div', { class: 'faixa', 'data-caber': 'faixa de opções' }, juntos.map((g) => el('div', { class: 'grupo' }, [
          el('div', { class: 'grupo-itens' }, g.itens.map(item)),
          g.grupo && t('div', 'grupo-nome', g.grupo),
        ])));
      } else {
        const lista = el('div', { class: 'menu-aberto', 'data-caber': 'menu aberto' });
        for (const g of grupos) {
          if (g.grupo) lista.appendChild(t('div', 'grupo-nome', g.grupo));
          g.itens.forEach((n) => lista.appendChild(item(n)));
        }
        const folha = el('div', { class: 'folha' }, [90, 100, 96, 70, 100, 88, 94, 60].map((w) => el('i', { style: `width:${w}%` })));
        miolo = el('div', { class: 'corpo' }, [folha, lista]);
      }
      const janela = el('div', { class: `janela ${office ? 'office' : 'libre'}` }, [titulo, abas, miolo]);
      const balao = tela.balao && el('div', { class: 'balao', 'data-caber': 'balão' }, [
        tela.destaque && t('b', '', `${tela.destaque}:`), document.createTextNode(tela.balao),
      ]);
      const caixa = el('section', { class: 'com-janela' }, [janela, balao]);
      // O menu aberto fica embaixo do nome do menu, como no programa.
      caixa.depois = () => {
        const menu = caixa.querySelector('.menu-aberto');
        const ativa = caixa.querySelector('.aba.ativa');
        if (!menu || !ativa) return;
        const corpo = caixa.querySelector('.corpo').getBoundingClientRect();
        const max = corpo.width - menu.offsetWidth - 12;
        menu.style.left = `${Math.max(0, Math.min(ativa.getBoundingClientRect().left - corpo.left, max))}px`;
      };
      return caixa;
    },

    planilha(tela) {
      const pintadas = new Set();
      for (const faixa of tela.destaque || []) {
        const [a, b = a] = faixa.split(':');
        const c1 = COLUNAS.indexOf(a[0]), c2 = COLUNAS.indexOf(b[0]);
        const l1 = Number(a.slice(1)), l2 = Number(b.slice(1));
        for (let c = Math.min(c1, c2); c <= Math.max(c1, c2); c++) {
          for (let l = Math.min(l1, l2); l <= Math.max(l1, l2); l++) pintadas.add(COLUNAS[c] + l);
        }
      }
      const cabecalho = el('tr', {}, [t('th', 'canto', '')].concat([...COLUNAS].map((c) => t('th', 'cab-coluna', c))));
      const linhas = [];
      for (let l = 1; l <= LINHAS; l++) {
        const tr = el('tr', {}, [t('th', 'cab-linha', String(l))]);
        for (const c of COLUNAS) {
          const ref = c + l;
          const ativa = ref === tela.em;
          let valor = tela.celulas[ref];
          let digitando = false;
          if (ativa && tela.resultado !== undefined) valor = tela.resultado;
          else if (ativa && tela.formula) { valor = tela.formula; digitando = true; }
          const texto = valor === undefined ? '' : String(valor);
          const numero = texto !== '' && /^-?[\d.]+(,\d+)?%?$/.test(texto);
          const classes = ['celula', ativa && 'ativa', pintadas.has(ref) && 'pintada', numero && 'num', digitando && 'formula'].filter(Boolean).join(' ');
          tr.appendChild(digitando ? el('td', { class: classes, 'data-ref': ref }, [t('span', '', texto)]) : el('td', { class: classes, 'data-ref': ref, text: texto }));
        }
        linhas.push(tr);
      }
      const nomeApp = tela.app === 'excel' ? 'Pasta1 - Excel' : 'Sem título 1 - LibreOffice Calc';
      const planilha = el('div', { class: 'planilha' }, [
        t('div', 'barra-titulo', nomeApp),
        el('div', { class: 'linha-formula' }, [t('div', 'caixa-nome', tela.em), t('span', 'fx', 'fx'), t('div', 'barra-formula', tela.formula || '')]),
        el('table', {}, [cabecalho].concat(linhas)),
        el('div', { class: 'guias-planilha' }, [t('span', '', 'Planilha1')]),
      ]);
      return el('section', { class: 'com-planilha' }, [planilha, tela.nota && el('div', { class: 'nota', 'data-caber': 'nota', text: tela.nota })]);
    },

    teclas(tela, meta) {
      const linhas = tela.acoes.map((chave) => {
        const a = meta.atalhos[chave];
        return el('div', { class: 'linha-tecla' + (a.office !== a.libre ? ' difere' : '') }, [t('div', 'acao', a.nome), atalho(a.office), atalho(a.libre)]);
      });
      return el('section', { class: 'teclas' }, [
        tela.titulo && t('h1', 'titulo', tela.titulo),
        el('div', { class: 'cab' }, [t('span', '', 'Ação'), t('span', 'office', 'Office 2019'), t('span', 'libre', 'LibreOffice 7')]),
      ].concat(linhas));
    },

    compara(tela) {
      const coluna = (classe, nome, itens) => el('div', { class: `col ${classe}` }, [t('h2', '', nome), el('ul', {}, itens.map((i) => t('li', '', i)))]);
      const folgado = Math.max(tela.office.length, tela.libre.length) <= 3;
      return el('section', { class: 'compara' + (folgado ? ' folgado' : '') }, [
        t('h1', 'titulo', tela.titulo),
        el('div', { class: 'colunas' }, [coluna('office', 'Microsoft Office 2019', tela.office), coluna('libre', 'LibreOffice 7', tela.libre)]),
      ]);
    },

    lista(tela) {
      return el('section', { class: 'lista' + (tela.itens.length <= 4 ? ' folgado' : '') }, [t('h1', 'titulo', tela.titulo), el('ul', {}, tela.itens.map((i) => t('li', '', i)))]);
    },

    pegadinha(tela) {
      return el('section', { class: 'pegadinha' }, [t('div', 'rotulo', 'Pegadinha de prova'), t('h1', '', tela.titulo), t('p', '', tela.texto)]);
    },

    questao(tela) {
      const alternativas = tela.alternativas.map((texto, i) =>
        el('div', { class: 'alternativa' + (tela.gabarito && i === tela.correta ? ' correta' : '') }, [t('span', 'letra', 'ABCDE'[i]), t('span', 'texto', texto)]));
      return el('section', { class: 'questao' }, [
        t('div', 'rotulo', tela.gabarito ? 'Como cai na prova · resposta' : 'Como cai na prova'),
        t('p', 'enunciado', tela.enunciado),
      ].concat(alternativas, tela.gabarito && tela.comentario ? [t('p', 'comentario', tela.comentario)] : []));
    },
  };

  // Blocos cujo conteúdo passou do espaço reservado (texto que sairia cortado no vídeo).
  function transbordou() {
    const fora = [];
    for (const bloco of document.querySelectorAll('[data-caber]')) {
      if (bloco.scrollHeight > bloco.clientHeight + 1 || bloco.scrollWidth > bloco.clientWidth + 1) fora.push(bloco.dataset.caber);
    }
    const palco = document.getElementById('conteudo').getBoundingClientRect();
    for (const filho of document.querySelectorAll('#conteudo *')) {
      const r = filho.getBoundingClientRect();
      if (r.width === 0 || r.height === 0 || filho.closest('.folha')) continue;
      if (r.left < palco.left - 1 || r.right > palco.right + 1 || r.top < palco.top - 1 || r.bottom > palco.bottom + 1) {
        fora.push('conteúdo');
        break;
      }
    }
    return [...new Set(fora)];
  }

  window.desenhar = function (cena, meta) {
    const tela = cena.tela;
    document.getElementById('palco').className = tela.app ? `app-${tela.app}` : '';
    document.getElementById('topo-aula').textContent = `Aula ${meta.n} · ${meta.titulo}`;
    document.getElementById('topo-cena').textContent = `${meta.indice}/${meta.total}`;
    document.getElementById('fala').textContent = cena.fala;
    document.querySelector('#progresso i').style.width = `${(100 * meta.indice) / meta.total}%`;
    const conteudo = document.getElementById('conteudo');
    conteudo.replaceChildren();
    const bloco = TELAS[tela.tipo](tela, meta);
    conteudo.appendChild(bloco);
    if (bloco.depois) bloco.depois();
    return { transbordou: transbordou() };
  };
})();
