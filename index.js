    function obsidian_link_post_render(data){
        let reg = /\[\[(.+?)\]\]/g;
        let obsLinkArr = data.content.match(reg);
        if(obsLinkArr == null){
            return data;
        }
        for(let i=0;i < obsLinkArr.length;i++){
            let isImgTag = false;
            if(data.content[data.content.indexOf(obsLinkArr[i])-1]=='!'){
                isImgTag = true;
            }
            let link = obsLinkArr[i].replace("]]", "").replace("[[", "");
            let titleText = '';
            if(link.indexOf('#')>-1 || link.indexOf('^')>-1 || link.indexOf('|')>-1){
                let titleend = link.length-1;
                let altText = -1;
                let altTextEnd = titleend;
                if(link.indexOf('#')>-1){
                    titleend = link.indexOf('#');
                    if(link.indexOf('|')>-1){
                        if(link.indexOf('#')>link.indexOf('|')){
                            altTextEnd = link.indexOf('#')-1;
                        }
                    }
                }
                if(link.indexOf('^')>-1 && titleend > link.indexOf('^')){
                    titleend = link.indexOf('^');
                    if(link.indexOf('|')>-1){
                        if(link.indexOf('^')>link.indexOf('|')){
                            altTextEnd = link.indexOf('^')-1;
                        }
                    }
                }
                if(link.indexOf('|')>-1 ){
                    altText = link.indexOf('|')+1;

                    if(titleend > link.indexOf('|')){
                        titleend =  link.indexOf('|');
                    }
                }
                if(altText>-1){
                    
                    titleText = link.substring(altText,altTextEnd+1);
                }
                link = link.substring(0,titleend);
//console.log(link,':',titleText,':',titleend,':', altText,':', altTextEnd)     ;
}
            if(!isImgTag){
            data.content = data.content.replace(obsLinkArr[i], "{% post_link '" + link + "' "+titleText+" %}");
            }
            else{
            data.content = data.content.replace('!'+obsLinkArr[i], "{% asset_img '" + link + "' \"標題-"+titleText+"'"+titleText+"'"+"\" %}");
            }
        }
        return data;
    }
    hexo.extend.filter.register('before_post_render', obsidian_link_post_render);