"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ObsidianLinkRenderOption = (function () {
    function ObsidianLinkRenderOption() {
    }
    return ObsidianLinkRenderOption;
}());
var ObsidianLinkRender = (function () {
    function ObsidianLinkRender() {
        this.render = function (data) {
            var hexo = this;
            var options = Object.assign({
                alternate_prefix: ''
            }, hexo.config.obsidian_link);
            var IMGTAGPREFIX = '!';
            var regexexp = new RegExp("[" + IMGTAGPREFIX + "]*\\[\\[(.+?)\\]\\]", 'g');
            var obsLinkArr = data.content.match(regexexp);
            if (obsLinkArr == null) {
                return data;
            }
            for (var i = 0; i < obsLinkArr.length; i++) {
                var isImgTag = false;
                if (obsLinkArr[i].startsWith(IMGTAGPREFIX)) {
                    isImgTag = true;
                    obsLinkArr[i] = obsLinkArr[i].replace(IMGTAGPREFIX, "");
                }
                var link = obsLinkArr[i].match(/([^\[\]]+)/)[0];
                var postlink = link.match(/([^^#|]*)/) ? link.match(/([^^#|]*)/)[0] : '';
                var displayText = link.match(/\|([^^#]*)/) ? link.match(/\|([^^#]*)/)[0].substring(1) : '';
                var anchor = link.match(/#([^^|]*)/) ? link.match(/#([^^|]*)/)[0].substring(1) : '';
                if (!isImgTag) {
                    data.content = data.content.replace(obsLinkArr[i], "{% post_link " + postlink + (displayText != "" ? " '" + displayText + "'" : "") + " %}");
                }
                else {
                    data.content = data.content.replace(IMGTAGPREFIX + obsLinkArr[i], "{% asset_img '" + postlink + "' \"" + displayText + "'" + options.alternate_prefix + postlink + "'" + "\" %}");
                }
            }
            return data;
        };
    }
    return ObsidianLinkRender;
}());
hexo.extend.filter.register('before_post_render', new ObsidianLinkRender().render);
