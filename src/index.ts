import Hexo = require("hexo");
import util = require("hexo-util");
class ObsidianLinkRender{

        render = function (data:Hexo.Locals.Page){
            const IMGTAGPREFIX:string = '!';
            const regexexp = new RegExp("["+IMGTAGPREFIX+"]*\\[\\[(.+?)\\]\\]",'g');
            let obsLinkArr = data.content.match(regexexp);
            if(obsLinkArr == null){
                return data;
            }
            for(let i=0;i < obsLinkArr.length;i++){
                let isImgTag = false;

                if(obsLinkArr[i].startsWith(IMGTAGPREFIX)){
                    isImgTag = true;
                    obsLinkArr[i] =  obsLinkArr[i].replace(IMGTAGPREFIX, "")
                }
                let link = obsLinkArr[i].match(/([^\[\]]+)/)[0];
                let postlink = link.match(/([^^#|]*)/)?link.match(/([^^#|]*)/)[0]:'';
                let displayText = link.match(/\|([^^#]*)/)?link.match(/\|([^^#]*)/)[0].substring(1):'';
                let anchor = link.match(/#([^^|]*)/)?link.match(/#([^^|]*)/)[0].substring(1):'';

                if (!isImgTag) {
                    data.content = data.content.replace(obsLinkArr[i], "{% post_link " + postlink + (displayText != "" ? " '" + displayText + "'" : "") + " %}");
                }
                else {
                    data.content = data.content.replace(IMGTAGPREFIX + obsLinkArr[i], "{% asset_img '" + postlink + "' \"" + displayText + "'" + postlink + "'" + "\" %}");
                }
            }
            return data;
    }
}
hexo.extend.filter.register('before_post_render', new ObsidianLinkRender().render);