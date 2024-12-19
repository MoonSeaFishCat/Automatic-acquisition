# ERP辅助插件

## 项目概述

ERP辅助插件是一个面向商家和数据采集人员的Chrome浏览器扩展，用于高效采集电商平台（如 Temu）上的商品信息。该插件支持商品详情页和商品列表页两种采集方式，拥有实时日志记录和任务控制功能，旨在提高数据采集的效率和便捷性。

## 特性

- **两种采集方式**：支持商品详情页及商品列表页信息的采集。
- **可视化日志窗口**：实时显示采集进度和状态，便于用户监控。
- **一键控制**：通过简单的按钮点击即可开始和停止数据采集。
- **高度可定制**：用户可选择不同的采集方式，满足不同需求。

## 安装步骤

1. **克隆项目**：
   ```bash
   git clone https://github.com/yourusername/ERP-assistant-extension.git
   cd ERP-assistant-extension
   ```

2. **打开Chrome浏览器**，并在地址栏输入 `chrome://extensions`。

3. **启用开发者模式**（右上角的开关）。

4. **点击“加载已解压的扩展程序”**，选择项目目录。

5. 安装完成后，您将在浏览器的工具栏中看到插件图标。

## 使用方法

1. 同时打开erp平台和temu平台
2. 停留在需要采集的分类页面
3. 点击扩展图标打开插件界面。
4. 选择采集方式（方式一或方式二）。
5. 点击“开始采集”按钮开始数据采集。
6. 若需停止采集，点击“停止采集”按钮。

## 功能详解

- **商品详情页采集**：通过点击商品并访问详情页进行信息采集，适用于需要详细信息的场景。
- **商品列表页采集**：快速滚动商品列表，点击相应按钮以批量采集商品。适用于大规模商品信息采集。
- **日志记录**：在插件界面展示实时日志，帮助用户了解当前操作状态和历史记录。

## 贡献

欢迎对本项目提出建议或贡献代码！请遵循以下步骤：

1. Fork 本仓库
2. 创建您的特性分支 (`git checkout -b feature/fooBar`)
3. 提交您的更改 (`git commit -am 'Add some fooBar'`)
4. 推送到分支 (`git push origin feature/fooBar`)
5. 创建一个新的 Pull Request

## License

该项目采用 AGPL-3.0 license，详细信息请参考 [LICENSE](LICENSE) 文件。

## 联系信息

如有问题或建议，请联系我：

- 电子邮件：[ishuiliyi@gmail.com](ishuiliyi@gmail.com)

