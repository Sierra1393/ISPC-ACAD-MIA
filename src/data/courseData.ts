import { Module } from '../types';

export const COURSE_MODULES: Module[] = [
  {
    id: 'modul-1',
    numero: 1,
    code: 'Mòdul 1',
    titol: 'Policia i societat',
    descripcio: 'Fonaments del sistema de seguretat pública a Catalunya, drets humans, marc constitucional, criminologia, geografia policial i història.',
    icona: 'ShieldCheck',
    unitatsFormatives: [
      {
        id: 'uf-1-1',
        code: 'UF 1.1',
        titol: 'Sistema de seguretat pública',
        descripcio: 'Estudi de la seguretat pública, activitat i actuació policial, principis COP, organització policial a Catalunya i Espanya, coordinació i protecció civil.',
        duradaHores: 25,
        pdfNom: 'Temari_Modul1_UF1.1_Sistema_Seguretat_Publica.pdf',
        pdfPagines: 80,
        pdfDataPublicacio: '19/11/2025',
        indexPdf: [
          'Tema 1. Concepte i marc legal de la Seguretat Pública a Catalunya (Llei 4/2003)',
          'Tema 2. L\'activitat i actuació policial: Missió, funcions i valors del servei públic',
          'Tema 3. Principis bàsics d\'actuació policial (COP): Congruència, Oportunitat i Proporcionalitat',
          'Tema 4. Organització policial a Catalunya: PG-ME, Policies Locals i Seguretat Privada',
          'Tema 5. Òrgans de coordinació de la seguretat i Protecció Civil (Plans PROCICAT, PLASEQCAT)'
        ],
        temes: [
          {
            titolTema: 'Tema 1. Concepte i marc legal de la Seguretat Pública a Catalunya (Llei 4/2003)',
            desenvolupamentText: [
              'La seguretat pública a Catalunya es troba reconeguda com un dret essencial de la ciutadania i una funció publica indivisible. El marc legal bàsic ve definit per la Llei 4/2003, de 7 d\'abril, d\'ordenació del sistema de seguretat pública de Catalunya, la qual estructura les diferents administracions, cossos policials i serveis d\'emergència en un model integrat, preventiu i de cooperació.',
              'A nivell d\'enquadrament estatutari, l\'Article 164 de l\'Estatut d\'Autonomia de Catalunya de 2006 atribueix a la Generalitat de Catalunya la competència exclusiva en matèria de seguretat pública, la qual inclou l\'ordenació dels serveis de seguretat ciutadana, la creació i organització del cos de la Policia de la Generalitat - Mossos d\'Esquadra (PG-ME) i el comandament de la policia autònoma.',
              'Des de la perspectiva de la doctrina moderna de les Nacions Unides, el model català adopta formalment la concepció de la Seguretat Humana (concepte definit inicialment en l\'Informe sobre Desenvolupament Humà del PNUD l\'any 1994). Aquest paradigma transcendeix la visió tradicional reduïda a l\'absència de delicte per abraçar set dimensions interconnectades: seguretat econòmica, alimentària, sanitària, ambiental, personal, comunitària i política.',
              'Així, el sistema de seguretat pública de Catalunya no té només una funció reactiva o punitiva, sinó que se centra en la prevenció integral, el foment de la convivència pacífica, la resolució pacífica dels conflictes veïnals i la protecció activa de la cohesió social com a garanties del lliure exercici dels drets constitucionals.'
            ],
            subratllatVerd: [
              'Llei 4/2003, de 7 d\'abril',
              'Article 164 de l\'Estatut d\'Autonomia de Catalunya',
              'competència exclusiva',
              'Seguretat Humana',
              'PNUD l\'any 1994',
              'set dimensions',
              'prevenció integral',
              'convivència pacífica',
              'cohesió social'
            ],
            destacatsVermell: [
              'Llei 4/2003, de 7 d\'abril: Llei marc que estructura el sistema integrat de seguretat pública a Catalunya',
              'Art. 164 EAC 2006: Atribueix a la Generalitat la competència exclusiva en seguretat pública i policia autònoma',
              'Seguretat Humana (PNUD 1994): Enfocament integrador de 7 dimensions de protecció centrat en la dignitat i els drets de la persona'
            ],
            resumBreu: 'La Llei 4/2003 i l\'Art. 164 de l\'EAC articulen el sistema de seguretat pública a Catalunya des de la perspectiva de la Seguretat Humana (PNUD 1994), prioritzant la prevenció, la convivència i la cohesió social.'
          },
          {
            titolTema: 'Tema 2. L\'activitat i actuació policial: Missió, funcions i valors del servei públic',
            desenvolupamentText: [
              'D\'acord amb l\'Article 104 de la Constitució Espanyola de 1978, les forces i cossos de seguretat tenen com a missió primordial protegir el lliure exercici dels drets i llibertats públiques i garantir la seguretat ciutadana. La funció policial s\'entén per tant com un servei públic essencial subordinat a l\'ordenament jurídic i orientat al benestar de la societat.',
              'Les funcions bàsiques de l\'actuació policial s\'articulen al voltant de tres eixos: la prevenció de les infraccions penals i administratives, la investigació dels delictes i descobriment dels culpables (policia judicial) i la funció assistencial i d\'ajuda humanitària en situacions d\'emergència, vulnerabilitat o necessitat social.',
              'Els valors rectors de la professió policial inclouen la integritat moral, la neutralitat política, l\'absoluta imparcialitat sense cap mena de discrminació (per raó de raça, gènere, religió, orientació sexual o ideologia), la transparència en la gestió i una actitud de proximitat i diàleg amb la ciutadania.',
              'En aquest context, la policia comunitària o de proximitat no és només una tècnica d\'operativitat, sinó una filosofia de treball que fomenta la confiança mútua, la coproducció de seguretat amb les entitats veïnals i la resolució de problemes d\'arrel en el territori.'
            ],
            subratllatVerd: [
              'Article 104 de la Constitució Espanyola',
              'servei públic essencial',
              'prevenció de les infraccions',
              'funció assistencial',
              'integritat moral',
              'neutralitat política',
              'absoluta imparcialitat',
              'policia comunitària o de proximitat'
            ],
            destacatsVermell: [
              'Art. 104 CE: La missió constitucional de protegir el lliure exercici dels drets i la seguretat ciutadana',
              'Principi de Neutralitat Política i Imparcialitat: Deure d\'actuar sense cap biaix ni discriminació',
              'Model de Servei Públic: Orientació a l\'assistència ciutadana, la prevenció i la policia de proximitat'
            ],
            resumBreu: 'L\'actuació policial es defineix com un servei públic basat en l\'Art. 104 CE, orientat a la prevenció, l\'atenció ciutadana, la neutralitat ètica i la proximitat comunitària.'
          },
          {
            titolTema: 'Tema 3. Principis bàsics d\'actuació policial (COP): Congruència, Oportunitat i Proporcionalitat',
            desenvolupamentText: [
              'Els anomenats principis COP (Congruència, Oportunitat i Proporcionalitat) constitueixen el pilar fonamental del codi de conducta i la deontologia policial. Es troben positivats a l\'Article 5 de la Llei Orgànica 2/1986, de 13 de març, de Forces i Cossos de Seguretat (LOFCS) i a l\'Article 12 de la Llei 10/1994, de 11 de juliol, de la Policia de la Generalitat - Mossos d\'Esquadra.',
              'El Principi de Congruència exigeix que la decisió adoptada i els mitjans utilitzats per l\'agent de policia siguin estrictament idonis, adients i ajustats a la naturalesa de la situació de risc o la gravetat de la infracció. Implica escollir sempre la mesura menys gravosa per a la llibertat i els drets de la persona.',
              'El Principi d\'Oportunitat determina el moment temporal adient per dur a terme la intervenció policial. Obliga a avaluar les circumstàncies de l\'entorn per evitar que una actuació extemporània o precipitada provoqui un mal o un perill superior per a la seguretat col·lectiva al que es pretén evitar.',
              'El Principi de Proporcionalitat imposa la necessitat de graduar l\'ús de la força. La força policial és un recurs darrer i excepcional (ultima ratio). L\'ús de la força física o de qualsevol mitjà de contenció s\'ha de limitar rigorosament a allò estrictament necessari per restablir l\'ordre, responent de manera gradual en funció de la resistència o la violència que presentin les persones.'
            ],
            subratllatVerd: [
              'principis COP',
              'Article 5 de la Llei Orgànica 2/1986',
              'Article 12 de la Llei 10/1994',
              'Principi de Congruència',
              'Principi d\'Oportunitat',
              'Principi de Proporcionalitat',
              'recurs darrer i excepcional (ultima ratio)',
              'graduar l\'ús de la força'
            ],
            destacatsVermell: [
              'Art. 5 LOFCS 2/1986 i Art. 12 Llei 10/1994: Mandat legal directe dels principis bàsics d\'actuació (COP)',
              'Congruència: Idoneïtat del mitjà utilitzat davant la situació de risc',
              'Oportunitat: Moment adient de la intervenció evitant provocar un mal major',
              'Proporcionalitat: La força com a darrer recurs (ultima ratio) estricament graduat a la gravetat de l\'amenaça'
            ],
            resumBreu: 'Els principis COP (Art. 5 LOFCS i Art. 12 Llei 10/1994) regeixen la legalitat de les intervencions i obliguen a utilitzar la força com a darrer recurs de forma congruents, oportuna i proporcional.'
          },
          {
            titolTema: 'Tema 4. Organització policial a Catalunya: PG-ME, Policies Locals i Seguretat Privada',
            desenvolupamentText: [
              'L\'organització policial a Catalunya respon a un model plurisubjectiu estructurat al voltant de la Policia de la Generalitat - Mossos d\'Esquadra (PG-ME) com a policia ordinària i integral a tot el territori català, segons estableix la Llei 10/1994, de 11 de juliol. La PG-ME assumeix de manera plena les funcions en seguretat ciutadana, policia d\'ordre públic, investigació criminal, policia científica, control de trànsit interurbà i policia administrativa general.',
              'Les Policies Locals de Catalunya, regulades per la Llei 16/1991, de 10 de juliol, de les Policies Locals de Catalunya, són cossos armats instituits en l\'àmbit municipal. Exerceixen funcions de protecció de les autoritats municipals, custòdia dels béns públics, instrucció d\'atestats per accidents de trànsit en vies urbanes, policia administrativa de les ordenances municipals i col·laboració en la seguretat ciutadana amb la PG-ME.',
              'La Seguretat Privada, regulada per la Llei 5/2014, de 4 d\'abril, de Seguretat Privada, s\'inscriu com una activitat empresarial i professional de naturalesa subordinada, complementària i auxiliar de la seguretat pública. El seu personal (vigilants de seguretat, escorta, etc.) té el deure legal de col·laborar directament amb els cossos policials públics i s\'ha de sotmetre a la seva inspecció i control.',
              'Aquestes tres estructures es coordinen mitjançant taules de treball tècniques, canals d\'informació compartits i el desplegament de la Xarxa d\'Emergències i Seguretat de Catalunya (xarxa RESCAT).'
            ],
            subratllatVerd: [
              'PG-ME',
              'policia ordinària i integral',
              'Llei 10/1994, de 11 de juliol',
              'Llei 16/1991, de les Policies Locals',
              'cossos armats instituits en l\'àmbit municipal',
              'Llei 5/2014, de Seguretat Privada',
              'subordinada, complementària i auxiliar',
              'xarxa RESCAT'
            ],
            destacatsVermell: [
              'PG-ME (Llei 10/1994): Cos de policia ordinària i integral amb competència a tot Catalunya',
              'Policies Locals (Llei 16/1991): Competència municipal en trànsit urbà, ordenances i custòdia',
              'Seguretat Privada (Llei 5/2014): Caràcter auxiliar i subordinat amb deure de col·laboració amb la policia'
            ],
            resumBreu: 'El model policial català integra la PG-ME (policia integral), les Policies Locals (àmbit municipal) i la Seguretat Privada (auxiliar i subordinada) sota mecanismes de coordinació i la xarxa RESCAT.'
          },
          {
            titolTema: 'Tema 5. Òrgans de coordinació de la seguretat i Protecció Civil (Plans PROCICAT, PLASEQCAT)',
            desenvolupamentText: [
              'Per tal de garantir una resposta harmonitzada, el sistema català compta amb diversos òrgans de coordinació: el Consell de Seguretat de Catalunya (òrgan consultiu superior), les Comissions Territorials de Seguretat i les Juntes Locals de Seguretat. Les Juntes Locals de Seguretat són els òrgans clau a nivell municipal per analitzar la situació delictiva, coordinar els operatius entre PG-ME i Policia Local i fixar prioritats d\'actuació conjunta amb l\'Alcaldia i la Subdelegació del Govern.',
              'Pel que fa a la protecció civil, la Llei 4/1997, de 20 de maig, de Protecció Civil de Catalunya, regula el conjunt d\'actuacions adreçades a prevenir riscs greus, protegir les persones i els béns en situacions de catàstrofe o calamitat pública i coordinar la rehabilitació dels serveis afectats.',
              'L\'instrument principal de planificació és el Pla Territorial de Protecció Civil de Catalunya (PROCICAT), que constitueix el pla marc per a emergències generals que superin l\'àmbit local o afectin diversos municipis. Per als riscs específics existents a Catalunya, es desenvolupen els Plans Especials: PLASEQCAT (risc químic), INFOCAT (incendis forestals), INUNCAT (inundacions), TRANSCAT (transport de mercaderies perilloses), NEUCAT (nevades), SISMICAT (risc sísmic) i CAMCAT (contaminació marina).',
              'Tota la coordinació operativa d\'emergències es centralitza des del Centre de Coordinació Operativa de Catalunya (CECAT), connectat directament amb el telèfon d\'emergències 112 per coordinar efectius policials, bombers, serveis sanitaris (SEM) i agents rurals.'
            ],
            subratllatVerd: [
              'Juntes Locals de Seguretat',
              'Llei 4/1997, de 20 de maig, de Protecció Civil',
              'Pla Territorial de Protecció Civil de Catalunya (PROCICAT)',
              'PLASEQCAT',
              'INFOCAT',
              'INUNCAT',
              'TRANSCAT',
              'CECAT',
              'telèfon d\'emergències 112'
            ],
            destacatsVermell: [
              'Juntes Locals de Seguretat: Òrgan de coordinació operativa entre PG-ME, Policia Local i Administració local',
              'Llei 4/1997 de Protecció Civil: Sistema de prevenció i resposta davant greus emergències o catàstrofes',
              'Plans de Protecció Civil: PROCICAT (Territorial) i Plans Especials (PLASEQCAT, INFOCAT, INUNCAT, TRANSCAT, NEUCAT)',
              'CECAT / 112: Centre de Comandament Operatiu i telèfon únic d\'emergències a Catalunya'
            ],
            resumBreu: 'Les Juntes Locals de Seguretat i el sistema de Protecció Civil (Llei 4/1997) organitzen la resposta davant d\'emergències mitjançant el PROCICAT i els Plans Especials (PLASEQCAT, INFOCAT) gestionats des del CECAT 112.'
          }
        ],
        resumPuntsClau: [
          'Concepte de Seguretat Humana (PNUD 1994): Inclou 7 àmbits (econòmica, alimentària, sanitària, ambiental, personal, comunitària i política).',
          'Seguretat Pública a Catalunya (Llei 4/2003): Sistema ordenat per a l\'assegurament dels drets, preservació de la convivència i fomentar la cohesió social.',
          'Principis Bàsics d\'Actuació Policial (COP): Congruència (mitjà idoni i adequat al risc), Oportunitat (moment idoni) i Proporcionalitat (intensitat gradual).',
          'Competències Policials a Catalunya: PG-ME com a policia ordinària i integral (Llei 10/1994 i Estatut 2006); Policies Locals en àmbit municipal (Llei 16/1991).',
          'Protecció Civil (Llei 4/1997): Plans territorials (PROCICAT) i Plans especials (PLASEQCAT, INFOCAT, INUNCAT, TRANSCAT, NEUCAT, SISMICAT).'
        ],
        pdfTextContingut: `Temari Oficial de Seguretat Pública
Curs de formació bàsica per a policies 2026-2027
Mòdul 1. Policia i societat - UF 1.1 Sistema de seguretat pública (25 hores)

TEMA 1. LA SEGURETAT PÚBLICA
La seguretat pública a Catalunya es regula per la Llei 4/2003 d'7 d'abril. És un dret garantit per l'Estat per gaudir d'una vida tranquil·la i exercir lliurement els drets constitucionals.
Principis d'actuació policial COP: Congruència, Oportunitat i Proporcionalitat segons LOFCS 2/1986 i Llei 10/1994 del Cos de Mossos d'Esquadra.
Organització policial: Policia de la Generalitat - Mossos d'Esquadra (PG-ME) com a policia integral, i Policies Locals en l'àmbit municipal.`,
        preguntesExamenPredefinides: [
          {
            id: 'q-1-1-1',
            pregunta: 'Segons la Llei 4/2003 d\'ordenació del sistema de seguretat pública de Catalunya, quina és la funció principal del sistema?',
            opcions: [
              'A) La repressió exclusiva dels delictes penals a les grans ciutats',
              'B) L\'assegurament dels drets i llibertats, la preservació de la convivència i el foment de la cohesió social',
              'C) La gestió de les sancions administratives de trànsit',
              'D) La direcció única dels serveis privats de vigilància'
            ],
            respostaCorrecta: 1,
            explicacio: 'La Llei 4/2003 defineix com a objectiu central del sistema de seguretat l\'assegurament dels drets i llibertats, la convivència i la cohesió social.',
            referenciaOficial: 'UF 1.1 Tema 1, Pàg. 8'
          },
          {
            id: 'q-1-1-2',
            pregunta: 'Quin principi d\'actuació policial exigeix que el mitjà escollit per a la intervenció sigui l\'idoni i adequat a la naturalesa del risc?',
            opcions: [
              'A) Principi d\'Oportunitat',
              'B) Principi de Congruència',
              'C) Principi de Proporcionalitat',
              'D) Principi de Subordinació'
            ],
            respostaCorrecta: 1,
            explicacio: 'El principi de Congruència exigeix la idoneïtat del mitjà utilitzat davant de la situació de risc.',
            referenciaOficial: 'UF 1.1 Tema 3, Pàg. 32'
          }
        ]
      },
      {
        id: 'uf-1-2',
        code: 'UF 1.2',
        titol: 'Drets humans i deontologia professional',
        descripcio: 'Codi deontològic policial, Declaració Universal dels Drets Humans, Convent Europeu de Drets Humans i prevenció de tractes inhumans o degradants.',
        duradaHores: 34,
        pdfNom: 'Temari_Modul1_UF1.2_Drets_Humans_Deontologia.pdf',
        pdfPagines: 110,
        pdfDataPublicacio: '19/11/2025',
        indexPdf: [
          'Tema 1. Drets Humans i Dret Internacional dels Drets Humans (DUDH i CEDH)',
          'Tema 2. Codi Europeu d\'Ètica Policial i Deontologia Professional (Rec 2001/10)',
          'Tema 3. Protecció constitucional i penal davant la tortura i tractes inhumans (Art. 15 CE)',
          'Tema 4. El Protocol d\'Istanbul i procediments de prevenció de maltractaments',
          'Tema 5. L\'ús legítim i proporcional de la força policial'
        ],
        temes: [
          {
            titolTema: 'Tema 1. Drets Humans i Dret Internacional dels Drets Humans (DUDH i CEDH)',
            desenvolupamentText: [
              'Els drets humans constitueixen el marc infrangible de qualsevol actuació policial en un Estat social i democràtic de dret. La Declaració Universal dels Drets Humans (DUDH, 1948) i el Conveni Europeu de Drets Humans (CEDH, 1950) són instruments de dret internacional públic vinculants que obliguen tots els poders públics i funcionaris policials.',
              'L\'Article 3 de la DUDH proclama formalment que tot individu té dret a la vida, a la llibertat i a la seguretat de la seva persona. Aquest dret esdevé el fonament primordial per a l\'exercici de la funció de protecció ciutadana.',
              'L\'Article 5 de la DUDH i l\'Article 3 del CEDH estableixen una prohibició absoluta i sense cap mena d\'excepció (ni en estat de guerra, ni d\'instabilitat política ni d\'emergència nacional) segons la qual ningú no pot ser sotmès a tortura ni a penes o tractes cruels, inhumans o degradants.',
              'El Tribunal Europeu de Drets Humans (TEDH) de Estrasburg interpreta que els poders públics no solament tenen una obligació negativa d\'abstenir-se de cometre tortures o maltractaments, sinó també una obligació positiva d\'investigar de forma diligent, independent i immediata qualsevol denúncia o indicis de maltractament policial.'
            ],
            subratllatVerd: [
              'Declaració Universal dels Drets Humans (DUDH, 1948)',
              'Conveni Europeu de Drets Humans (CEDH, 1950)',
              'Article 3 de la DUDH',
              'Article 5 de la DUDH',
              'Article 3 del CEDH',
              'prohibició absoluta',
              'Tribunal Europeu de Drets Humans (TEDH)',
              'obligació positiva d\'investigar'
            ],
            destacatsVermell: [
              'DUDH (1948) i CEDH (1950): Marc jurídic internacional de compliment obligatori per a la policia',
              'Art. 3 DUDH: Dret inalienable a la vida, a la llibertat i a la seguretat personal',
              'Art. 5 DUDH / Art. 3 CEDH: Prohibició absoluta i inderogable de la tortura i tractes inhumans',
              'Jurisprudència del TEDH: Obligació d\'investigar d\'ofici i amb diligència qualsevol al·legació de maltractament'
            ],
            resumBreu: 'Els drets humans internacionals (DUDH i CEDH) fixen la prohibició absoluta de la tortura (Art. 5 DUDH / Art. 3 CEDH) i obliguen el TEDH a exigir investigacions diligents.'
          },
          {
            titolTema: 'Tema 2. Codi Europeu d\'Ètica Policial i Deontologia Professional (Rec 2001/10)',
            desenvolupamentText: [
              'La Recomanació Rec (2001) 10 del Comitè de Ministres del Consell d\'Europa aprova el Codi Europeu d\'Ètica Policial, el qual recull els principis deontològics harmonitzats per als cossos policials dels països membres.',
              'Aquest codi estableix que la policia s\'ha de sotmetre plenament a la llei, actuar amb neutralitat política i imparcialitat absoluta, oposar-se fermament a qualsevol forma de corrupció o abús d\'autoritat i complir de manera estricta les garanties procedimentals de la ciutadania.',
              'Un dels aspectes més rellevants del Codi és la delimitació de l\'obediència deguda. L\'obediència jeràrquica queda estrictament supeditada a la legalitat: els agents de policia tenen el deure exprès d\'oposar-se i negar-se a executar ordres que siguin manifestament il·legals o que atemptin contra els drets humans o la dignitat de les persones.',
              'Així mateix, el Codi d\'Ètica imposa el deure d\'atenció especial i protecció reforçada a les víctimes del delicte i a les persones en situació de vulnerabilitat (menors, gent gran, víctimes de violència de gènere).'
            ],
            subratllatVerd: [
              'Recomanació Rec (2001) 10',
              'Codi Europeu d\'Ètica Policial',
              'neutralitat política',
              'imparcialitat absoluta',
              'obediència deguda',
              'deure exprès d\'oposar-se',
              'ordres que siguin manifestament il·legals',
              'protecció reforçada a les víctimes'
            ],
            destacatsVermell: [
              'Recomanació Rec (2001) 10: Standard europeu de conducta i deontologia policial',
              'Límit a l\'Obediència Deguda: Deure legal i deontològic de desobeir ordres manifestament il·legals',
              'Incompatibilitat absoluta de la funció policial amb qualsevol acte de corrupció o discriminació'
            ],
            resumBreu: 'El Codi Europeu d\'Ètica Policial (Rec 2001/10) estableix el marc deontològic europeu, obligant a desobeir ordres manifestament il·legals i a actuar amb imparcialitat.'
          },
          {
            titolTema: 'Tema 3. Protecció constitucional i penal davant la tortura i tractes inhumans (Art. 15 CE)',
            desenvolupamentText: [
              'A nivell intern, l\'Article 15 de la Constitució Espanyola de 1978 disposa que tots tenen dret a la vida i a la integritat física i moral, sense que en cap cas puguin ser sotmesos a tortura ni a penes o tractes inhumans o degradants.',
              'En l\'àmbit punitiu, el Codi Penal espanyol tipifica la tortura com un delicte especial en els Articles 174 a 176. Es defineix com el fet que una autoritat o funcionari públic, abusant del seu càrrec, sotmeti una persona a dolors o patiments físics o mentals, o a la supressió de les seves facultats, amb la finalitat d\'obtenir una confessió, d\'esclarir un fet o de castigar-la.',
              'Aquest delicte comporta penes greus privatives de llibertat i la pena d\'inhabilitació absoluta per a l\'exercici del càrrec públic. A més, l\'Article 176 CP castiga l\'autoritat o funcionari que, faltant als deures del seu càrrec, permeti que altres persones cometin aquests actes (omissió de perseguir el delicte).',
              'La protecció penal s\'estén també a les lesions, amenaces i coaccions exercides per agents de l\'autoritat en l\'exercici de les seves funcions.'
            ],
            subratllatVerd: [
              'Article 15 de la Constitució Espanyola',
              'integritat física i moral',
              'Codi Penal espanyol',
              'Articles 174 a 176',
              'delicte especial',
              'patiments físics o mentals',
              'inhabilitació absoluta',
              'omissió de perseguir el delicte'
            ],
            destacatsVermell: [
              'Art. 15 CE: Dret fonamental a la vida i a la integritat física i moral sense cap excepció',
              'Arts. 174-176 Codi Penal: Tipificació penal de la tortura com a delicte comès per funcionari públic',
              'Inhabilitació absoluta i presó: Sancions penals per acció directa o per tolerància/omissió'
            ],
            resumBreu: 'L\'Art. 15 CE garanteix la integritat física i moral, mentre que els Arts. 174 a 176 CP tipifiquen penament la tortura i la seva omissió amb inhabilitació i presó.'
          },
          {
            titolTema: 'Tema 4. El Protocol d\'Istanbul i procediments de prevenció de maltractaments',
            desenvolupamentText: [
              'El Protocol d\'Istanbul és el Manual per a la investigació i documentació eficaces de la tortura i altres penes o tractes cruels, inhumans o degradants, elaborat sota els auspicis de l\'Alt Comissionat de les Nacions Unides per als Drets Humans.',
              'Aquest manual fixa directrius mèdiques, psicològiques i jurídiques per avaluar les víctimes de suposats maltractaments i constitueix una eina de referència per a jutges, fiscals, metges forenses i cossos policials.',
              'Per tal de prevenir qualsevol situació d\'indefensió durant la custòdia policial en dependències de la policia, l\'Article 520 de la Llei d\'Enjudiciament Criminal (LECrim) garanteix els drets irrenunciables del detingut: dret a ser informat de forma clara i immediata dels motius de la detenció, dret a guardar silenci, dret a designar o sol·licitar un advocat d\'ofici, dret a que es posi en coneixement d\'un familiar el fet de la detenció i el lloc de custòdia, i dret a ser examinat per un metge forense o metge del servei de salut públic.',
              'Així mateix, s\'apliquen protocols de gravació en vídeo de les zones de custòdia, registre d\'entrades i sortides de cel·les i inspeccions periòdiques d\'òrgans judicials i del Defensor del Poble (Mecanisme Nacional de Prevenció de la Tortura - MNP).'
            ],
            subratllatVerd: [
              'Protocol d\'Istanbul',
              'Nacions Unides',
              'Article 520 de la Llei d\'Enjudiciament Criminal (LECrim)',
              'dret a ser informat',
              'dret a guardar silenci',
              'dret a designar advocat',
              'comunicació a familiars',
              'reconeixement mèdic forense',
              'Mecanisme Nacional de Prevenció de la Tortura (MNP)'
            ],
            destacatsVermell: [
              'Protocol d\'Istanbul: Manual de l\'ONU per a la investigació mèdica i jurídica de la tortura',
              'Art. 520 LECrim: Catàleg de garanties del detingut (advocat, informació de drets, metge i avís a familiars)',
              'Mecanisme Nacional de Prevenció (MNP): Inspecció independent de les zones de custòdia policial'
            ],
            resumBreu: 'El Protocol d\'Istanbul (ONU) i l\'Art. 520 LECrim estableixen les garanties de custòdia policial (advocat, reconeixement mèdic i MNP) per evitar maltractaments.'
          },
          {
            titolTema: 'Tema 5. L\'ús legítim i proporcional de la força policial',
            desenvolupamentText: [
              'L\'ús de la força i dels mitjans de coacció per part de la policia és una facultat excepcional que deriva del monopoli de la violència legítima de l\'Estat. Aquesta facultat només es pot exercir quan sigui estrictament necessària i amb subjecció plena als principis de legalitat, necessitat i proporcionalitat.',
              'El Principi de Necessitat Absoluta exigeix que l\'agent esgotador prèviament tots els mitjans no violents de resolució de conflictes (diàleg, mediació, advertiment verbal, negociació) abans de recórrer a qualsevol mitjà de contenció física.',
              'Pel que fa a les armes de foc, el seu ús es troba restringit a situacions d\'extrema gravetat en què existeixi un risc imminent de mort o lesions greus per a l\'agent o per a terceres persones, de conformitat amb els Principis Bàsics sobre l\'Ús de la Força i d\'Armes de Foc per als Funcionaris Encarregats de Fer Complir la Llei (Nacions Unides, 1990).',
              'Tota utilització de la força o de les armes de foc genera el deure immediat de prestar assistència mèdica a les persones ferides, elaborar un informe o atestat detallat justificatiu de la intervenció i comunicar els fets de forma immediata a l\'autoritat judicial corresponent.'
            ],
            subratllatVerd: [
              'monopoli de la violència legítima',
              'Principi de Necessitat Absoluta',
              'mitjans no violents',
              'armes de foc',
              'risc imminent de mort o lesions greus',
              'Principis Bàsics de les Nacions Unides (1990)',
              'assistència mèdica immediata',
              'informe o atestat detallat'
            ],
            destacatsVermell: [
              'Ús de la Força: Excepcionalitat i darrer recurs sota necessitat absoluta',
              'Armes de Foc: Limitat exclusivament a situacions de risc imminent per a la vida o integritat física greu (ONU 1990)',
              'Obligació Post-Intervenció: Assistència mèdica immediata i comunicació judicial obligatòria'
            ],
            resumBreu: 'L\'ús de la força policial requereix necessitat absoluta i proporcionalitat estricta; les armes de foc s\'admeten només davant risc imminent per a la vida (ONU 1990).'
          }
        ],
        resumPuntsClau: [
          'Declaració Universal dels Drets Humans (DUDH 1948): Art. 3 (dret a la vida, llibertat i seguretat) i Art. 5 (prohibició de la tortura).',
          'Codi Europeu d\'Ètica Policial (Recomanació Rec 2001/10): Principis de neutralitat, imparcialitat, transparència i submissió a la llei.',
          'Prohibició Absoluta de la Tortura: Art. 15 CE i Art. 174-176 CP. El Protocol d\'Istanbul guia la investigació i documentació d\'abusos.',
          'Uso Legitimitat de la Força: Sempre com a últim recurs, regit per la necessitat i la proporcionalitat estricta.'
        ],
        pdfTextContingut: `Temari Oficial de Seguretat Pública
Curs de formació bàsica per a policies 2026-2027
Mòdul 1. Policia i societat - UF 1.2 Drets humans i deontologia professional (34 hores)

TEMA 1. DRETS HUMANS I DRET INTERNACIONAL
Els drets humans constitueixen el límit infrangible de qualsevol actuació policial en un Estat social i democràtic de dret.
L'art. 15 de la Constitució Espanyola garanteix el dret a la vida i a la integritat física i moral, sense que en cap cas ningú pugui ser sotmès a tortura ni a penes o tractes inhumans o degradants.
El Codi Europeu d'Ètica Policial estableix el marc deontològic per a les forces de seguretat a Europa.`,
        preguntesExamenPredefinides: [
          {
            id: 'q-1-2-1',
            pregunta: 'Quin article de la Constitució Espanyola de 1978 prohibeix de manera absoluta la tortura i els tractes inhumans o degradants?',
            opcions: [
              'A) Article 10',
              'B) Article 14',
              'C) Article 15',
              'D) Article 24'
            ],
            respostaCorrecta: 2,
            explicacio: 'L\'Article 15 CE reconeix el dret a la vida i a la integritat física i moral, prohibint absolutament la tortura i les penes inhumanes.',
            referenciaOficial: 'UF 1.2 Tema 1, Pàg. 15'
          }
        ]
      },
      {
        id: 'uf-1-3',
        code: 'UF 1.3',
        titol: 'Dret constitucional i estatutari',
        descripcio: 'Constitució Espanyola de 1978, Estatut d\'Autonomia de Catalunya de 2006, organització territorial de l\'Estat i institucions autònomes.',
        duradaHores: 25,
        pdfNom: 'Temari_Modul1_UF1.3_Dret_Constitucional_Estatutari.pdf',
        pdfPagines: 95,
        pdfDataPublicacio: '19/11/2025',
        indexPdf: [
          'Tema 1. La Constitució Espanyola de 1978: Valors superiors, drets i llibertats',
          'Tema 2. L\'Estatut d\'Autonomia de Catalunya de 2006 (EAC 2006) i l\'Article 164',
          'Tema 3. Organització territorial de l\'Estat i de Catalunya',
          'Tema 4. Les Institucions de la Generalitat: Parlament, Presidència, Govern i Síndic de Greuges',
          'Tema 5. Garanties constitucionals i el Tribunal Constitucional'
        ],
        temes: [
          {
            titolTema: 'Tema 1. La Constitució Espanyola de 1978: Valors superiors, drets i llibertats',
            desenvolupamentText: [
              'La Constitució Espanyola de 1978 (CE) constitueix la norma suprema i el pilar jurídic de l\'Estat social i democràtic de dret. L\'Article 1.1 CE proclama com a valors superiors de l\'ordenament jurídic la llibertat, la justícia, la igualtat i el pluralisme polític.',
              'El Títol I de la CE regula els Drets i Deures Fonamentals. Destaca la Secció 1a del Capítol II (Articles 14 a 29 CE), la qual gaudeix de la màxima protecció reforçada: procediment preferent i summari davant els tribunals ordinaris i recurs d\'empara davant el Tribunal Constitucional (Art. 53.2 CE).',
              'Entre aquests drets destaquen el principi d\'igualtat i no-discriminació (Art. 14 CE), el dret a la vida i a la integritat física i moral (Art. 15 CE), la llibertat d\'ideologia i religió (Art. 16 CE), el dret a la llibertat i a la seguretat (Art. 17 CE), el dret a l\'honor, a la intimitat personal i a la inviolabilitat del domicili (Art. 18 CE) i la tutela judicial efectiva (Art. 24 CE).',
              'Tots els funcionaris policials tenen el deure jurat d\'actuar com a garants directes de l\'exercici efectiu d\'aquests drets constitucionals en cadascuna de les seves intervencions diàries.'
            ],
            subratllatVerd: [
              'Constitució Espanyola de 1978',
              'Estat social i democràtic de dret',
              'Article 1.1 CE',
              'llibertat, la justícia, la igualtat i el pluralisme polític',
              'Articles 14 a 29 CE',
              'recurs d\'empara davant el Tribunal Constitucional',
              'dret a la llibertat i a la seguretat (Art. 17 CE)',
              'inviolabilitat del domicili (Art. 18 CE)'
            ],
            destacatsVermell: [
              'Art. 1.1 CE: Valors superiors de l\'Estat (Llibertat, Justícia, Igualtat i Pluralisme)',
              'Arts. 14 a 29 CE: Secció de Drets Fonamentals amb màxima protecció constitucional i recurs d\'empara',
              'Arts. 17 i 18 CE: Marc constitucional directe de la intervenció policial (llibertat personal i domicili)'
            ],
            resumBreu: 'La CE 1978 fixa l\'Estat social i democràtic de dret, situant els Arts. 14 a 29 CE com a drets fonamentals amb la màxima protecció jurídica i recurs d\'empara.'
          },
          {
            titolTema: 'Tema 2. L\'Estatut d\'Autonomia de Catalunya de 2006 (EAC 2006) i l\'Article 164',
            desenvolupamentText: [
              'L\'Estatut d\'Autonomia de Catalunya de 2006 (Llei Orgànica 6/2006, de 19 de juliol) és la norma institucional bàsica de Catalunya d\'acord amb la Constitució.',
              'A l\'Article 164 de l\'EAC 2006, s\'atribueix a la Generalitat de Catalunya la competència exclusiva en matèria de seguretat pública. Això comprèn la planificació i l\'ordenació del sistema de seguretat pública de Catalunya, el comandament suprem de la Policia de la Generalitat - Mossos d\'Esquadra, la coordinació de les policies locals catalanes i el control de la seguretat privada.',
              'L\'Estatut reconeix el cos de Mossos d\'Esquadra com la policia ordinària i integral a tot el territori de Catalunya, habilitada per a l\'exercici de totes les funcions policials executives en matèria de seguretat ciutadana, investigació i ordre públic.',
              'A més, l\'EAC consagra els drets i principis rectors de les polítiques públiques catalanes, imposant a l\'administració el deure de prestar serveis públics de qualitat, eficients i transparents.'
            ],
            subratllatVerd: [
              'Llei Orgànica 6/2006',
              'Estatut d\'Autonomia de Catalunya',
              'Article 164 de l\'EAC 2006',
              'competència exclusiva en matèria de seguretat pública',
              'comandament suprem',
              'policia ordinària i integral',
              'principis rectors'
            ],
            destacatsVermell: [
              'Llei Orgànica 6/2006 (EAC 2006): Norma institucional bàsica de Catalunya',
              'Art. 164 EAC: Competència exclusiva de la Generalitat en seguretat pública i policia autònoma',
              'PG-ME: Reconeixement com a policia ordinària i integral a tot el territori català'
            ],
            resumBreu: 'L\'EAC 2006 atorga a la Generalitat la competència exclusiva en seguretat pública (Art. 164) i defineix els Mossos d\'Esquadra com a policia ordinària i integral.'
          },
          {
            titolTema: 'Tema 3. Organització territorial de l\'Estat i de Catalunya',
            desenvolupamentText: [
              'D\'acord amb el Títol VIII de la Constitució Espanyola (Article 137 CE), l\'Estat s\'organitza territorialment en municipis, províncies i Comunitats Autònomes. Totes aquestes entitats gocen d\'autonomia per a la gestió dels seus interessos respectius.',
              'A Catalunya, l\'organització territorial interna es fonamenta en els municipis (entitat local bàsica, representada per l\'Ajuntament) i les comarques (entitat local de cooperació municipal). L\'Estatut preveu així mateix l\'organització veguerial.',
              'L\'autonomia local garanteix als municipis la potestat reglamentària (ordenances municipals) i competències pròpies en matèria de seguretat en la circulació de vies urbanes, protecció civil local, policia administrativa de convivència i neteja urbana.',
              'La coordinació entre les administracions estatal, autònoma i local és un deure constitucional i estatutari per evitar la duplicitat de serveis i optimitzar els recursos públics.'
            ],
            subratllatVerd: [
              'Títol VIII de la Constitució',
              'Article 137 CE',
              'municipis, províncies i Comunitats Autònomes',
              'autonomia local',
              'ordenances municipals',
              'potestat reglamentària',
              'coordinació entre les administracions'
            ],
            destacatsVermell: [
              'Art. 137 CE: Estructura territorial de l\'Estat en municipis, províncies i Comunitats Autònomes',
              'Autonomia Local: Capacitat dels municipis per aprovar ordenances i gestionar el trànsit i la convivència urbana',
              'Principi de Coordinació Administració-Policia: Cooperació obligatòria entre Generalitat, Estat i Ajuntaments'
            ],
            resumBreu: 'L\'Art. 137 CE i l\'EAC organitzen el territori en CCAA, províncies i municipis, atorgant autonomia local per aprovar ordenances de convivència i trànsit.'
          },
          {
            titolTema: 'Tema 4. Les Institucions de la Generalitat: Parlament, Presidència, Govern i Síndic de Greuges',
            desenvolupamentText: [
              'El Títol II de l\'Estatut d\'Autonomia regula les Institucions de la Generalitat de Catalunya. La Generalitat està integrada pel Parlament, la Presidència de la Generalitat i el Govern.',
              'El Parlament de Catalunya representa el poble de Catalunya, exerceix la potestat legislativa, aprova els pressupostos de la Generalitat i controla l\'acció política i de govern.',
              'El President de la Generalitat és la màxima representació de la Generalitat i la ordinària de l\'Estat a Catalunya. Dirigeix l\'acció del Govern.',
              'El Govern és l\'òrgan col·legiat que dirigeix la política i l\'administració de la Generalitat. Dins del Govern, el Departament d\'Interior (o de Seguretat Pública) assumeix la direcció superior de la policia i de la protecció civil.',
              'El Síndic de Greuges és l\'alt comissionat del Parlament per a la defensa dels drets fonamentals i les llibertats públiques, amb facultat per supervisar l\'activitat de l\'Administració de la Generalitat i dels cossos policials.'
            ],
            subratllatVerd: [
              'Institucions de la Generalitat',
              'Parlament de Catalunya',
              'potestat legislativa',
              'President de la Generalitat',
              'Departament d\'Interior',
              'Síndic de Greuges',
              'supervisar l\'activitat de l\'Administració'
            ],
            destacatsVermell: [
              'Parlament de Catalunya: Òrgan legislatiu i de representació popular',
              'Govern i Departament d\'Interior: Executiu autònom responsable de la direcció de la seguretat pública',
              'Síndic de Greuges: Alt comissionat de garanties i drets de la ciutadania davant la policia'
            ],
            resumBreu: 'La Generalitat s\'estructura en Parlament (legislatiu), President/Govern (executiu i direcció d\'Interior) i Síndic de Greuges (supervisió de drets).'
          },
          {
            titolTema: 'Tema 5. Garanties constitucionals i el Tribunal Constitucional',
            desenvolupamentText: [
              'El Tribunal Constitucional (TC) és l\'òrgan constitucional independent encarregat de ser l\'intèrpret suprem de la Constitució Espanyola (Títol IX CE, Articles 159 a 165).',
              'Les seves competències principals inclouen el recurs d\'inconstitucionalitat i la qüestió d\'inconstitucionalitat contra lleis, els conflictes de competència entre l\'Estat i les Comunitats Autònomes, i el recurs d\'empara constitucional per la violació dels drets fonamentals (Arts. 14 a 29 i 30.2 CE).',
              'La jurisprudència del Tribunal Constitucional estableix doctrines d\'obligat compliment per a tots els jutges, tribunals i administracions públiques sobre els límits de les detencions policials, els escorcolls, l\'entrada en domicili i la proporcionalitat en la restricció de drets.'
            ],
            subratllatVerd: [
              'Tribunal Constitucional (TC)',
              'intèrpret suprem de la Constitució',
              'recurs d\'inconstitucionalitat',
              'conflictes de competència',
              'recurs d\'empara constitucional',
              'jurisprudència del Tribunal Constitucional'
            ],
            destacatsVermell: [
              'Tribunal Constitucional: Intèrpret suprem de la CE i garantia de la jerarquia normativa',
              'Recurs d\'Empara: Protecció darrera dels drets fonamentals davant vulneracions de poders públics',
              'Doctrina del TC: Fixa els límits jurisprudencials de les detencions i registres policials'
            ],
            resumBreu: 'El Tribunal Constitucional interpreta la CE, resol conflictes de competència i garanteix els drets fonamentals mitjançant el recurs d\'empara.'
          }
        ],
        resumPuntsClau: [
          'CE 1978: Valors superiors de l\'ordenament jurídic (llibertat, justícia, igualtat i pluralisme polític, art. 1.1 CE).',
          'Estatut d\'Autonomia de Catalunya (EAC 2006): Art. 164 atribueix a la Generalitat la competència exclusiva en matèria de seguretat pública.',
          'Institucions de la Generalitat: Parlament, Presidència, Govern i Síndic de Greuges.',
          'Drets Fonamentals i Llibertats Públiques: Arts. 14 a 29 CE (secció 1a del Capítol II).'
        ],
        pdfTextContingut: `Temari Oficial de Seguretat Pública
Curs de formació bàsica per a policies 2026-2027
Mòdul 1. Policia i societat - UF 1.3 Dret constitucional i estatutari (25 hores)

TEMA 1. LA CONSTITUCIÓ ESPANYOLA I L'ESTATUT D'AUTONOMIA
La CE 1978 és la norma suprema de l'ordenament jurídic.
L'Estatut d'Autonomia de Catalunya de 2006 (Llei Orgànica 6/2006) defineix les competències de la Generalitat. L'article 164 regula la Policia de la Generalitat - Mossos d'Esquadra i el sistema de seguretat pública de Catalunya.`,
        preguntesExamenPredefinides: [
          {
            id: 'q-1-3-1',
            pregunta: 'Quin article de l\'Estatut d\'Autonomia de Catalunya de 2006 estableix les competències en matèria de seguretat pública i policia?',
            opcions: [
              'A) Article 116',
              'B) Article 150',
              'C) Article 164',
              'D) Article 200'
            ],
            respostaCorrecta: 2,
            explicacio: 'L\'article 164 de l\'EAC atorga a la Generalitat la competència sobre el model policial i la seguretat pública a Catalunya.',
            referenciaOficial: 'UF 1.3 Tema 2, Pàg. 42'
          }
        ]
      },
      {
        id: 'uf-1-4',
        code: 'UF 1.4',
        titol: 'Criminologia: policia i estructura social',
        descripcio: 'Teories criminològiques, prevenció del delicte, victimologia, percepció de la seguretat i diversitat social.',
        duradaHores: 25,
        pdfNom: 'Temari_Modul1_UF1.4_Criminologia_Estructura_Social.pdf',
        pdfPagines: 85,
        pdfDataPublicacio: '19/11/2025',
        resumPuntsClau: [
          'Teories del Delicte: Teoria de les finestres trencades, teoria de les activitats quotidianes (Cohen i Felson) i prevenció situacional.',
          'Victimologia: Atenció primària a les víctimes, prevenció de la revictimització o victimització secundària.',
          'Por al Delicte vs. Risc Real: La percepció subjectiva d\'inseguretat i el seu impacte en la cohesió social.'
        ],
        pdfTextContingut: `Temari Oficial de Seguretat Pública
Curs de formació bàsica per a policies 2026-2027
Mòdul 1. Policia i societat - UF 1.4 Criminologia (25 hores)

TEMA 1. CRIMINOLOGIA APLICADA A LA SOSPITA I PREVENCIÓ POLICIAL
Estudi dels factors determinants del delicte, la figura de l'infractor, la víctima i el control social formal i informal. Prevenció situacional del delicte i intervenció policial de proximitat.`,
        preguntesExamenPredefinides: [
          {
            id: 'q-1-4-1',
            pregunta: 'Quina teoria criminològica sosté que el manteniment de l\'ordre i la reparació immediata de petits danys urbans evita la degradació d\'un barri i l\'aparició de delictes greus?',
            opcions: [
              'A) Teoria de l\'Associació Diferencial',
              'B) Teoria de les Finestres Trencades (Broken Windows)',
              'C) Teoria de l\'Anomia de Merton',
              'D) Teoria de l\'Etiquetatge (Labeling Approach)'
            ],
            respostaCorrecta: 1,
            explicacio: 'La Teoria de les Finestres Trencades (Wilson i Kelling, 1982) defensa que el desordre urbà no atès atreu la criminalitat greu.',
            referenciaOficial: 'UF 1.4 Tema 1, Pàg. 20'
          }
        ]
      },
      {
        id: 'uf-1-5',
        code: 'UF 1.5',
        titol: 'Geografia de Catalunya i el mapa policial català',
        descripcio: 'Divisió territorial de Catalunya, comarques, regions policials, Àrees Bàsiques Policials (ABP) i infraestructures crítiques.',
        duradaHores: 10,
        pdfNom: 'Temari_Modul1_UF1.5_Geografia_i_Mapa_Policial.pdf',
        pdfPagines: 50,
        pdfDataPublicacio: '19/11/2025',
        resumPuntsClau: [
          'Regions Policials de la PG-ME: 10 Regions Policials (Metropolitana Barcelona, Nord, Sud, Girona, Ponent, Pirineu Occidental, Camp de Tarragona, Terres de l\'Ebre, Central i Ciberespai).',
          'Àrees Bàsiques Policials (ABP): Unitat territorial fonamental per a la prestació dels serveis policials de seguretat ciutadana.',
          'Xarxa Viària Principal: AP-7, C-32, C-16, A-2, N-II, N-340 i corredors de transport crític.'
        ],
        pdfTextContingut: `Temari Oficial de Seguretat Pública
Curs de formació bàsica per a policies 2026-2027
Mòdul 1. Policia i societat - UF 1.5 Geografia de Catalunya i mapa policial (10 hores)

TEMA 1. L'ORGANITZACIÓ TERRITORIAL DE CATALUNYA I EL MAPA POLICIAL
Desplegament de la PG-ME acabat el 2008. Structura en Regions Policials (RP) i Àrees Bàsiques Policials (ABP) coordinades amb les Policia Locals.`,
        preguntesExamenPredefinides: [
          {
            id: 'q-1-5-1',
            pregunta: 'Quina és la unitat operativa territorial bàsica de la PG-ME encarregada de prestar la cobertura de seguretat ciutadana en un o diversos municipis?',
            opcions: [
              'A) Regió Policial (RP)',
              'B) Àrea Bàsica Policial (ABP)',
              'C) Àrea Central d\'Investigació',
              'D) Comissaria General'
            ],
            respostaCorrecta: 1,
            explicacio: 'L\'ABP (Àrea Bàsica Policial) constitueix la unitat territorial operativa fonamental de la PG-ME.',
            referenciaOficial: 'UF 1.5 Tema 1, Pàg. 12'
          }
        ]
      },
      {
        id: 'uf-1-6',
        code: 'UF 1.6',
        titol: 'Història de la Policia a Catalunya',
        descripcio: 'Orígens dels Mossos d\'Esquadra (Escuadres de Paisanos), evolució històrica, refundació i desplegament modern.',
        duradaHores: 25,
        pdfNom: 'Temari_Modul1_UF1.6_Historia_Policia_Catalunya.pdf',
        pdfPagines: 70,
        pdfDataPublicacio: '19/11/2025',
        resumPuntsClau: [
          'Orígens (1719 - Pere Anton Veciana): Creació de les Escuadres de Paisanos a Valls per perseguir el bandolerisme i els carlistes.',
          'Evolució al Segle XX: Supressió durant la Segona República i Franquisme, restitució de la secció de la Diputació de Barcelona el 1952.',
          'Llei 10/1994 de la PG-ME: Llei de creació de la Policia de la Generalitat com a policia autònoma i integral de Catalunya.'
        ],
        pdfTextContingut: `Temari Oficial de Seguretat Pública
Curs de formació bàsica per a policies 2026-2027
Mòdul 1. Policia i societat - UF 1.6 Història de la Policia a Catalunya (25 hores)

TEMA 1. DELS ORÍGENS A LA POLICIA MODERNA
Creació de les primeres Esquadres de Paisans el segle XVIII a Valls pel batlle Pere Anton Veciana. Evolució de la institució fins a la promulgació de la Llei 10/1994.`,
        preguntesExamenPredefinides: [
          {
            id: 'q-1-6-1',
            pregunta: 'En quina ciutat catalana i sota el comandament de quin batlle es van originar les primeres Escuadres de Paisanos al segle XVIII?',
            opcions: [
              'A) Girona - Francesc de Castellví',
              'B) Valls - Pere Anton Veciana',
              'C) Manresa - Joan de Serrallonga',
              'D) Lleida - Manuel de Amat'
            ],
            respostaCorrecta: 1,
            explicacio: 'Les Esquadres van néixer a Valls a principis del segle XVIII encapçalades per Pere Anton Veciana.',
            referenciaOficial: 'UF 1.6 Tema 1, Pàg. 8'
          }
        ]
      }
    ]
  },

  {
    id: 'modul-2',
    numero: 2,
    code: 'Mòdul 2',
    titol: 'Policia i ús progressiu de la força',
    descripcio: 'Estratègies de prevenció de l\'ús de la força, procediments policials, autoprotecció, tir i armament, educació física i mediació.',
    icona: 'Siren',
    unitatsFormatives: [
      {
        id: 'uf-2-1',
        code: 'UF 2.1',
        titol: 'Estratègies de prevenció de l\'ús de la força',
        descripcio: 'Avaluació del risc, desescalada verbal, comunicació no verbal i gestió de la distància de seguretat.',
        duradaHores: 10,
        pdfNom: 'Temari_Modul2_UF2.1_Prevencio_Us_Forca.pdf',
        pdfPagines: 60,
        pdfDataPublicacio: '19/11/2025',
        resumPuntsClau: [
          'Piràmide de l\'Ús de la Força: Presència policial -> Comunicació verbal -> Control físic -> Mitjans d\'intervenció no letals -> Força potencialment letal.',
          'Tècniques de Desescalada: Escoltar activament, to de veu ferm però no agressiu, mantenir la distància de seguretat (mínim 2 metres).',
          'Avaluació de l\'Entorn: Identificació de vies d\'escapatòria, elements perillosos i presència de tercers.'
        ],
        pdfTextContingut: `Temari Oficial de Seguretat Pública
Curs de formació bàsica per a policies 2026-2027
Mòdul 2. Policia i ús progressiu de la força - UF 2.1 Estratègies de prevenció de l'ús de la força (10 hores)

TEMA 1. EL model d'ús progressiu de la força
La força pública s'utilitza strictly sota principis de necessitat, oportunitat i proporcionalitat. La desescalada verbal és la primera línia d'actuació.`,
        preguntesExamenPredefinides: [
          {
            id: 'q-2-1-1',
            pregunta: 'Quin és el primer nivell en la línia d\'intervenció de la piràmide de l\'ús de la força policial davant d\'una persona cooperativa?',
            opcions: [
              'A) Control físic mitjançant luxació',
              'B) Presència policial i comunicació verbal persuasiva',
              'C) Ús de la defensa policial (porra)',
              'D) Exhibició de l\'arma de foc'
            ],
            respostaCorrecta: 1,
            explicacio: 'La presència preventiva de l\'uniforme i el diàleg persuasiu són el primer nivell de la piràmide.',
            referenciaOficial: 'UF 2.1 Tema 1, Pàg. 14'
          }
        ]
      },
      {
        id: 'uf-2-2',
        code: 'UF 2.2',
        titol: 'Procediments policials (*)',
        descripcio: 'Tècniques d\'identificació, escorcoll de seguretat, immobilització, emmanillament, trasllat de detinguts i dispositius d\'intervenció.',
        duradaHores: 79,
        pdfNom: 'Temari_Modul2_UF2.2_Procediments_Policials.pdf',
        pdfPagines: 180,
        pdfDataPublicacio: '19/11/2025',
        resumPuntsClau: [
          'Escorcoll de Seguretat (LO 4/2015): Superficial, realitzat per agent del mateix sexe (excepte urgència extrema), motivat per indicis racionalment suficients.',
          'Emmanillament: Tècniques d\'emmanillament per la darrera (dors de les mans junts, claus cap amunt), bloqueig del mecanisme de doble tancament.',
          'Llei Orgànica 4/2015 de Seguretat Ciutadana: Identificació a la via pública i trasllat a dependències policials quan no sigui possible identificar in situ (màxim 6 hores).'
        ],
        pdfTextContingut: `Temari Oficial de Seguretat Pública
Curs de formació bàsica per a policies 2026-2027
Mòdul 2. UF 2.2 Procediments policials (79 hores)

TEMA 1. IDENTIFICACIÓ I ESCORCOLLS
Requisits de la LO 4/2015. L'escorcoll superficial de seguretat té caràcter preventiu. Protocol de trasllat a dependències per a identificació.`,
        preguntesExamenPredefinides: [
          {
            id: 'q-2-2-1',
            pregunta: 'Quin és el temps màxim permès per la LO 4/2015 per al trasllat i la permanència a dependències policials a efectes d\'identificació?',
            opcions: [
              'A) 2 hores',
              'B) 6 hores',
              'C) 24 hores',
              'D) 72 hores'
            ],
            respostaCorrecta: 1,
            explicacio: 'L\'article 16.2 de la LO 4/2015 fixa en un màxim de 6 hores el temps excepcional de permanència a comissaria per identificar una persona.',
            referenciaOficial: 'UF 2.2 Tema 2, Pàg. 45'
          }
        ]
      },
      {
        id: 'uf-2-3',
        code: 'UF 2.3',
        titol: 'Autoprotecció i control policial (*)',
        descripcio: 'Defensa personal policial, reducció d\'agressors, desarmament, ús de la defensa policial rígida/extensible i posicions de guarda.',
        duradaHores: 74,
        pdfNom: 'Temari_Modul2_UF2.3_Autoproteccio_Control.pdf',
        pdfPagines: 150,
        pdfDataPublicacio: '19/11/2025',
        resumPuntsClau: [
          'Zones d\'Impacte Permeses amb la Defensa: Cames (quadriceps, bessons) i braços. Queda strictly prohibit l\'impacte al cap, coll o zones vitals.',
          'Posicions de Control: Control en terra, posició lateral de seguretat, evitatge d\'asfíxia posicional.',
          'Tècniques de Projecció i Luxació: Ús de la força mínima indispensable per reduir subjectes violents.'
        ],
        pdfTextContingut: `Temari Oficial de Seguretat Pública
Curs de formació bàsica per a policies 2026-2027
Mòdul 2. UF 2.3 Autoprotecció i control policial (74 hores)

TEMA 1. TÈCNIQUES DE CONTROL I DEFENSA
Zones d'impacte permissibles i zones prohibides. Mesures de prevenció contra l'asfíxia posicional durant la reducció.`,
        preguntesExamenPredefinides: [
          {
            id: 'q-2-3-1',
            pregunta: 'Quines zones corporals queden estrictament prohibides per a l\'impacte amb la defensa policial extensible o rígida durant una reducció no letal?',
            opcions: [
              'A) Quadriceps i bessons',
              'B) Cap, coll, columna vertebral i zona genital',
              'C) Braços i avantbraços',
              'D) Glutens i cuixes'
            ],
            respostaCorrecta: 1,
            explicacio: 'L\'impacte al cap, coll o òrgans vitals pot causar lesions permanents o la mort i està prohibit en l\'ús de la defensa.',
            referenciaOficial: 'UF 2.3 Tema 1, Pàg. 30'
          }
        ]
      },
      {
        id: 'uf-2-4',
        code: 'UF 2.4',
        titol: 'Tir i armament',
        descripcio: 'Normes de seguretat de les armes de foc, balística, manipulació de l\'arma reglamentària, resolució d\'encavallaments i pràctiques de tir.',
        duradaHores: 50,
        pdfNom: 'Temari_Modul2_UF2.4_Tir_i_Armament.pdf',
        pdfPagines: 120,
        pdfDataPublicacio: '19/11/2025',
        resumPuntsClau: [
          'Quatre Regles d\'Or de Seguretat d\'Armes: 1) Considerar l\'arma sempre carregada; 2) No apuntar mai a res que no es vulgui destruir; 3) Dit fora del disparador fins a apuntar; 4) Assegurar l\'entorn de la línia de tir.',
          'Armes Reglamentàries: Pistola semiautomàtica 9x19mm Parabellum, cartutxeria i mecanismes de seguretat passius i actius.',
          'Legítima Defensa Policial: Requisits d\'agressió il·legítima, necessitat racional del mitjà emprat i manca de provocació.'
        ],
        pdfTextContingut: `Temari Oficial de Seguretat Pública
Curs de formació bàsica per a policies 2026-2027
Mòdul 2. UF 2.4 Tir i armament (50 hores)

TEMA 1. SEGURETAT I MANIPULACIÓ D'ARMES DE FOC
L'ús de l'arma de foc és la mesura d'últim recurs extrem, autoritzat davant d'un risc imminent per a la vida de l'agent o de tercers.`,
        preguntesExamenPredefinides: [
          {
            id: 'q-2-4-1',
            pregunta: 'Quina és la regla fonamental de seguretat en la manipulació de qualsevol arma de foc policial?',
            opcions: [
              'A) Deixar el canó mirant cap als peus',
              'B) Considerar sempre que l\'arma està carregada i a punt de disparar',
              'C) Treure el carregador només en acabar la feina',
              'D) Tenir sempre el dit col·locat sobre el disparador'
            ],
            respostaCorrecta: 1,
            explicacio: 'Tota arma de foc ha de ser tractada com si estigués carregada en tot moment.',
            referenciaOficial: 'UF 2.4 Tema 1, Pàg. 10'
          }
        ]
      },
      {
        id: 'uf-2-5',
        code: 'UF 2.5',
        titol: 'Educació física',
        descripcio: 'Acondicionament físic general, resistència, força, agilitat, preparació per a les proves físiques i salut operacional.',
        duradaHores: 20,
        pdfNom: 'Temari_Modul2_UF2.5_Educacio_Fisica.pdf',
        pdfPagines: 40,
        pdfDataPublicacio: '19/11/2025',
        resumPuntsClau: [
          'Capacitats Físiques Bàsiques: Resistència aeròbica, força explosiva, flexibilitat i agilitat.',
          'Programes de prevenció de lesions policials i hàbits de salut laboral.'
        ],
        pdfTextContingut: `Temari Oficial de Seguretat Pública
Curs de formació bàsica per a policies 2026-2027
Mòdul 2. UF 2.5 Educació física (20 hores)`,
        preguntesExamenPredefinides: [
          {
            id: 'q-2-5-1',
            pregunta: 'Quina capacitat física és fonamental per mantenir l\'esforç sostingut durant una persecució a peu prolongada?',
            opcions: [
              'A) Força màxima',
              'B) Resistència aeròbica',
              'C) Flexibilitat passiva',
              'D) Coordinació motora fina'
            ],
            respostaCorrecta: 1,
            explicacio: 'La resistència aeròbica permet a l\'organismes mantenir esforços d\'intensitat mitjana o alta en el temps.',
            referenciaOficial: 'UF 2.5 Tema 1, Pàg. 8'
          }
        ]
      },
      {
        id: 'uf-2-6',
        code: 'UF 2.6',
        titol: 'La mediació en la gestió policial del conflicte',
        descripcio: 'Tècniques de negociació, resolució pacífica de disputes veïnals i familiars, arbitratge i escolta empatica.',
        duradaHores: 15,
        pdfNom: 'Temari_Modul2_UF2.6_Mediacio_Policial.pdf',
        pdfPagines: 55,
        pdfDataPublicacio: '19/11/2025',
        resumPuntsClau: [
          'Mediació Policial: Procediment voluntari, confidencial i neutral per ajudar les parts en conflicte a trobar solucions pactades.',
          'Eines del Mediador: Paràfrasi, preguntes obertes, legitimació de les parts i reestructuració positiva de missatges.'
        ],
        pdfTextContingut: `Temari Oficial de Seguretat Pública
Curs de formació bàsica per a policies 2026-2027
Mòdul 2. UF 2.6 La mediació en la gestió policial del conflicte (15 hores)`,
        preguntesExamenPredefinides: [
          {
            id: 'q-2-6-1',
            pregunta: 'Quin és el principi clau de la mediació policial davant d\'un conflicte de convivència veïnal?',
            opcions: [
              'A) Imposar la sanció administrativa immediata',
              'B) Mantenir una posició neutral i facilitar la comunicació entre les parts',
              'C) Prendre la decisió en lloc de les parts implicades',
              'D) Obligar la part afectada a retirar la queixa'
            ],
            respostaCorrecta: 1,
            explicacio: 'El policia mediador actua com un tercer neutral que ajuda les parts a assolir els seus propis acords.',
            referenciaOficial: 'UF 2.6 Tema 1, Pàg. 18'
          }
        ]
      }
    ]
  },

  {
    id: 'modul-3',
    numero: 3,
    code: 'Mòdul 3',
    titol: 'Policia de seguretat ciutadana',
    descripcio: 'Regulació de la funció policial de protecció, model de proximitat, pautes operatives d\'actuació i atenció a la ciutadania a comissaria.',
    icona: 'Users',
    unitatsFormatives: [
      {
        id: 'uf-3-1',
        code: 'UF 3.1',
        titol: 'La regulació de la funció policial de protecció',
        descripcio: 'Marc legal de la protecció de persones i béns, atenció a col·lectius vulnerables i prevenció delictiva.',
        duradaHores: 17,
        pdfNom: 'Temari_Modul3_UF3.1_Funcio_Policial_Proteccio.pdf',
        pdfPagines: 75,
        pdfDataPublicacio: '19/11/2025',
        resumPuntsClau: [
          'Protecció de Persones i Béns: Funció essencial de la seguretat ciutadana (LO 4/2015 i Llei 10/1994).',
          'Atenció a la Violència de Gènere i Domèstica: Protocol d\'actuació, valoració del risc (VioGén / Grups d\'Atenció a la Víctima GAV) i ordres de protecció.'
        ],
        pdfTextContingut: `Temari Oficial de Seguretat Pública
Curs de formació bàsica per a policies 2026-2027
Mòdul 3. UF 3.1 La regulació de la funció policial de protecció (17 hores)`,
        preguntesExamenPredefinides: [
          {
            id: 'q-3-1-1',
            pregunta: 'Quin grup especialitzat de la PG-ME és l\'encarregat d\'oferir un seguiment personalitzat a les víctimes de violència de gènere?',
            opcions: [
              'A) Grup d\'Atenció a la Víctima (GAV)',
              'B) Àrea Regional de Recursos Operatius (ARRO)',
              'C) Brigada Mòbil (BRIMO)',
              'D) Unitat de Seguretat Ciutadana (USC)'
            ],
            respostaCorrecta: 0,
            explicacio: 'Els GAV (Grups d\'Atenció a la Víctima) estan especialitzats en la protecció i seguiment de víctimes vulnerables.',
            referenciaOficial: 'UF 3.1 Tema 2, Pàg. 24'
          }
        ]
      },
      {
        id: 'uf-3-2',
        code: 'UF 3.2',
        titol: 'Model de proximitat',
        descripcio: 'Filosofia de policia de barri, patrullatge a peu, relació amb associacions veïnals i resolució de problemes comunitaris (POP).',
        duradaHores: 17,
        pdfNom: 'Temari_Modul3_UF3.2_Model_Proximitat.pdf',
        pdfPagines: 65,
        pdfDataPublicacio: '19/11/2025',
        resumPuntsClau: [
          'Policia Orientada a la Resolució de Problemes (POP - SARA): Scanning (Identificació), Analysis (Anàlisi), Response (Resposta) i Assessment (Avaluació).',
          'Aproximació a la Comunitat: Transmetre confiança, transparència i presència contínua als eixos comercials i escolars.'
        ],
        pdfTextContingut: `Temari Oficial de Seguretat Pública
Curs de formació bàsica per a policies 2026-2027
Mòdul 3. UF 3.2 Model de proximitat (17 hores)`,
        preguntesExamenPredefinides: [
          {
            id: 'q-3-2-1',
            pregunta: 'Quines són les quatre etapes del mètode SARA utilitzat en la Policia Orientada a la Resolució de Problemes (POP)?',
            opcions: [
              'A) Seguretat, Atenció, Resposta, Arrest',
              'B) Scanning (Identificació), Analysis (Anàlisi), Response (Resposta) i Assessment (Avaluació)',
              'C) Sanció, Acció, Reclamació, Arxiu',
              'D) Seguiment, Avaluació, Reacció, Anàlisi'
            ],
            respostaCorrecta: 1,
            explicacio: 'El model SARA és la metodologia clau de la resolució de problemes comunitaris en la policia de proximitat.',
            referenciaOficial: 'UF 3.2 Tema 1, Pàg. 15'
          }
        ]
      },
      {
        id: 'uf-3-3',
        code: 'UF 3.3',
        titol: 'Pautes operatives d\'actuació',
        descripcio: 'Patrullatge en vehicle i a peu, atenció a requeriments del 112, protocols d\'atracaments, alarmes, controls de pas i inspeccions.',
        duradaHores: 83,
        pdfNom: 'Temari_Modul3_UF3.3_Pautes_Operatives_Actuacio.pdf',
        pdfPagines: 210,
        pdfDataPublicacio: '19/11/2025',
        resumPuntsClau: [
          'Gestió de Requeriments pel 112 / Sales de Comandament (SACP): Priorització de codis d\'emergència (Codi Vermell, Groc, Verd).',
          'Inspecció de Vehicles i Controls de Pas: Posicionament de seguretat del vehicle de patrulla (efecte pantalla), comunicació constant de la ubicació.',
          'Intervenció en Delictes In Flagrante: Assegurament de l\'escena, protecció de proves, detenció i lectura dels drets del detingut (Art. 520 LECrim).'
        ],
        pdfTextContingut: `Temari Oficial de Seguretat Pública
Curs de formació bàsica per a policies 2026-2027
Mòdul 3. UF 3.3 Pautes operatives d'actuació (83 hores)

TEMA 1. EL PATRULLATGE I ELS REQUERIMENTS
L'atenció als requeriments ciutadans a través del telèfon d'emergències 112 i les sales de coordinació operativa.
Procediments de seguretat en la detenció i l'aplicació de l'art. 520 de la Llei d'Enjudiciament Criminal.`,
        preguntesExamenPredefinides: [
          {
            id: 'q-3-3-1',
            pregunta: 'Segons l\'article 520 de la LECrim, quin dret té tota persona detinguda des del mateix moment de la privació de llibertat?',
            opcions: [
              'A) A realitzar un màxim de cinc trucades telefòniques a l\'estranger',
              'B) A ser informada de manera immediata i comprensible dels seus drets i dels motius de la detenció',
              'C) A quedar en llibertat automàtica si no hi ha un jutge present a la comissaria',
              'D) A no ser sotmesa a cap tipus d\'escorcoll de seguretat'
            ],
            respostaCorrecta: 1,
            explicacio: 'L\'art. 520 LECrim exigeix la informació immediata, clara i comprensible dels drets i motius de la detenció.',
            referenciaOficial: 'UF 3.3 Tema 3, Pàg. 88'
          }
        ]
      },
      {
        id: 'uf-3-4',
        code: 'UF 3.4',
        titol: 'Atenció a la ciutadania a dependències policials',
        descripcio: 'Recepció de denúncies, atenció presencial a comissaria, custòdia de detinguts, gestió d\'objectes perduts i tramitació administrativa.',
        duradaHores: 47,
        pdfNom: 'Temari_Modul3_UF3.4_Atencio_Ciutadania_Dependencies.pdf',
        pdfPagines: 115,
        pdfDataPublicacio: '19/11/2025',
        resumPuntsClau: [
          'Oficina d\'Atenció al Ciutadà (OAC): Atenció de denúncies per delictes i faltes, tramitació de citacions judicials.',
          'Àrea de Custòdia de Detinguts (ACD): Protocol d\'ingrés, revisió mèdica, registre d\'efectes personals i custòdia garantint la seguretat física.'
        ],
        pdfTextContingut: `Temari Oficial de Seguretat Pública
Curs de formació bàsica per a policies 2026-2027
Mòdul 3. UF 3.4 Atenció a la ciutadania a dependències policials (47 hores)`,
        preguntesExamenPredefinides: [
          {
            id: 'q-3-4-1',
            pregunta: 'Quina és la funció principal de l\'Oficina d\'Atenció al Ciutadà (OAC) en una comissaria de policia?',
            opcions: [
              'A) El tir d\'instrucció de les unitats especials',
              'B) La recepció, tramitació i formalització de denúncies i atencions al públic',
              'C) La gestió exclusiva del trànsit interurbà',
              'D) El control de les telecomunicacions del 112'
            ],
            respostaCorrecta: 1,
            explicacio: 'L\'OAC és la cara visible per a l\'atenció directa, recepció de denúncies i assistència presencial a la ciutadania.',
            referenciaOficial: 'UF 3.4 Tema 1, Pàg. 12'
          }
        ]
      }
    ]
  },

  {
    id: 'modul-4',
    numero: 4,
    code: 'Mòdul 4',
    titol: 'Policia de trànsit',
    descripcio: 'Normativa de trànsit, tècniques de regulació de la circulació, transports, estudi de documents i investigació de sinistres viaris.',
    icona: 'Car',
    unitatsFormatives: [
      {
        id: 'uf-4-1',
        code: 'UF 4.1',
        titol: 'Normativa de trànsit i la seva aplicació',
        descripcio: 'Llei de Trànsit, Circulació de Vehicles a Motor i Seguretat Vial (RDL 6/2015), Reglament General de Circulació i quadre de sancions.',
        duradaHores: 26,
        pdfNom: 'Temari_Modul4_UF4.1_Normativa_Transit.pdf',
        pdfPagines: 130,
        pdfDataPublicacio: '19/11/2025',
        resumPuntsClau: [
          'LLEI DE TRÀNSIT (RDL 6/2015): Sancions lleus (fins a 100€), greus (200€) i molt greus (500€ o més). Permís per punts.',
          'Proves d\'Alcoholèmia i Drogues: Taxa general d\'alcohol en sang (0,5 g/l) i en aire expirat (0,25 mg/l). Novells i professionals (0,3 g/l sang / 0,15 mg/l aire).',
          'Delictes contra la Seguretat Vial (Arts. 379-385 CP): Conducció sota efectes de drogues/alcohol (>0,60 mg/l aire), velocitat excessiva (>60 km/h urbà / >80 km/h interurbà) i conducció temerària.'
        ],
        pdfTextContingut: `Temari Oficial de Seguretat Pública
Curs de formació bàsica per a policies 2026-2027
Mòdul 4. Policia de trànsit - UF 4.1 Normativa de trànsit (26 hores)

TEMA 1. MARC LEGAL DE LA SEGURETAT VIAL
Anàlisi de la Llei de Trànsit i el Codi Penal en matèria de delictes contra la seguretat del trànsit. Taxa d'alcoholèmia penal (art. 379.2 CP): superior a 0,60 mg/l en aire expirat.`,
        preguntesExamenPredefinides: [
          {
            id: 'q-4-1-1',
            pregunta: 'A partir de quina taxa d\'alcohol en aire expirat una conducció es considera automàticament DELICTE penal segons l\'article 379.2 del Codi Penal?',
            opcions: [
              'A) 0,25 mg/l',
              'B) 0,50 mg/l',
              'C) 0,60 mg/l',
              'D) 1,00 mg/l'
            ],
            respostaCorrecta: 2,
            explicacio: 'L\'article 379.2 del Codi Penal tipifica com a delicte la conducció amb una taxa d\'alcohol en aire expirat superior a 0,60 mg/l.',
            referenciaOficial: 'UF 4.1 Tema 2, Pàg. 40'
          }
        ]
      },
      {
        id: 'uf-4-2',
        code: 'UF 4.2',
        titol: 'Tècniques de regulació, transports i estudi de documents',
        descripcio: 'Senyals dels agents de trànsit, verificació de permisos de conduir, targetes ITV, Assegurança Obligatòria i transport de mercaderies perilloses (ADR).',
        duradaHores: 16,
        pdfNom: 'Temari_Modul4_UF4.2_Regulacio_i_Documents.pdf',
        pdfPagines: 90,
        pdfDataPublicacio: '19/11/2025',
        resumPuntsClau: [
          'Prioritat de Senyals: 1) Senyals i ordres dels agents de trànsit; 2) Senyalització de circumstància/obra; 3) Semàfors; 4) Senyals verticals; 5) Senyals horitzontals.',
          'Detecció de Falsedat Documental: Verificació del permís de conduir (model europeu), permís de circulació i targeta d\'ITV.'
        ],
        pdfTextContingut: `Temari Oficial de Seguretat Pública
Curs de formació bàsica per a policies 2026-2027
Mòdul 4. UF 4.2 Regulació i estudis de documents (16 hores)`,
        preguntesExamenPredefinides: [
          {
            id: 'q-4-2-1',
            pregunta: 'Quin és l\'ordre de prioritat correcte entre els diferents tipus de senyals de trànsit?',
            opcions: [
              'A) Semàfors > Senyals verticals > Senyals dels agents > Senyals horitzontals',
              'B) Senyals dels agents > Senyals de circumstància/obra > Semàfors > Senyals verticals > Senyals horitzontals',
              'C) Senyals verticals > Semàfors > Senyals dels agents',
              'D) Senyals horitzontals > Semàfors > Senyals dels agents'
            ],
            respostaCorrecta: 1,
            explicacio: 'Les senyals i ordres dels agents de trànsit prevalen sobre totes les altres senyals de la via.',
            referenciaOficial: 'UF 4.2 Tema 1, Pàg. 15'
          }
        ]
      },
      {
        id: 'uf-4-3',
        code: 'UF 4.3',
        titol: 'Investigació de sinistres viaris',
        descripcio: 'Avaluació de l\'escena de l\'accident, croquis, càlcul de velocitat per petjades de frenada, atestats d\'accidents i presa de declaració.',
        duradaHores: 25,
        pdfNom: 'Temari_Modul4_UF4.3_Investigacio_Sinistres_Viaris.pdf',
        pdfPagines: 105,
        pdfDataPublicacio: '19/11/2025',
        resumPuntsClau: [
          'Fases del Sinistre Viari: Fase de percepció, fase de decisió i fase de conflicte (punt de col·lisió).',
          'Recollida de Proves: Mesurament de petjades de frenada, derrapatge o arrossegament, fotos de la posició final dels vehicles.'
        ],
        pdfTextContingut: `Temari Oficial de Seguretat Pública
Curs de formació bàsica per a policies 2026-2027
Mòdul 4. UF 4.3 Investigació de sinistres viaris (25 hores)`,
        preguntesExamenPredefinides: [
          {
            id: 'q-4-3-1',
            pregunta: 'Quina és la primera actuació que ha de dur a terme una patrulla en arribar al lloc d\'un accident de trànsit greu?',
            opcions: [
              'A) Presa de declaració als testimonis binoculars',
              'B) Protegir i senyalitzar immediatament la zona per evitar nous accidents (triangle PAS: Protegir, Avisar, Socórrer)',
              'C) Retirar els vehicles per obrir el trànsit sense prendre fotos',
              'D) Interrogar els conductors implicats'
            ],
            respostaCorrecta: 1,
            explicacio: 'La seguretat de l\'escena (Protegir) és la màxima prioritat en la intervenció inicial en sinistres viaris.',
            referenciaOficial: 'UF 4.3 Tema 1, Pàg. 12'
          }
        ]
      }
    ]
  },

  {
    id: 'modul-5',
    numero: 5,
    code: 'Mòdul 5',
    titol: 'Policia judicial i d\'investigació',
    descripcio: 'Dret penal i processal, investigació criminal, inspecció ocular, preservació de la lloc dels fets i cibercrim.',
    icona: 'Search',
    unitatsFormatives: [
      {
        id: 'uf-5-1',
        code: 'UF 5.1',
        titol: 'Dret penal i processal',
        descripcio: 'Codi Penal (LO 10/1995), teories de la pena, tipus delictius (homicidi, lesions, patrimoni, llibertat sexual) i Llei d\'Enjudiciament Criminal.',
        duradaHores: 75,
        pdfNom: 'Temari_Modul5_UF5.1_Dret_Penal_Processal.pdf',
        pdfPagines: 220,
        pdfDataPublicacio: '19/11/2025',
        resumPuntsClau: [
          'L\'Estructura del Delicte: Acció u omissió típica, antijurídica, culpable i punible. Detecció de dol i imprudència (Art. 10 i 12 CP).',
          'Delictes contra el Patrimoni: Robatori amb força en les coses (Art. 238 CP), Robatori amb violència o intimidació (Art. 242 CP) i Furt (Art. 234 CP - límit dels 400€).',
          'Procediment d\'Habeas Corpus (LO 6/1984): Garantia constitucional (Art. 17.4 CE) per posar immediatament a disposició judicial qui es consideri detingut il·legalment.'
        ],
        pdfTextContingut: `Temari Oficial de Seguretat Pública
Curs de formació bàsica per a policies 2026-2027
Mòdul 5. Policia judicial - UF 5.1 Dret penal i processal (75 hores)

TEMA 1. CONCEPTE I ELEMENTS DEL DELICTE
Són delictes les accions i omissions doloses o imprudents punibles per la llei.
Diferència entre Furt (substracció sense violència ni força) i Robatori. El límit econòmic de la falta/delicte lleu de furt és de 400 euros.
El procediment d'Habeas Corpus permet qualsevol detingut sol·licitar ser portat davant el Jutge de Guàrdia.`,
        preguntesExamenPredefinides: [
          {
            id: 'q-5-1-1',
            pregunta: 'Quin criteri econòmic marca la diferència entre un delicte lleu de furt i un delicte menys greu de furt segons l\'article 234 del Codi Penal?',
            opcions: [
              'A) 100 euros',
              'B) 400 euros',
              'C) 1.000 euros',
              'D) 3.000 euros'
            ],
            respostaCorrecta: 1,
            explicacio: 'La substracció de béns per un valor inferior a 400€ constitueix delicte lleu de furt, excepte si concorren agreujants especials.',
            referenciaOficial: 'UF 5.1 Tema 4, Pàg. 110'
          }
        ]
      },
      {
        id: 'uf-5-2',
        code: 'UF 5.2',
        titol: 'Investigació criminal',
        descripcio: 'Tècniques d\'inspecció ocular tècnic-policial (IOTP), cadena de custòdia de proves, dactiloscòpia, traces biològiques i atestat policial.',
        duradaHores: 20,
        pdfNom: 'Temari_Modul5_UF5.2_Investigacio_Criminal.pdf',
        pdfPagines: 95,
        pdfDataPublicacio: '19/11/2025',
        resumPuntsClau: [
          'Preservació de l\'Escena del Crim: Acordionament i congelació del lloc dels fets per evitar la contaminació de proves.',
          'Cadena de Custòdia: Registre ininterromput de qui recull, embala, trasllada i analitza cada prova científica (Lofoscòpia, ADN, balística).'
        ],
        pdfTextContingut: `Temari Oficial de Seguretat Pública
Curs de formació bàsica per a policies 2026-2027
Mòdul 5. UF 5.2 Investigació criminal (20 hores)`,
        preguntesExamenPredefinides: [
          {
            id: 'q-5-2-1',
            pregunta: 'Què s\'entén per "cadena de custòdia" en el context de la investigació criminal i la policia científica?',
            opcions: [
              'A) L\'ordre de torns dels custodis de la comissaria',
              'B) El procediment rigorós que garanteix la identificació, inalterabilitat i traçabilitat de les evidències recollides a l\'escena',
              'C) La seqüència de preguntes en un interrogatori',
              'D) La llista d\'escorcolls realitzats en un dispositiu'
            ],
            respostaCorrecta: 1,
            explicacio: 'La cadena de custòdia garanteix davant del jutge que la prova presentada és exactament la mateixa que es va recollir i no ha estat manipulada.',
            referenciaOficial: 'UF 5.2 Tema 2, Pàg. 35'
          }
        ]
      },
      {
        id: 'uf-5-3',
        code: 'UF 5.3',
        titol: 'Cibercrim',
        descripcio: 'Tipologies de ciberdelictes (estafes online, phishing, ransomware, grooming, ciberassetjament), evidència digital i investigació en xarxa.',
        duradaHores: 13,
        pdfNom: 'Temari_Modul5_UF5.3_Cibercrim.pdf',
        pdfPagines: 70,
        pdfDataPublicacio: '19/11/2025',
        resumPuntsClau: [
          'Enginyeria Social i Estafes: Phishing, smishing, vishing i estafa del CEO.',
          'Preservació d\'Evidències Digitals: Captura de metadades, adreces IP, hash de fitxers i sol·licitud judicial de dades de connexió.'
        ],
        pdfTextContingut: `Temari Oficial de Seguretat Pública
Curs de formació bàsica per a policies 2026-2027
Mòdul 5. UF 5.3 Cibercrim (13 hores)`,
        preguntesExamenPredefinides: [
          {
            id: 'q-5-3-1',
            pregunta: 'Com s\'anomena la tècnica d\'enginyeria social en la qual l\'atacant suplanta la identitat d\'una entitat bancària mitjançant correus electrònics fraudulents per obtenir claus privades?',
            opcions: [
              'A) Spoofing d\'IP',
              'B) Phishing',
              'C) Ransomware',
              'D) Defacement'
            ],
            respostaCorrecta: 1,
            explicacio: 'El Phishing és la modalitat de cibercrim basada en la suplantació de la imatge corporativa d\'entitats de confiança.',
            referenciaOficial: 'UF 5.3 Tema 1, Pàg. 14'
          }
        ]
      }
    ]
  },

  {
    id: 'modul-6',
    numero: 6,
    code: 'Mòdul 6',
    titol: 'Policia administrativa',
    descripcio: 'Dret administratiu, procediment sancionador, inspecció d\'establiments públics, espectacles, jocs, venda ambulant i medi ambient.',
    icona: 'Scale',
    unitatsFormatives: [
      {
        id: 'uf-6-1',
        code: 'UF 6.1',
        titol: 'Dret administratiu',
        descripcio: 'Llei 39/2015 del Procediment Administratiu Comú, Llei 40/2015 de Règim Jurídic, actes administratius, presumpció de veracitat i sancions.',
        duradaHores: 25,
        pdfNom: 'Temari_Modul6_UF6.1_Dret_Administratiu.pdf',
        pdfPagines: 100,
        pdfDataPublicacio: '19/11/2025',
        resumPuntsClau: [
          'Presumpció de Veracitat de les Actes Policials (Art. 77.5 Llei 39/2015): Les declaracions dels agents gaudeixen de valor provatori excepte prova en contrari.',
          'Principis de la Potestat Sancionadora: Legalitat, irretroactivitat, tipicitat, responsabilitat, proporcionalitat i non bis in idem.'
        ],
        pdfTextContingut: `Temari Oficial de Seguretat Pública
Curs de formació bàsica per a policies 2026-2027
Mòdul 6. Policia administrativa - UF 6.1 Dret administratiu (25 hores)`,
        preguntesExamenPredefinides: [
          {
            id: 'q-6-1-1',
            pregunta: 'Quin valor provatori tenen les denúncies o actes formulades pels agents de l\'autoritat sobre fets constatats directament per ells?',
            opcions: [
              'A) No tenen cap valor si no hi ha testimonis civils',
              'B) Valor de presumpció de veracitat, excepte prova en contrari',
              'C) Valor de sentència ferma immediata',
              'D) Únicament valor d\'opinió no vinculant'
            ],
            respostaCorrecta: 1,
            explicacio: 'L\'article 77.5 de la Llei 39/2015 reconeix el valor provatori i la presumpció de veracitat als fets formalitzats per agents de l\'autoritat.',
            referenciaOficial: 'UF 6.1 Tema 2, Pàg. 30'
          }
        ]
      },
      {
        id: 'uf-6-2',
        code: 'UF 6.2',
        titol: 'Actuacions de policia administrativa',
        descripcio: 'Llei 11/2009 d\'Espectacles Públics i Activitats Recreatives de Catalunya, horaris de tancament, protecció de menors, alcohol i consum en via pública.',
        duradaHores: 30,
        pdfNom: 'Temari_Modul6_UF6.2_Actuacions_Policia_Administrativa.pdf',
        pdfPagines: 110,
        pdfDataPublicacio: '19/11/2025',
        resumPuntsClau: [
          'Inspecció d\'Establiments (Llei 11/2009): Control d\'aforament, vies d\'evacuació, llicències d\'activitat i presència de menors en locals no autoritzats.',
          'Ordenances Municipals de Convivència: Sancions per consum d\'alcohol a la via pública (botelló) i sorolls comunitaris.'
        ],
        pdfTextContingut: `Temari Oficial de Seguretat Pública
Curs de formació bàsica per a policies 2026-2027
Mòdul 6. UF 6.2 Actuacions de policia administrativa (30 hores)`,
        preguntesExamenPredefinides: [
          {
            id: 'q-6-2-1',
            pregunta: 'Segons la Llei 11/2009 d\'Espectacles Públics de Catalunya, quina infracció comet un local d\'oci nocturn que supera l\'aforament màxim permès posant en risc la seguretat dels assistents?',
            opcions: [
              'A) Infracció lleu',
              'B) Infracció greu o molt greu segons l\'abast del risc generat',
              'C) No és cap infracció si tenen la llicència en regla',
              'D) Falta exclusiva de trànsit'
            ],
            respostaCorrecta: 1,
            explicacio: 'L\'excés d\'aforament que posi en perill la seguretat de les persones està qualificat com a infracció greu o molt greu.',
            referenciaOficial: 'UF 6.2 Tema 2, Pàg. 48'
          }
        ]
      },
      {
        id: 'uf-6-3',
        code: 'UF 6.3',
        titol: 'Medi ambient',
        descripcio: 'Protecció de la fauna, flora, gestió de residus, abocaments il·legals, acústica i normativa del Medi Natural (URMA / Agents Rurals / CME).',
        duradaHores: 15,
        pdfNom: 'Temari_Modul6_UF6.3_Medi_Ambient.pdf',
        pdfPagines: 80,
        pdfDataPublicacio: '19/11/2025',
        resumPuntsClau: [
          'Delictes contra el Medi Ambient (Arts. 325-337 CP): Abocaments contaminants, incendis forestals, caça i pesca d\'espècies protegides.',
          'Unitat de Medi Ambient (URMA): Policia especialitzada en la vigilància del patrimoni natural de Catalunya.'
        ],
        pdfTextContingut: `Temari Oficial de Seguretat Pública
Curs de formació bàsica per a policies 2026-2027
Mòdul 6. UF 6.3 Medi ambient (15 hores)`,
        preguntesExamenPredefinides: [
          {
            id: 'q-6-3-1',
            pregunta: 'Quin tipus de conducta constitutiva d\'atemptat contra la natura pot ser perseguida per la via penal segons l\'article 325 del Codi Penal?',
            opcions: [
              'A) Fer un pícnic en una zona habilitada',
              'B) Provocar directament o indirectament abocaments o emissions contaminants que posin en seriós perill l\'equilibri dels sistemes naturals',
              'C) Recollir fulles seques del terra al bosc',
              'D) Caminar fora dels camins marcats en un parc urbà'
            ],
            respostaCorrecta: 1,
            explicacio: 'L\'art. 325 CP penalitza les emissions, abocaments o dejeccions que causin un risc greu a l\'aigua, terra, aire o biodiversitat.',
            referenciaOficial: 'UF 6.3 Tema 1, Pàg. 16'
          }
        ]
      }
    ]
  },

  {
    id: 'modul-7',
    numero: 7,
    code: 'Mòdul 7',
    titol: 'Formació transversal',
    descripcio: 'Desenvolupament de competències policials, comunicació en llengua catalana, comunicació en anglès, atenció sanitària immediata i ciberseguretat.',
    icona: 'FileText',
    unitatsFormatives: [
      {
        id: 'uf-7-1',
        code: 'UF 7.1',
        titol: 'Integració i desenvolupament de les competències policials',
        descripcio: 'Treball en equip, autocontrol emocional, resolució de problemes sota pressió, adaptabilitat i lideratge operatiu.',
        duradaHores: 130,
        pdfNom: 'Temari_Modul7_UF7.1_Competencies_Policials.pdf',
        pdfPagines: 160,
        pdfDataPublicacio: '19/11/2025',
        resumPuntsClau: [
          'Competències Clau del Policia de la PG-ME: Orientació al servei públic, autocontrol, treball en equip, comunicació efectiva i pensament crític.',
          'Gestió de l\'Estrès Operatiu: Tècniques de control de la freqüència cardíaca, debrífing psicològic i salut mental.'
        ],
        pdfTextContingut: `Temari Oficial de Seguretat Pública
Curs de formació bàsica per a policies 2026-2027
Mòdul 7. Formació transversal - UF 7.1 Competències policials (130 hores)`,
        preguntesExamenPredefinides: [
          {
            id: 'q-7-1-1',
            pregunta: 'Quina competència transversal és indispensable per mantenir la calma i la presa de decisions racionals en situacions d\'alt risc i violència?',
            opcions: [
              'A) Impulsivitat reactiva',
              'B) Autocontrol i gestió emocional sota pressió',
              'C) Rigidesa en la planificació',
              'D) Individualisme operatiu'
            ],
            respostaCorrecta: 1,
            explicacio: 'L\'autocontrol i la regulació de l\'estrès permeten aplicar la llei de manera proporcional i justa sense actuar per ràbia o por.',
            referenciaOficial: 'UF 7.1 Tema 1, Pàg. 22'
          }
        ]
      },
      {
        id: 'uf-7-2',
        code: 'UF 7.2',
        titol: 'Comunicació policial en llengua catalana',
        descripcio: 'Redacció d\'atestats, minutes policials, informes administratius, llenguatge administratiu i atenció oral formal en català.',
        duradaHores: 50,
        pdfNom: 'Temari_Modul7_UF7.2_Comunicacio_Catalana.pdf',
        pdfPagines: 90,
        pdfDataPublicacio: '19/11/2025',
        resumPuntsClau: [
          'Redacció de la Minute Policial: Claredat, concisió, dades objectives (data, hora, lloc, agents, manifestacions), absència de valoracions subjectives.',
          'Llenguatge Administratiu Policial: Ús del català com a llengua vehicular en l\'Administració de la Generalitat de Catalunya.'
        ],
        pdfTextContingut: `Temari Oficial de Seguretat Pública
Curs de formació bàsica per a policies 2026-2027
Mòdul 7. UF 7.2 Comunicació en llengua catalana (50 hores)`,
        preguntesExamenPredefinides: [
          {
            id: 'q-7-2-1',
            pregunta: 'Quin requisit fonamental de contingut ha de complir una minuta o atestat policial redactat per un agent?',
            opcions: [
              'A) Incloure la opinió personal de l\'agent sobre el caràcter del sospitós',
              'B) Exposar els fets observats de forma estrictament objectiva, clara, chronològica i precisa',
              'C) Utilitzar un llenguatge poètic i elaborat',
              'D) Ometre l\'hora exacta de la intervenció'
            ],
            respostaCorrecta: 1,
            explicacio: 'Els documents policials i judicials requereixen la màxima claredat, rigor factual i objectivitat.',
            referenciaOficial: 'UF 7.2 Tema 2, Pàg. 30'
          }
        ]
      },
      {
        id: 'uf-7-3',
        code: 'UF 7.3',
        titol: 'Comunicació policial en llengua anglesa',
        descripcio: 'Vocabulari policial en anglès, atenció a turistes, atenció de trucades d\'emergència en anglès i formulació de preguntes d\'identificació.',
        duradaHores: 40,
        pdfNom: 'Temari_Modul7_UF7.3_Comunicacio_Anglesa.pdf',
        pdfPagines: 85,
        pdfDataPublicacio: '19/11/2025',
        resumPuntsClau: [
          'English for Police Officers: Key phrases for identification ("May I see your ID/Passport?"), directions, victim assistance and reporting crimes.',
          'Emergency Calls Handling: Communication protocols with English-speaking citizens.'
        ],
        pdfTextContingut: `Temari Oficial de Seguretat Pública
Curs de formació bàsica per a policies 2026-2027
Mòdul 7. UF 7.3 Comunicació en llengua anglesa (40 hores)`,
        preguntesExamenPredefinides: [
          {
            id: 'q-7-3-1',
            pregunta: 'Com demanaries educadament la identificació oficial a un ciutadà estranger en llengua anglesa?',
            opcions: [
              'A) "Give me your papers now!"',
              'B) "Could you please show me your ID card or passport?"',
              'C) "Where are you running to?"',
              'D) "Show me your money"'
            ],
            respostaCorrecta: 1,
            explicacio: 'La formulació respectuosa de l\'atenció policial en anglès utilitza estructures com "Could you please show me...".',
            referenciaOficial: 'UF 7.3 Tema 1, Pàg. 15'
          }
        ]
      },
      {
        id: 'uf-7-4',
        code: 'UF 7.4',
        titol: 'Atenció sanitària immediata (**)',
        descripcio: 'Suport Vital Bàsic (SVB), Ús del Desfibril·lador Extern Automatitzat (DEA), control d\'hemorràgies massives (torniquet) i posicionament de ferits.',
        duradaHores: 30,
        pdfNom: 'Temari_Modul7_UF7.4_Atencio_Sanitaria_Immediata.pdf',
        pdfPagines: 95,
        pdfDataPublicacio: '19/11/2025',
        resumPuntsClau: [
          'Protocol de Reanimació Cardiopulmonar (RCP): 30 compressions toràciques per 2 insuflacions (freqüència 100-120 per minut).',
          'Ús del DEA: Encendre el DEA, col·locar els elèctrodes, seguir les instruccions de veu i no tocar el pacient durant l\'anàlisi/descàrrega.',
          'Control d\'Hemorrhagies Exsanguinants: Aplicació de torniquet arterial homologat a 5-7 cm per sobre de la ferida sangrant en extremitats.'
        ],
        pdfTextContingut: `Temari Oficial de Seguretat Pública
Curs de formació bàsica per a policies 2026-2027
Mòdul 7. UF 7.4 Atenció sanitària immediata (30 hores)`,
        preguntesExamenPredefinides: [
          {
            id: 'q-7-4-1',
            pregunta: 'Quina és la seqüència i relació de compressions/insuflacions recomanada en la RCP bàsica per a un adult en aturada cardiorespiratòria?',
            opcions: [
              'A) 15 compressions i 5 insuflacions',
              'B) 30 compressions i 2 insuflacions',
              'C) 50 compressions i 1 insuflació',
              'D) Només insuflacions sense compressions'
            ],
            respostaCorrecta: 1,
            explicacio: 'El protocol internacional de Suport Vital Bàsic fixa la ràtio en 30 compressions per 2 ventilacions.',
            referenciaOficial: 'UF 7.4 Tema 1, Pàg. 18'
          }
        ]
      },
      {
        id: 'uf-7-5',
        code: 'UF 7.5',
        titol: 'Ciberseguretat',
        descripcio: 'Seguretat de la informació en sistemes policials, protecció de dades de caràcter personal (LOPDGDD 3/2018), ús de contrasenyes i xifratge.',
        duradaHores: 12,
        pdfNom: 'Temari_Modul7_UF7.5_Ciberseguretat.pdf',
        pdfPagines: 60,
        pdfDataPublicacio: '19/11/2025',
        resumPuntsClau: [
          'Protecció de Dades Policials: Accés exclusiu a bases de dades (SIP) per motius de feina justificats. La consulta no autoritzada és delicte de revelació de secrets (Art. 197 CP).',
          'Higiene Digital: Autenticació multifactor (MFA), no compartir les credencials corporatives i tancament de sessió al terminal de la comissaria.'
        ],
        pdfTextContingut: `Temari Oficial de Seguretat Pública
Curs de formació bàsica per a policies 2026-2027
Mòdul 7. UF 7.5 Ciberseguretat (12 hores)`,
        preguntesExamenPredefinides: [
          {
            id: 'q-7-5-1',
            pregunta: 'Quin delicte del Codi Penal comet un agent que accedeix sense cap justificació professional a la base de dades policial per consultar informació privada d\'un veí?',
            opcions: [
              'A) Furt d\'ús',
              'B) Descobriment i revelació de secrets (Art. 197 CP)',
              'C) Falsedat documental',
              'D) Infracció lleu de trànsit'
            ],
            respostaCorrecta: 1,
            explicacio: 'L\'accés arbitrari i no justificat a fitxers reservats per part d\'un funcionari és constitutiu de delicte de revelació de secrets.',
            referenciaOficial: 'UF 7.5 Tema 2, Pàg. 25'
          }
        ]
      }
    ]
  }
];
