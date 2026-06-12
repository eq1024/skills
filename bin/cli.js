#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const os = require('os');
const { program } = require('commander');
const { select, confirm, checkbox } = require('@inquirer/prompts');
const pc = require('picocolors');
const pkg = require('../package.json');

const sourceDir = path.join(__dirname, '..');

function copyDir(src, dest) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// 支持的 Agent 列表及配置
const AGENTS_CONFIG = {
  claude: { name: 'Claude Code', local: '.claude', global: path.join(os.homedir(), '.claude'), cmdDir: 'commands' },
  cursor: { name: 'Cursor', local: '.cursor', global: path.join(os.homedir(), '.cursor'), cmdDir: 'commands' },
  codex: { name: 'Codex', local: '.codex', global: path.join(os.homedir(), '.codex'), cmdDir: 'commands' },
  copilot: { name: 'GitHub Copilot', local: '.copilot', global: path.join(os.homedir(), '.copilot'), cmdDir: 'commands' },
  opencode: { name: 'OpenCode', local: '.opencode', global: path.join(os.homedir(), '.opencode'), cmdDir: 'commands' },
  windsurf: { name: 'Windsurf', local: '.windsurf', global: path.join(os.homedir(), '.windsurf'), cmdDir: 'commands' },
  gemini: { name: 'Gemini CLI', local: '.gemini', global: path.join(os.homedir(), '.gemini'), cmdDir: 'commands' },
  antigravity: { name: 'Antigravity', local: '.antigravity', global: path.join(os.homedir(), '.antigravity'), cmdDir: 'commands' },
  cline: { name: 'Cline', local: '.cline', global: path.join(os.homedir(), '.cline'), cmdDir: 'commands' },
  roocode: { name: 'RooCode', local: '.roocode', global: path.join(os.homedir(), '.roocode'), cmdDir: 'commands' },
  kilo: { name: 'Kilo Code', local: '.kilo', global: path.join(os.homedir(), '.config', 'kilo'), cmdDir: 'command' }, // Kilo 使用 command
  qoder: { name: 'Qoder', local: '.qoder', global: path.join(os.homedir(), '.qoder'), cmdDir: 'commands' },
  codebuddy: { name: 'CodeBuddy', local: '.codebuddy', global: path.join(os.homedir(), '.codebuddy'), cmdDir: 'commands' }
};

async function interactiveInit() {
  console.log(pc.cyan('🚀 欢迎使用 EQ Skills 初始化向导\n'));

  const agentsChoices = Object.entries(AGENTS_CONFIG).map(([key, config]) => ({
    name: `${config.name} (${config.local})`,
    value: key,
    checked: key === 'claude' || key === 'kilo'
  }));

  const agents = await checkbox({
    message: '请选择要安装的 AI Agent (可多选):',
    choices: agentsChoices,
    loop: false,
    pageSize: 15
  });

  if (agents.length === 0) {
    console.log(pc.yellow('未选择任何 Agent，退出安装。'));
    return;
  }

  const scope = await select({
    message: '请选择安装范围:',
    choices: [
      { name: '当前项目 (Local)', value: 'local', description: '安装在当前目录下的隐藏文件夹中' },
      { name: '全局配置 (Global)', value: 'global', description: '安装在用户的全局配置目录中' }
    ]
  });

  // 扫描可用的 skills
  const skillsDir = path.join(sourceDir, 'skills');
  const availableSkills = fs.existsSync(skillsDir)
    ? fs.readdirSync(skillsDir).filter(d => !d.startsWith('.'))
    : [];

  const selectedSkills = await checkbox({
    message: '请选择要安装的 Skills (可多选):',
    choices: availableSkills.map(name => ({ name, value: name, checked: true })),
    loop: false,
    pageSize: 15
  });

  if (selectedSkills.length === 0) {
    console.log(pc.yellow('未选择任何 Skill，退出安装。'));
    return;
  }

  const targetDirs = [];

  for (const agentKey of agents) {
    const config = AGENTS_CONFIG[agentKey];
    const targetDir = scope === 'local' ? path.join(process.cwd(), config.local) : config.global;
    targetDirs.push({ key: agentKey, config, path: targetDir });
  }

  console.log('\n即将执行以下安装:');
  targetDirs.forEach(t => {
    console.log(`- ${pc.green(t.config.name)}: ${pc.cyan(t.path)}`);
  });

  const proceed = await confirm({ message: '确认安装?', default: true });
  if (!proceed) {
    console.log(pc.yellow('已取消安装。'));
    return;
  }

  for (const target of targetDirs) {
    const targetDir = target.path;
    console.log(pc.gray(`\n安装到: ${targetDir} [${target.config.name}]`));
    
    const skillsSrc = path.join(sourceDir, "skills");
    const skillsDest = path.join(targetDir, "skills");
    for (const name of selectedSkills) {
      const src = path.join(skillsSrc, name);
      const dest = path.join(skillsDest, name);
      if (fs.existsSync(src)) {
        copyDir(src, dest);
      }
    }
    console.log(`✅ Skills (${selectedSkills.length}): ${selectedSkills.join(", ")}`);

    const cmdsSrc = path.join(sourceDir, "commands");
    const cmdsDest = path.join(targetDir, target.config.cmdDir);
    // 只复制选中 skill 对应的 command 文件
    if (fs.existsSync(cmdsSrc)) {
      for (const ns of fs.readdirSync(cmdsSrc)) {
        if (ns.startsWith(".")) continue;
        const nsPath = path.join(cmdsSrc, ns);
        if (!fs.statSync(nsPath).isDirectory()) continue;
        for (const name of selectedSkills) {
          const cmdFile = path.join(nsPath, `${name}.md`);
          if (fs.existsSync(cmdFile)) {
            const destFile = path.join(cmdsDest, ns, `${name}.md`);
            fs.mkdirSync(path.dirname(destFile), { recursive: true });
            fs.copyFileSync(cmdFile, destFile);
          }
        }
      }
      console.log(`✅ Commands 已安装 (${selectedSkills.length} 个).`);
    }
  }

  console.log(pc.green('\n🎉 安装完成! 可以开始使用了。'));
}

function listCmd() {
  console.log(pc.cyan('已打包的 EQ Skills:\n'));

  const skillsDir = path.join(sourceDir, "skills");
  const cmdsDir = path.join(sourceDir, "commands");

  if (fs.existsSync(skillsDir)) {
    for (const name of fs.readdirSync(skillsDir)) {
      if (name.startsWith(".")) continue;
      const skillFile = path.join(skillsDir, name, "SKILL.md");
      if (fs.existsSync(skillFile)) {
        const cmdNames = [];
        if (fs.existsSync(cmdsDir)) {
          for (const ns of fs.readdirSync(cmdsDir)) {
            if (ns.startsWith(".")) continue;
            const cmdFile = path.join(cmdsDir, ns, `${name}.md`);
            if (fs.existsSync(cmdFile)) {
              cmdNames.push(`${ns}:${name}`);
            }
          }
        }
        const cmdStr = cmdNames.length > 0 ? cmdNames.map(c => `  /${c}`).join("\n") : `  /${name}`;
        console.log(`📦 ${pc.green(name)}:`);
        console.log(pc.gray(cmdStr));
        console.log('');
      }
    }
  }
}

program
  .name('eq')
  .description(pkg.description)
  .version(pkg.version);

program
  .command('init')
  .description('交互式初始化安装')
  .action(() => {
    interactiveInit().catch(err => {
      console.error(pc.red('错误:'), err.message);
      process.exit(1);
    });
  });

program
  .command('list')
  .description('列出当前包包含的所有 skills')
  .action(() => {
    listCmd();
  });

if (process.argv.length === 2) {
    interactiveInit().catch(err => {
      console.error(pc.red('错误:'), err.message);
      process.exit(1);
    });
} else {
    program.parse(process.argv);
}
