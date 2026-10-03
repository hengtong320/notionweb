# V32 本地构建

在仓库根目录执行：

```sh
npm install --prefix /tmp/anatomy-v32-build --cache /tmp/anatomy-v32-cache three@0.180.0 three-mesh-bvh@0.9.2 esbuild@0.25.10
python3 atlas32-tools/prepare.py
NODE_PATH=/tmp/anatomy-v32-build/node_modules node atlas32-tools/build.cjs
python3 -m http.server 8782 --bind 127.0.0.1
```

浏览器打开 `http://127.0.0.1:8782/fullbody-tcm-v32/`。

prepare.py 从 V31 重建候选源文件，因此应先把后续修改纳入此脚本再执行。不会修改 V31 或原始模型资源。
