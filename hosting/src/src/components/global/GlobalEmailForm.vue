<template>
  <div class="email-section">
    <form class="email-section-form email-section-create-email" v-if="!$route.params.email" v-on:submit.prevent="openMessageList" :action="randomName">
      <input class="email-section-field email-section-input-email" v-model="randomName">
      <div   class="email-section-field email-section-input-suffix">{{_hosting.suffix}}</div>
      <button class="email-section-field email-section-submit-button" type="submit">Criar email</button>
    </form>

    <form class="email-section-form email-section-copy-email" v-if="$route.params.email" v-on:submit.prevent="copyEmail">
      <input class="email-section-field email-section-input-email" :value="$route.params.email + _hosting.suffix" readonly>
      <button class="email-section-field email-section-submit-button" type="submit">Copiar</button>
    </form>
  </div>
</template>

<script>
  import { mapState } from 'vuex';

  export default {
    name: 'GlobalEmailForm',
    computed: mapState([ 'current_page', '_hosting' ]),
    data () {
      return {
        randomName: '',
      }
    },
    mounted () {
      this.randomName = this.generateRandomName().toString();
    },
    methods: {
      copyEmail (action) {
        action.srcElement.querySelector('.email-section-input-email').select();
        document.execCommand('copy');
      },
      openMessageList() {
        this.$router.push( this.randomName );
      },
      generateRandomName () {
        let names = {
          female: ["sophia","alice","julia","isabella","manuela","laura","luiza","valentina","giovanna","maria eduarda","helena","beatriz","maria luiza","lara","mariana","nicole","rafaela","heloísa","isadora","lívia","maria clara","ana clara","lorena","gabriela","yasmin","isabelly","sarah","ana julia","letícia","ana luiza","melissa","marina","clara","cecília","esther","emanuelly","rebeca","ana beatriz","lavínia","vitória","bianca","catarina","larissa","maria fernanda","fernanda","amanda","alícia","carolina","agatha","gabrielly","alice","sofia","beatriz","lara","laura","júlia","luisa","alícia","ágata","valentina","yasmin","bianca","manuela","gabriela","clara","ana","melissa","isadora","lívia","helena","cecília","heloísa","eduarda","nicole","larissa","bárbara","leticia","maria","rafaela","lorena","vitória","mariana","laís","bruna","brenda","camila","sara","isis","emanuelle","carolina","giovana","amanda","rebeca","elisa","ester","luana","aline","laila","fernanda","maísa","isabel","alana","lis","emanuela","micaela","maitê","juliana","marina","jade","pietra","íris","paloma","catarina","karen","iara","anita","sabrina","daniela","olívia","anabela","débora","estela","natália","ariela","ingrid","aurora","diana","milene","clarisse","jessica","kelly","raquel","clarissa","pamela","taís","lia","abigail","yasmine","carol","talita","priscila","érica","joana","yara","patrícia","marcela","isa","ariana","cloe","eva"],
          surname: ["albuquerque","alencar","almeida","alves","amaral","andrade","reis","aragão","araújo","barbosa","barcellos","barreto","barros","batista","bernardes","boaventura","caldeira","camargo","campos","cardoso","carvalho","castro","cavalcante","cavalcanti","chaves","costa","da conceição","da costa","da cruz","da cunha","da luz","da mata","da mota","da paz","da rocha","da rosa","das neves","dias","duarte","farias","fernandes","ferrari","ferreira","figueira","fogaça","freitas","frias","frota","galisteu","garcia","gomes","gonçalves","guimarães","jesus","junqueira","lacerda","lessa","leão","lima","lopes","maia","marques","martinez","martins","medeiros","mello","melo","mendes","menezes","menezzes","mesquita","monteiro","moraes","morais","moreira","moura","muniz","nascimento","neves","nogueira","novaes","nunes","oliveira","paes","paiva","paris","peixoto","pereira","pilar","pinheiro","pinto","pires","porto","queiroz","ramos","rezende","ribeiro","rocha","rodrigues","sales","sampaio","santana","santos","silva","silveira","soares","souza","teixeira","vasconcelos","viana","vieira","xavier","abreu","altoé","ambrozina","amorim","arrivabene","azevedo","abaine","abaurre","abbud","abecassis","aboudib","abraão","acátolli","aggrizzi","agrisi","agrizi","neto","agrizzi","aiette","aiette malo","airoso","akechi","alázia","alba","albani","alberico","albernaz","alberto","albino","alcantra","alenquer","alexandre","alexandreli","alfarenga","altoe","alvarenga","álvares","alvernaz","alvez","amato","ambrosio","ambrozim","ambrozin","amélia","amim","anchesqui","andersdatter","andersen","andreão","andreasdatter","andrião","angelo","anna","antonia","antoniazzi","antônio","antunes","apolinário","apolonio","apple","appolinario","arduíni","armellin","arpini","arruda","assis","assú","assumpção","assunção","augusto","augustsdatter","augustsen","avelar","aveleda","barnett","bellè","bellon","bernabé","betini","brito","butler","b","baceti","bachetti","badaró","baiense","balança","balarini","baldo","baldotto","balestre","baliana","ballarini","bandeira","baptista","baquete","barazzuol","barbato","barboza","barcelos","barnabe","baro","barone","barrazuol","barrazzuol","barreira","barroso","basei","basoni","bassan","bassani","bassetti","basso","bassos","bassul","bastianelli","bastos","battaglia","battagnoli","battistela","battistella","battisti","bazoni","bedard","bedore","belcavello","belinato","bellini","belmock","beltrame","beltran","benedetti","benevenutte","benevides","benica","beraldo","berard lepine","berg","bergami","berger","bernadini","bernadot","bernardi","bernardini","bernardo","berthelsen","bertolosso","bertone","bertonsin","berude","bet","betine","bettin","bezerra","bianche","bianco","biazate","bicalho","bicudo","bindaco","binelle","binelle de pietro","bissoli","bistafa","bitelli","bitencourt","bjerke","blanco","boarin","boge","boiago","boizam","boldrin","boldrine","boldrini","bolzan","bonadiman","bonfim","boni","bonicenha","bonilha","bonot","bordin","borges","borghi","borsoi","bortolini","bortolot","bortoloth","bortoloti","bortolotti","bosio","bossoli","botacim","botacin","botelho","bottega","botteon","botti","bourguignon","bozi","bozzi","bozzoli","braceschi","braga","bragagnolo","bragato","bragatto","braggion","braido","brancaglioni","branch","branco","brandão","bravato","bravim","bravin","breda","bregesk","bregolin","breves","brezininiski","breziniscki","brezinski","brianezi","brino","brioschi","briosqui","brisot","brodeur","broedel","brogan","brum","brumana","bruneli","brunelli","bruno","bruschi","brusco","brush","brusque","bueno","buffo","bullock","buoro","burgues","burrows","busato","busetti","buson","buzatto","buzon","calmon","casaro","caversani","chausse","constâncio","corrêa","correia","cabral","caetano","calabrez","calabreza","calassara","calatrone","calazans","caldo","calegari","calegario","caliari","califfe","calil","calimam","caliman","calixto","calliman","calotto","calvi","camara","camata","camatta","cambiage","camilete","camiletti","camillete","campagnaro","camporês","camporez","canal","canata","netto","canceglieri","cancian","candido","cansi","cansian","cansio","canzian","capelini","caprini","capucho","caputo","carazas","cardosa","cardozo","careta","caretta","caridade","carlesso","carminate","carminati","carmo","carneiro","carniele","carnielle","carnielli","carrasco","carrer","carriço","carvalhido","casagrande","cassaro","cassini","castelione","casteluber","catabriga","catellan","cattai","cattelan","cavaleiro","cavallina","cavanelas","cavatti","ceccon","cecote","cecotti","cei","celot","ceolin","ceotto","cergueira","cerqueira","cervantes","cescon","cesconeto","cesconetto","cevolani","chagas","chapiniti","cheibub","chiaradia","chiecan","chiecon","chies","chiesurin","christ","christensdatter","christensen","christiandatter","christiansdatter","christiansen","christophersen","chtistensdatter","cipriano","cittera","claudino","cobo","cocco","coco","coelha","coelho","côgo","cola","coladeci","colato","colli","colodeta","colodete","colodetti","colombi","comarela","comerio","conceicao","conciani","conde","congo","contarato","contarini","conte","conterini","conti","coppo","corcos","corocher","corradi","correya","corte","cosme","costa longa","costa longo","costalonga","costariol","cota","coutinho","covre","cozumeco","cravellar","cremasco","cressafe","cricco","crozatti","cruz","cuman","cunha","cunshnir","curcio","curitiba","custódio","cypriano","cyrillo","da fraga","da silva","de albergaria","de avila","de candia","de figueiredo","de gois","de jesus","de moraes","de oliveira","de são thomé","delpupo","dos santos","d'agostini","d'agostino","d'altoè","da camara","da conceicao","da dalt","da gama","da gloria","da pacciani","da silveira","dadalto","dal bo","dal fior","dal piaz","dalcin","dall'armellina","dall'ava","dalla","dalla betta berta","dalla marta","dalto","daltro","dalvi","dan","dancy","dansi","dantas","danzi","dardengo","dariva","daroz","darroz","dassié","davel","david","de araújo","de matos","de abreu","de agnoi","de agnoi de angeli","de aguiar","de albernas","de albernaz","de almada","de almeida","de almeyda","de alvarenga","de andrade","de andrades","de angeli","de angeli neto","de arajuo","de assis","de ayrosa","de azebedo","de azedias","de azeredo","de azevedo","de barcellos","de barros","de biasi","de brito","de carvalho","de castro","de chaves","de conto","de deus","de faria","de farias","de freitas","de godoy","de góes","de gouvea","de jeus","de kardin","de lemos","de lima","de magalhães","de marchi","de martin","de martins","de mattos","de mello","de melo","de mendonça","de mori","de moura","de nadai","de nardi","de olivença","de oliveria","de oliviera","de osti","de paiva","de palma","de paoli","de paula","de pierro","de poli","de queirós","de queiroz","de sa","de siqueira","de sousa","de souza","de stefani","de vargas","de vasconcelos","de vecchi","de zan","debona","del puppo","delai","delaparte","delarmelina","delazare","dell'antonia","della coletta","della libera","dellaparte","delli","demartins","demoni","denadai","deprá","deschievane","dessaure","destéfani","di balliana","di barrel","di boscarato","di girolamo","diirr","dinis","do sacramento","do amparo","do bom sucesso","do bonfim","do carmo","do couto","do espírito santo","do lago","do prado","do rosário","doimo","dolôres","domene","domingues","domo","donadira","donald","donati","donato","dorigo","dorzenoni","dos reis","du pin","duar","duque","durfee","dutra","esteves","e almeida","ebani","eça","eckhardt","eller","emeli","endringer","entringer","erbolato","ervati","esméria","especemile","espíndula","espinosa","espírito santo","esposito","evarti","falqueto","filete","fisch","fittipaldi","fonseca","francisca","fabis","fabre","fabro","faccini","faccitin","fachini","faco","facundes","fae","fagundes","falchetto","falquetto","falsoni","farace","fardim","fardin","faria","faroni","fasoli","fassarella","fávero","favoreto","fazoli","fazollo","fazôlo","feitoza","felete","feletti","ferlin","fernandez","ferraco","ferrão","ferrarese","ferreira braga","ferrighetto","feu","fidelis","fileti","filetti","fillinger","fim","fioravante","fioresi","fiorez","fiorim","fiorini","fiório","fiorot","fiorotto","firese","firme","fitipaldi","flora","florêncio","flozillo","foffi","fontana","fontes","forafo","formigoni","fornazier","frachin","frade","fraga","frais","francesca","franceschet","franceschetto","franchin","francischeto","francischetto","francisco","francisqueti","francisqueto","franco","frandsen","frattini","frazão","fregolent","freire","freyre","friezell","friezelle","friggi","frizi","frizzera","frizzo","frossar","fruett","fulaneti","fumaneri","fumanesi","fundão","furian","furlan","furtado","fusinato","fuzeti","giacomele","guerra","gabriel","gaburro","gago","gaigher","gaiguer","gaiotto","galavotti","galina","gardiman","gargan","gaspar","gasparello","gasparini","gasparotto","gato","gaucci","gava","gavina","gazola","george","geraldo","ghivan","giacomeli","giacomelli","giobini","giovannetti","giro","giuduce","giuriato","giuriatto","givelli","gobbato","gobbo","goese","gomes luis","gonçalvez","gonzalves","gottardo","graça","grand-pre","grando","granzottin","granzotto","grasseto","grassetto","grassi","greco","gregio","gregolin","grillo","grobério","grolla","guarnier","guedes","guerini","guerino","guidini","guidolini","guilherme","guisso","guizzardi","gularte","guldbrandsdatter","habib","handler","hansdatter","hansen","harper","hayes","henrichsdatter","henrichsen","henrique","henriques","herculano","herman","herzog","hoffman","hoffmann","holliday","horacio","hostey","hypólito","iki","intringer","isgária","ivie","ivonete","iwand","jacinto","jacoboski","jacobsen","jacome","jacomelle","jacomelli","jambo","jensdatter","jensen","joao","joaquina","joensdatter","johannesen","johansdatter","johansen","jonsson","jordão","jorge","jorgensen","josefa","julio","justi","juvanhol","kiefer","kiepper","kilpatrick","kirmse","kister","klein","knudsen","kolberg","kristensen","kristiansen","kuiger","lage","lans","laus","leite","la point","lachini","ladeira","lago","lagoeiro","laiberetor","lamha","landeira","lanes","langrin","lapa","larsdatter","larsen","laura","laurenco","laures","lay","leal","légora ","leitão","leme","lemos","lems","leonardes","leonel","leopoldo","lepine","lerner","libardi","liberator","liberatori","liduino","lingiardi","lino","lisboa","lizabo","longo","loredetto","lorenção","lorencini","lorençon","lorenzini","lorenzon","lorenzoni","loreto","lorezon","loss","lott","lougun","loureiro","loureito","lourença","lourenção","lourenço","lourneco","louzada","lovat","lovatel","lovatti","lozano","lubiana","luca","lucas","lucca","lucchetta","luchi","luciano","luis","luiz","lunz","lupino","luzorio","lyrio","machado","maifredi","manoel","marinho","marquioro","mascarelo","mergár","mortensen","macatrozzi","mace","macedo","maciel","madsdatter","madsen","madureira","mafra","magaldi","magalhães","magnago","magri","magro","mahtielo","maida","majeski","majeveski","malini","malta","malvezzi","mamoni","maneback","manfredo","manhães","mantoan","mantovali","marangon","maranguanhe","marcantonio","marcarini","marchese","marchiori","marchioro","marcon","maremiori","marett","maretto","maria","mariane","mariani","marim","marin","marinato","marini","mario","mariotto","mark","marochio","maróquio","maroto","marotto","marquette","marsal","martas","martha","martin","martinatti","martinsdatter","martinsen","martinussu","mascarello","mascarenhas","maset","massardi","massari","mastela","mastrantoni","masut","mateus","mathias","mathiasso","mathiello","mathiélo","mathisen","matiello","matielo","matioz","matos","matsuschita","mattar","mauro","mazoco","mazzoco","mazzon","mccune","meato","meger","meira","meirelles","mendonça","menegardo","meneghin","meneguete","meneses","mengale","merenciano","merigue","merotto","michelsen","mikkelsen","milanez","milaneze","milanezi","milena","miller","minatel","minet","minete","minette","minetti","miniguite","miniguiti","miquelin","miranda","mistura","mizzoni","modesto","modolo","moitinho","molinaroli","monente","monfardini","moniz","monstans","montanaro","montemor","montezano","morelo","moresco","morgan","mork","moro","morosini","mortensdatter","moschon","moscon","moser","mosquini","mosso","moulin","moura filho","mozer","muraro","muscareli","mutk","mørch","mørk","nicoli","nielsdatter","nacaratti","nagem","nakamurada","nalli","napoleão","nassar","nelson","nerg","néspoli","nicole","nicolini","nielsen","nielson","noronha","nosè","novais","novo","nucci","ockerman","ogura","oinhos","olausdatter","olausen","olerdatter","olimpio","oliveria","olsdatter","olsen","onhas","orechio","orelio","orletti","ormo","orsato","osthed","ostigui domingue","ostiguy domingue","ostitty","ostity domingue","possebon","pacheca","pacheco","pachequa","pagani","pagiola","pagot","pagoto","pagotto","paixão","pajot","palermo","palù","pancini","pancot","pandini","panhoca","pantaroto","paoliello","parent","parente","paresque","paresqui","pariz","partelli","pasca","pase","pasocco","passamani","passos","pasti","pastore","patricio","paulina","paulo","pauluccio","pavan","pazeto","pazetto","pazini","pedarccini","pedersdatter","pedersen","pedrazini","pedrosa","pedroza","pêgas","pegovaro","peira","penha","penido","penna","peppelenbos","perdigão","perdoná","peretti","pereyra","perez","perim","perin","periordi","perizin","perlatti","peroni","perota","perreira","perreyra","peruchi","pesca","pescador","pessali","pessanha","pessot","peterele","peterle","peterli","pezzin","piai","piaj","piana","pianassole","pianessola","pianessoli","pianessolil","pianezolla","pianezzola","pianissoli","piasentin","piassarolli","piassi","piazzarollo","piccin","pierri","pilati","pilato","pillon","pin","pino","piovezan","pissin","pitanga","pizetta","pizzeta","pizzol","plotegher","polesel","polez","poli","polinini","pollini","polloni","poloni","pontara","pontes","portilio","pozinni","praba","prado","prata","prates","prati","pravato","premero","premoli","preta","prieto garcia","provendel","puppim","quaresma","quartezani","quinelato","quirino","rasmusen","rasmussen","romanini","rabello","rabelo","ragazzi","ragazzo","rago","ramiro","rangel","raposo","rasmusdatter","rasmusen tyrne","rassato","rauta","razal","réboli","regiani","reinehr","renão","renzo","resolen","riatto","ribeira","ricarte","righetti","rigo","rigon","rigone","rigotto","riguetto","rio","rios","rissari","rissi","rivero","rizatto","rizenente","rizzato","rizzo","roberto","rochetti","rochite","rodriques","rogério","romanholi","romão","roncheti","ronqueti","roriz","rosa","rosalina","rosas","rossato","rossi","rossim","rossoni","roza","rozario","rubens","rúbia","rufino","rugero","rui","salles","selvatici","shoel","s","sa","sagers","saiter","sala","salgado","salomão","salome","salvador","salvago","sanavia","sancao","sandri","sandrini","sangali","sangalli","sansão","sanson","sant'anna","santa ana","santiago","santori","são pedro","sara","sarnaglia","sartori","sartório","sbetti","scalpelli","scanferla","scarabel","scaramussa","scaramuzza","scarcinelli","schael","scharra","schbert","schioter","schneider","schulthais","scoot","scott","scotte","scudeler","seccom","segrini","seguro","selva","seraco","serafim","serata","sesconeto","sgario","sgulmaro","shael","shibuya","shonio","siciliano","silotti","simoes","simon","simonato","sipolatti","siqueira","smith","soave","sobrinho","sodre","soella","solda'","soldan","somera","sossai","sossai detto pegorer","sousa","spadeto","sperandio","speranza","sperotto","spigolon","stebenne","steele","stefani","stein","stelzer","strabelli","stradiotto","stringuine","strozzi","suave","svendsdatter","sørensdatter","sørensen","teves","t","tagliaferro","targa","tassinari","taufner","tavares","taylor","tedesco","tedoldi","teganhe","teles","tessaro","tessinari","thiago","thirine","thomaz","tiborcio","toè","toledo","tolfano","tomasi","tomasine","tomasini","tomé","ton","tonet","toneto","tonin","tonoli","tonon","torres","tosi","toste","tostes","tovar","toze","tozi","tozzi","trabach","trancho","travaglia","trave","tres","trevisan","trindade","tripeno","tristão","trombini","tsuchiya","turbian","turra","uliana","ultramar","urbino","vaccari","vadagnin","valani","valdino","valiate","valiati","valiatti","valle","valoto","vanni","vantil","vanzan","varella","vargas","vasoler","vaz","vekar","veloso","vendermiatti","ventura","venturim","venturin","venturini","vereza","verret","vertuane","vervloet","vescovi","vetorazzi","viale","vianna","vicente","vida","vidotti","viebrantz","viens","vilar","villa nova","villares","villares da costa","villela","vinco","vitorazzi","vivaldi","volpato","volponi","voluzia","vugarato","woodward","wainer","walker","wallory","wandermurem","warner","wash","watanabe","weiss","werner","xavier","zardo","zerboni","zacchi","zaganelli","zaia","zambon","zamparoni","zampiroli","zampirolli","zampirollo","zanardo","zanata","zanatta","zancanela","zanchetin","zanchetta","zandonadi","zanelato","zanellato","zanette","zanetti","zanichelli","zanol","zanon","zanoni","zantonelli","zavarise","zavarize","zerbone","zicardi","ziviani","zocatelli","zoppi","zorzal","zorzanelli","zucatelli","zuchi","zucoloto","zulianni","zuqui"],
        };

        let name    = names.female[Math.floor(Math.random() * names.female.length)];
        let middle  = names.female[Math.floor(Math.random() * names.female.length)];
        let surname = names.surname[Math.floor(Math.random() * names.surname.length)];

        return (name+' '+middle+' '+surname).normalize('NFD').replace(/ /g, '-').replace(/[\u0300-\u036f]/g, '');
      },
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/scss/_color.scss';

  .email-section {
    padding: 0 0 1rem;
    background-color: $app-background;

    &-field {
      margin: 0;
      padding: 0.5rem 0;
      outline: none;
      border: none;
      // box-sizing: border-box;
      display: inline-block;
      text-align: center;
      width: 100%;
    }

    &-input-email {
      color: lighten($dark-text, 20%);
      text-overflow: ellipsis;
      width: calc(100% - 1rem);
      padding-left: 1rem;
    }
    &-input-suffix {
      color: lighten($dark-text, 30%);
      background-color: $background;
    }
    &-submit-button {

      padding: 0.5rem 1rem;

      text-decoration: none;
      text-transform: none;

      border: 1px solid darken($cta-base, 10%);
      background: $cta-base;
      color: $cta-base-text;

      &:hover, &:focus {
        border: 1px solid $cta-hover;
        background: $cta-hover;
        color: $cta-hover-text;
      }
    }

    &-form {
      border-radius: .5rem;
      overflow: hidden;
      max-width: 600px;
      margin-left: auto;
      margin-right: auto;
    }
    &-create-email {}

    &-copy-email {
      &-input-box { display: flex; }
      &-input-email { flex: 1; }
      &-input-suffix { cursor: pointer; color: $bright-text; background-color: $black; }
    }
  }

  @media only screen and (min-width:700px) {
    .email-section {
      &-form { display: flex; }

      &-field { flex: 1; }

      &-input-email   { flex-grow: 2.25; }
      &-input-suffix  { flex-grow: 2.00; }
      &-submit-button { flex-grow: 0.75; }

      &-input-email   { width: 100%; padding-left: 0; }
    }
  }
</style>
