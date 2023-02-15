# hexo-obsidian-link-plus

# 安裝

``` bash
npm i hexo-obsidian-link-plus
```

# 使用方法

## 文章連結 (Outgoing links)
### 一般
``` md
[[markdown-file-name]]
```
### 加註顯示文字
```md
[[markdown-file-name|Display Text]]
```

## 圖片連結
### 一般
``` md
![[image-file-name]]
```
### 加註顯示文字
```md
![[image-file-name|Display Text]]
```

### 注意事項
使用時，建議Hexo設定將``post_asset_folder: false``改為``post_asset_folder: true``，比較方便連結圖片

# 設定
0.0.6 版 加入了設定檔功能
``` yml
obsidian_link:
  alternate_prefix: img-
  title_prefix: title-
```

``alternate_prefix`` 可以在圖片連結的``alt``屬性加入前綴字，可以幫忙解決無障礙網路服務檢測時，出現alt與src相同的錯誤。
``title_prefix`` 可以在圖片連結的``title``屬性加入前綴字，可以幫忙解決無障礙網路服務檢測時，出現alt與src相同的錯誤。
