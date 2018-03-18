
import config from '../../config'
import store from 'store';
import $ from 'jquery';

let $body = $("body");
let editor = config.editor;
let themes = config.themes;
let defaultTheme = config.defaultTheme;
let storeToken = config.storeToken;
let themeToken = config.storeToken + "theme";
let isFirtSetTheme = true;



export function getTheme() {

    let theme = store.get(themeToken);

    if (!theme && defaultTheme) {
         theme = defaultTheme ; 
    }

    return theme;
}


export function setTheme(val, oval) {

    let thisThemeConfig ;

    if (!val) {
        val = getTheme();
    }

    thisThemeConfig = themes[val];
    
    if(val && thisThemeConfig) {
        if (oval) {
            $body.removeClass(oval)
        }

        $body.addClass(val)
        store.set(themeToken, val);

        if(thisThemeConfig.theme != editor.theme){
            editor.theme = thisThemeConfig.theme;
            if(!isFirtSetTheme){
              window.monaco.editor.setTheme(editor.theme);
            }
        }
    }

    if(isFirtSetTheme){
      isFirtSetTheme = false;
    }

  
}



function getFontSize() {

   return store.get(storeToken + "fontSize");
}

function setConfigFontSize() {

    var fontSize = getFontSize();
    if (fontSize) {
        editor.fontSize = fontSize;
    }
}

export function setFontSize(val) {

 
    $(".margin-view-overlays,.view-lines").css("font-size", val+"px");
}



export function setConfigByStore() {

    setTheme();
    setConfigFontSize();

}

