# 剑琅管家 · PC 端页面设计规范

**产品**：剑琅管家（SaaS 店务管理系统）  
**版本**：Design System v1.0  
**设计基准**：1440 × 900（最小宽度 1280）  
**参考资源**：[Arco Design Pro 2.0 设计资源（Figma Community）](https://www.figma.com/design/YKaA4EkQ9bcVjeqvKY3tsA/Arco-Design-Pro-2.0-%E8%AE%BE%E8%AE%A1%E8%B5%84%E6%BA%90--Community-?node-id=236-30024) · [剑琅联盟移动端设计规范](https://xdean-designer.github.io/jianlang-design-spec/)  
**技术对齐**：[Arco Design React](https://arco.design/react) · Arco Design Pro 布局与组件语义

---

## ★ 全局强制 UI（PC 最高优先级）

以下条款为最高优先级约束。设计、开发与 AI 出图须先满足本章。

| 项 | 规范 |
| --- | --- |
| **画布** | 默认 **1440×900**；最小内容宽度 **1280**；高度随内容向下延展 |
| **品牌主色** | **`#F32F41`**（替代 Arco 默认 `#165DFF`） |
| **品牌辅助** | `#FFD5D9`、`#FFF2F2`（浅底、选中、业绩区） |
| **页面背景** | 内容区 `#F2F3F5`（Arco 灰-1）；卡片/面板 `#FFFFFF` |
| **文字色** | 标题/正文 `#1D2129`；次要 `#4E5969`；占位 `#86909C`；禁用 `#C9CDD4` |
| **剑琅对齐色** | 与移动端一致场景可用 `#333333` / `#929292` / 分割线 `#E5E6EB`（Arco）或 `#D7D7D5`（剑琅移动端） |
| **字体** | **PingFang SC** / `-apple-system` 回退；金额纯数字 **TCloudNumber Bold** |
| **金额混排** | `¥`、应付/实付/小计用苹方；`¥` 与数字间距 **4px** |
| **圆角** | 组件级 **2px / 4px / 8px**（对齐 Arco）；业务卡片 **8px**；大面板 **12px** |
| **阴影** | PC 遵循 Arco 层级：**卡片/下拉/弹窗**使用轻阴影；**禁止**大面积渐变背景 |
| **图标** | 线性为主，16 / 20 / 24px；品牌操作 `#F32F41`；常规 `#4E5969` |
| **间距模数** | **4px** 基准（4 / 8 / 12 / 16 / 20 / 24 / 32 / 40） |
| **禁止** | 自创未收录功能图标、主色大面积铺底（侧栏品牌条除外） |

---

## 0. 概述与品牌关系

**剑琅管家**为 B 端店务 SaaS（收银、会员、预约、库存、报表、员工权限等），与 **剑琅联盟**移动端同属剑琅品牌体系。

| 维度 | 移动端（剑琅联盟） | PC 端（剑琅管家） |
| --- | --- | --- |
| 主色 | `#F32F41` | `#F32F41`（一致） |
| 布局范式 | 390 单栏 + TabBar | 侧栏 + 顶栏 + 内容区（Arco Pro） |
| 视觉密度 | 触控 48px 按钮 | 鼠标 32px 主按钮、40px 表格行 |
| 层次 | 无阴影、扁平 | Arco 轻阴影 + 分割线 |
| 组件库 | 自研 HTML / Flutter | **Arco Design React** + Pro 模板 |

**Figma 使用说明**：在 [Arco Design Pro 2.0 设计资源](https://www.figma.com/design/YKaA4EkQ9bcVjeqvKY3tsA/) 中，将主题色 / Primary 从蓝色改为 **`#F32F41`**，并同步下方品牌色阶。布局、表格、表单、仪表盘结构直接复用该文件。

---

## 1. 设计原则

1. **高效**：常用路径 ≤3 次点击；列表支持筛选、批量、快捷键（Enter 提交、Esc 关闭弹窗）。
2. **清晰**：侧栏定导航、顶栏定上下文、内容区定任务；状态 = 颜色 + 文案 + 图标。
3. **一致**：全站统一 Arco 组件变体；同类业务复用 Pro 模板（列表页 / 详情页 / 表单页 / 仪表盘）。
4. **专业**：克制用色；品牌红用于主按钮、选中态、关键指标，不作整页背景。

**关键词**：企业级 · 数据密集 · 可信赖 · 操作路径短 · 信息分层明确

---

## 2. 色彩系统

### 2.1 品牌色（主色 `#F32F41`）

| Token | 色值 | 用途 |
| --- | --- | --- |
| brand-1 | `#FEF0F1` | 浅色背景、选中行底 |
| brand-2 | `#FDD9DC` | 悬浮背景、Tag 浅底 |
| brand-3 | `#FCBDC3` | 弱选中 |
| brand-4 | `#FB9BA3` | 禁用边框 |
| brand-5 | `#F97883` | 悬浮态（按钮/link） |
| **brand-6 ★** | **`#F32F41`** | **主色：主按钮、链接、选中、主色图标** |
| brand-7 | `#D92939` | 点击/按下 |
| brand-8 | `#BF2432` | 强调文字 |
| brand-9 | `#991D28` | 深色强调 |
| brand-10 | `#73161E` | 最深 |
| brand-aux-1 | `#FFD5D9` | 标签底、浅强调 |
| brand-aux-2 | `#FFF2F2` | 业绩卡、品牌浅区块 |

> Arco 变量映射：`--primary-6: #F32F41`，其余 `--primary-1` ~ `--primary-10` 见 `tokens/design-tokens.json`。

### 2.2 功能色（与 Arco / 移动端对齐）

| 语义 | 浅色背景 | 常规 | 深色/点击 | 场景 |
| --- | --- | --- | --- | --- |
| Success | `#E8FFEA` | `#00B42A` | `#009A29` | 完成、生效、通过 |
| Warning | `#FFF7E8` | `#FF7D00` | `#D25F00` | 待处理、即将到期 |
| Error | `#FFECE8` | `#F53F3F` | `#CB2634` | 失败、驳回、危险操作 |
| Info | `#E8F3FF` | `#165DFF` | `#0E42D2` | 说明、外链（非品牌链接） |

### 2.3 中性色（Arco 灰阶 · 内容区优先）

| Token | 色值 | 用途 |
| --- | --- | --- |
| gray-1 | `#F2F3F5` | 页面背景 layout-content |
| gray-2 | `#F7F8FA` | 表头、次级区块 |
| gray-3 | `#E5E6EB` | 边框、分割线 |
| gray-4 | `#C9CDD4` | 禁用边框、占位图标 |
| gray-5 | `#A9AEB8` | 禁用文字 |
| gray-6 | `#86909C` | 次要说明 |
| gray-7 | `#6B7785` | 次要标题 |
| gray-8 | `#4E5969` | 正文次要 |
| gray-9 | `#272E3B` | 强调正文 |
| gray-10 | `#1D2129` | 标题、主正文 |

### 2.4 文字色

| Token | 色值 | 用途 |
| --- | --- | --- |
| text-primary | `#1D2129` | 标题、表格主文字 |
| text-secondary | `#4E5969` | 描述、表头辅助 |
| text-tertiary | `#86909C` | 时间戳、弱提示 |
| text-disabled | `#C9CDD4` | 禁用 |
| text-brand | `#F32F41` | 可点击、强调 |
| text-link | `#165DFF` | 外链（与品牌红区分） |
| text-anti | `#FFFFFF` | 主按钮、品牌底栏文字 |

### 2.5 使用比例（B 端 PC）

- 界面约 **70%** 中性色 + **25%** 文字 + **5%** 品牌/功能点缀  
- 主按钮、菜单选中、Switch 开启、Pagination 当前页：`brand-6`  
- 禁止整页 `brand-6` 铺底（Logo 条、登录页、营销 Banner 除外）

---

## 3. 字体排版

### 3.1 字体家族

| 用途 | 字体 |
| --- | --- |
| 界面文案 | PingFang SC, "Microsoft YaHei", sans-serif |
| 数据数字 | TCloudNumber-Bold（仅数字与小数点） |
| 代码/单号 | `"SF Mono", Consolas, monospace` 12px |

### 3.2 字号阶梯（PC，单位 px）

| Token | 字号 | 行高 | 字重 | 场景 |
| --- | --- | --- | --- | --- |
| font-h1 | 20 | 28 | 500 | 页面主标题 |
| font-h2 | 16 | 24 | 500 | 卡片标题、Modal 标题 |
| font-h3 | 14 | 22 | 500 | 分组标题、表头强调 |
| font-body | 14 | 22 | 400 | 正文、表格、表单 |
| font-caption | 12 | 20 | 400 | 辅助说明、Tag |
| font-mini | 12 | 20 | 400 | 图表坐标、极小标签 |
| font-data | 24 | 32 | 700 (TCloudNumber) | 仪表盘核心指标 |
| font-data-md | 16 | 24 | 600 | 列表关键金额 |

### 3.3 规则

- 表格数字列右对齐，千分位，金额 2 位小数  
- 超长单元格 `ellipsis` + Tooltip  
- 段落间距 ≥ 1.5× 字号（14px → 21px）  
- 最小可读字号 **12px**

---

## 4. 布局与间距

### 4.1 经典布局（Arco Design Pro）

```
┌──────────────────────────────────────────────────────────────┐
│ 顶栏 NavBar                                    高 60px      │
├──────────┬───────────────────────────────────────────────────┤
│          │  面包屑 Breadcrumb + 页面标题                      │
│  侧栏    │  ─────────────────────────────────────────────  │
│  Sider   │  筛选区 Filter（可选）                            │
│  220px   │  ─────────────────────────────────────────────  │
│  可折叠   │  内容 Card / Table / Form                        │
│  → 48px  │  padding 16~24px                                 │
│          │                                                   │
└──────────┴───────────────────────────────────────────────────┘
```

| 元素 | 尺寸 | 说明 |
| --- | --- | --- |
| 画布默认 | 1440 × 900 | 设计稿基准 |
| 最小宽度 | 1280 | 低于此宽度出现横向滚动 |
| 侧栏展开 | 220px | 一级菜单 + 图标 |
| 侧栏折叠 | 48px | 仅图标，Tooltip 显示文案 |
| 顶栏 | 60px | Logo、折叠、搜索、消息、用户 |
| 内容区内边距 | 16px（紧凑）/ 24px（默认） | 与 Pro 模板一致 |
| 卡片间距 | 16px | 卡片之间垂直间距 |
| 表单标签宽 | 100px / 120px | 右对齐标签（中文 B 端） |
| 表格行高 | 40px（默认）/ 48px（宽松） | |
| 分页器 | 底栏固定或表格下方 16px | |

### 4.2 间距 Token

| Token | 值 | 用途 |
| --- | --- | --- |
| space-1 | 4px | 图标与文字、紧凑 |
| space-2 | 8px | 按钮组、Tag 内边距 |
| space-3 | 12px | 表单项间距 |
| space-4 | 16px | 卡片内边距、筛选表单项 |
| space-5 | 20px | 区块间距 |
| space-6 | 24px | 页面区块、Modal 内边距 |
| space-8 | 32px | 大区块分隔 |
| space-10 | 40px | 表单分组间距 |

---

## 5. 圆角与阴影

### 5.1 圆角

| Token | 值 | 用途 |
| --- | --- | --- |
| radius-none | 0 | 表格、全宽分割 |
| radius-sm | 2px | Input、Tag、小按钮（Arco 默认） |
| radius-md | 4px | Button、Select、Alert |
| radius-lg | 8px | Card、Modal、Drawer 内容区 |
| radius-xl | 12px | 营销 Banner、空状态插画容器 |

### 5.2 阴影（PC 启用，与移动端区分）

| Token | 值 | 用途 |
| --- | --- | --- |
| shadow-1 | `0 1px 2px rgba(0,0,0,0.06)` | 卡片默认 |
| shadow-2 | `0 4px 10px rgba(0,0,0,0.08)` | 下拉、Popover |
| shadow-3 | `0 8px 24px rgba(0,0,0,0.12)` | Modal、Drawer |

移动端「无阴影」规则 **不适用于 PC**；PC 以 Arco 层级为准，但仍 **禁止渐变背景**。

---

## 6. 图标

- **库**：Arco Icon + [Stratis UI Icons](https://www.figma.com/community)（与移动端映射表一致，见移动端规范第 6 章）  
- **尺寸**：侧栏 20px · 顶栏/按钮 16px · 空状态 48px  
- **描边**：线性 1.5~2px，圆角端点  
- **店务映射**：开单 `file-add`、会员 `usergroup`、预约 `calendar`、库存 `box`、报表 `chart`、设置 `settings`

### 6.1 Emoji（按需）

PC 端在**有需要时**可使用 Emoji 作为辅助视觉，与移动端「禁止 Emoji」规则区分。

| 允许场景 | 示例 | 注意 |
| --- | --- | --- |
| 空状态 | 📋 暂无订单 | 与主文案并列，不单独作为按钮 |
| 轻量反馈 | 操作成功提示旁 ✓ 氛围 | 仍优先 Message / Result 组件 |
| 营销/活动 | 限时活动标题旁 🎉 | 控制数量，保持 B 端克制 |
| 数据标注 | 排行榜前三 🥇🥈🥉 | 仅装饰，关键数据仍用数字 |

**约束**：单屏 Emoji ≤3；禁止用于侧栏菜单、表格操作列、表单必填标识；与图标库冲突时以线性图标为准。

---

## 7. 组件规范（Arco 映射）

以下组件使用 **Arco Design React**，主题色覆盖为 `brand-6`。

### 7.1 导航

| 组件 | 规格 |
| --- | --- |
| **Layout.Sider** | 220/48px；背景 `#FFFFFF` 或深色模式 `#232324`；选中项 `brand-1` 底 + `brand-6` 字/左边框 3px |
| **Layout.Header** | 60px；白底；底边 `gray-3` 1px |
| **Menu** | 一级 44px 行高；子菜单缩进 12px；选中 `brand-6` |
| **Breadcrumb** | 14px；末级 `text-primary`；分隔符 `/` |

### 7.2 按钮 Button

| 变体 | 规格 |
| --- | --- |
| Primary | 高 32px（默认）/ 36px（大）；`brand-6` 底 + 白字；hover `brand-5`；active `brand-7` |
| Secondary | 白底 + `gray-3` 边框 |
| Outline | 白底 + `brand-6` 字 + 1px `brand-6` 边 |
| Text | `brand-6` 字，无底色 |
| Danger | `error` 色系，用于删除/作废 |
| Disabled | 灰底 `#F2F3F5` + `text-disabled` |

### 7.3 数据展示

| 组件 | 规格 |
| --- | --- |
| **Table** | 表头 `gray-2` 底；斑马纹可选；操作列右固定；行高 40px |
| **Pagination** | 右对齐；当前页 `brand-6` |
| **Tag** | 高 24px；圆角 2px；状态色见第 8 章 |
| **Statistic** | 数字 TCloudNumber；标题 14px secondary |

### 7.4 表单

| 组件 | 规格 |
| --- | --- |
| **Form** | 标签右对齐 100px；`layout="horizontal"` |
| **Input** | 高 32px；focus 边框 `brand-6` |
| **Select / DatePicker** | 与 Input 同高；面板 shadow-2 |
| **Upload** | 拖拽区虚线 `gray-3`；hover `brand-1` 底 |

### 7.5 反馈

| 组件 | 规格 |
| --- | --- |
| **Modal** | 宽 520 / 720 / 920；圆角 8px；主按钮 Primary |
| **Drawer** | 宽 480 / 720；右侧滑出；用于详情/编辑 |
| **Message / Notification** | 4s 自动关闭；成功/警告/错误用功能色 |
| **Empty** | 插画 + 主副文案 + Primary 引导按钮 |

### 7.6 数据可视化（ECharts / Arco Charts）

面向经营分析、报表中心、工作台。强调可读、可比对、可溯源。

| 图表类型 | 场景 | 高度 | 主色 |
| --- | --- | --- | --- |
| 折线图 Line | 营业额趋势、同比 | 320px | brand-6 + info 对比 |
| 曲线图 Smooth | 客流时段分布 | 280px | info + 面积渐变 |
| 柱状图 Bar | 门店/品类对比 | 300px | brand-6 |
| 堆叠柱 Stacked | 销售构成 | 300px | chart-1~3 |
| 面积图 Area | 会员累计 | 280px | brand 渐变 25%→0% |
| 柱线混合 | 实收 vs 目标 | 320px | 柱 brand · 线 warning |
| 环形图 Donut | 支付/来源占比 | 260px | 序列色 6 色 |
| 仪表盘 Gauge | 目标完成率 | 240px | brand 指针 |
| 雷达图 Radar | 经营五维评分 | 300px | brand 填充 15% |
| 热力图 Heatmap | 预约密度 | 280px | brand 单色阶 |

**设计要点**：坐标轴 `#86909C` · 网格虚线 `#E5E6EB` · Tooltip 白底 shadow-2 · 单图系列 ≤5 · 金额千分位。

交互演示见 [`index.html`](index.html) → **数据可视化** 章节。

### 7.7 店务场景组合（页面模板）

| 模板 | 结构 | 参考 Pro 节点 |
| --- | --- | --- |
| **列表页** | 筛选 Card + Table Card + 批量操作 | 表格列表模板 |
| **详情页** | 顶栏操作 + Descriptions + Tabs 子表 | 详情/高级详情 |
| **表单页** | 分步 Steps 或 Anchor + Form 分组 Card | 分步表单 |
| **工作台** | Statistic 行 + 快捷入口 Grid + 待办 Table | 仪表盘 |
| **收银台** | 左右分栏：购物车 + 结算面板 | 自定义（高密度） |

---

## 8. B 端业务规范

### 8.1 状态 Tag 映射

| 业务状态 | Arco Tag color | 说明 |
| --- | --- | --- |
| 草稿 | `gray` | 未提交 |
| 待审批/进行中 | `arcoblue` → 自定义 `brand` | 使用 brand-1/brand-6 |
| 已完成 | `green` | success |
| 已驳回/已取消 | `red` | error |
| 即将到期 | `orange` | warning |

### 8.2 数据格式

- 金额：`¥` + 千分位 + 2 小数（TCloudNumber）  
- 日期：`YYYY-MM-DD`；时间：`HH:mm:ss`  
- 会员手机：中间 4 位 `*` 脱敏  
- 复制 ID：点击复制 + Message 反馈

### 8.3 权限与空状态

- 无权限：403 插画 +「暂无权限，联系管理员」  
- 无数据：Empty +「新建」Primary  
- 搜索无结果：Empty search 变体

---

## 9. 主题配置（开发）

### 9.1 Arco Less 变量（摘录）

见 `tokens/arco-theme.less`，构建前注入或 `@arco-design/theme-jianlang` 发布。

### 9.2 Design Token JSON

见 `tokens/design-tokens.json`，可导入 Token 插件或映射至 `ConfigProvider`。

### 9.3 AI 出图 Prompt 模板

```
请按《剑琅管家 PC 端设计规范 v1.0》设计 [页面名称]：
- 画布 1440×900，最小宽 1280；布局：侧栏 220 + 顶栏 60 + 内容区
- 参考 Arco Design Pro 2.0 组件与密度；品牌主色 #F32F41（非 Arco 蓝）
- 字体 PingFang SC；金额数字 TCloudNumber-Bold；¥ 与数字间距 4px
- 背景 #F2F3F5 / 卡片 #FFFFFF；边框 #E5E6EB；文字 #1D2129 / #4E5969
- 主按钮 32px 高 brand-6 底白字；表格行 40px；圆角 4/8px；轻阴影
- Emoji 可选，见第 6.1 章（全局不禁止）
- 禁止大面积渐变背景、整页红底
- 业务：[字段与操作说明]
```

---

## 10. 与 Figma / 移动端对照

| 项目 | 值 |
| --- | --- |
| Figma 参考 | [Arco Design Pro 2.0](https://www.figma.com/design/YKaA4EkQ9bcVjeqvKY3tsA/) node `236:30024` |
| 移动端规范 | [jianlang-design-spec](https://xdean-designer.github.io/jianlang-design-spec/) v1.4 |
| 品牌主色 | `#F32F41`（两端一致） |
| 产品命名 | PC：**剑琅管家** · 移动：**剑琅联盟** |

---

**剑琅管家** · PC 端设计规范 v1.0 · © 剑琅

---

## 交互式规范站点

**在线地址**：https://xdean-designer.github.io/jianlang-pc-design-spec/

**仓库**：https://github.com/XDean-Designer/jianlang-pc-design-spec

发布步骤见 [`DEPLOY.md`](DEPLOY.md)。

本地预览：双击打开 [`index.html`](index.html)，或在目录下执行：

```bash
npx --yes serve .
```

然后在浏览器访问提示的本地地址（推荐，可完整加载 `tokens/design-tokens.json` 与 ECharts 图表）。

**数据可视化**章节需联网加载 ECharts CDN；离线时其余章节仍可浏览。
