var toggle = document.getElementById("toggle");
var TOC = document.getElementById("toc_list");
var flag = 1;
// Ver todo los h2 que están dentro de <div id="content-user">
var contentH2 = document.querySelectorAll("#content-user h2");
document.addEventListener('DOMContentLoaded', function() {
    addElementTOC();
  }
);  
toggle.addEventListener("click", function(e) {
    
    e.preventDefault();
    switch(flag) {
        case 0:
            toggle.innerText = "Ocultar contenido";            
            TOC.classList.add("off");
            flag = 1;
            break;
        case 1:
            toggle.innerText = "Mostrar contenido";
            TOC.classList.remove("off");            
            flag = 0;
            break;
    }
});

function addElementTOC_Single() {
    var showThese = document.getElementById("toc_list");     
    for (var i = 0; i < this.contentH2.length; i++){             
        for (var key of ["textContent"]) {           
            showThese.innerHTML += `<li><a href="#${this.contentH2[i][key].replace(" ", "-")}">${this.contentH2[i][key]}</a></li>`;
            this.contentH2[i].setAttribute("id", this.contentH2[i][key].replace(" ", "-")); 
        }
    }
    //console.log(this.contentH2);
}
/**
 * 
 * @param {*} container 
 * @param {*} output 
 * 
 * Regular Expression Patterns 
 * /<h([\d])>([^<]+)<\/h([\d])>/gi
 * <h([\d])> = \d = Encuentra un dígito (English: Find a digit) (Turkes: Bir rakam bulun)
 * ([^<]+) = ^ (Coincide con el principio de la entrada) (English: Matches the beginning of the entry) (Turkes: Girişin başlangıcıyla eşleşir)
 * + = (Busca el carácter precedente 1 o más veces.) (English: Find the preceding character 1 or more times.) (Turkes: Önceki karakteri 1 veya daha fazla kez bulun.)
 * <\/h([\d])> = \d = Encuentra un dígito (English: Find a digit) (Turkes: Bir rakam bulun)
 * /gi = g = (encuentra todos los partidos en lugar de detenerte después del primer partido) (English: find all matches rather than stopping after the first match) (Turkes: ilk maçtan sonra durmak yerine tüm maçları bul)
 * i = (Realizar coincidencias entre mayúsculas y minúsculas) (English: Perform case-insensitive matching) (Turkes: Büyük / küçük harfe duyarlı olmayan eşleştirme gerçekleştirme)
 */
function addElementTOC(container, output) {
    var toc = "";
    var level = 0;
    /**
     * #content-user es el nombre "id" del div, que contiene el contenido y los titulos y subtitulos de la
     * publicación (Puede cambiarse según la estructura del sitio web)
     * 
     * toc_list es el nombre "id" del div, que es el indice que el codigo creara según los titulos y subitutlos
     */
    var container = document.querySelector(container) || document.querySelector('#content-user');
    var output = output || '#toc_list';
    
    container.innerHTML =
        container.innerHTML.replace(
            /<h([\d])>([^<]+)<\/h([\d])>/gi,
            function (str, openLevel, titleText, closeLevel) {
                if (openLevel != closeLevel) {
                    return str;
                }
    
                if (openLevel > level) {
                    toc += (new Array(openLevel - level + 1)).join('<ul>');
                } else if (openLevel < level) {
                    toc += (new Array(level - openLevel + 1)).join('</li></ul>');
                } else {
                    toc += (new Array(level+ 1)).join('</li>');
                }
    
                level = parseInt(openLevel);
    
                var anchor = titleText.replace(/ /g, "-");
                toc += '<li><a href="#' + anchor + '">' + titleText
                    + '</a>';
    
                return `<h${openLevel} id="${anchor}">${titleText}</h${closeLevel}>`;
            }
        );
    
    if (level) {
        toc += (new Array(level + 1)).join('</ul>');
    }
    document.querySelector(output).innerHTML += toc;
};