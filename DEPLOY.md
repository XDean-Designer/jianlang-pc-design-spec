# 发布到 GitHub 公网（GitHub Pages）

本地仓库已初始化并完成首次提交，且已配置 GitHub Actions 自动部署。

## 第一步：在 GitHub 创建空仓库

1. 打开 [新建仓库](https://github.com/new)
2. **Repository name** 填写：`jianlang-pc-design-spec`（或自定名称）
3. 选择 **Public**
4. **不要**勾选 “Add a README” / “Add .gitignore”
5. 点击 **Create repository**

## 第二步：推送代码

在项目目录打开终端（PowerShell），执行（将 `你的用户名` 换成你的 GitHub 账号，如 `xdean-designer`）：

```powershell
cd "d:\剑琅PC端设计规范"

git remote remove origin 2>$null
git remote add origin https://github.com/你的用户名/jianlang-pc-design-spec.git
git push -u origin main
```

若提示登录，按 GitHub 指引使用浏览器或 Personal Access Token。

## 第三步：开启 GitHub Pages

1. 打开仓库 → **Settings** → **Pages**
2. **Build and deployment** → **Source** 选择 **GitHub Actions**
3. 回到 **Actions** 页，等待 “Deploy to GitHub Pages” 工作流跑完（约 1–2 分钟）

## 公网地址

部署成功后访问：

```
https://你的用户名.github.io/jianlang-pc-design-spec/
```

示例（若用户名为 `xdean-designer`）：

**https://xdean-designer.github.io/jianlang-pc-design-spec/**

---

## 可选：安装 GitHub CLI 后一条命令建库并推送

```powershell
winget install GitHub.cli
gh auth login
cd "d:\剑琅PC端设计规范"
gh repo create jianlang-pc-design-spec --public --source=. --remote=origin --push
```

然后在仓库 Settings → Pages 中选择 **GitHub Actions** 作为来源。

## 更新站点

修改文件后：

```powershell
git add -A
git commit -m "更新设计规范"
git push
```

推送后 Actions 会自动重新发布。
