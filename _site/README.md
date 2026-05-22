My HomePage <https://bingzhen-li.github.io/>

## 头像自定义

1. 把头像文件放到 `assets/images/`，例如 `assets/images/me.jpg`。
2. 在 `_data/profile.yml` 里把 `image` 改成对应路径，例如 `/assets/images/me.jpg`。
3. 如果想继续显示首字母，把 `image` 字段删掉或留空。

当前首页的头像区域会在有 `image` 时优先显示图片，否则回退到首字母占位图。