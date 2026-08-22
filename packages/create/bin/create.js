#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const name = process.argv[2];

if (!name || name === '--help' || name === '-h') {
    console.log('Usage: npx @beautiful-eyes/create <project-name>');
    console.log('   or: npm create @beautiful-eyes <project-name>');
    process.exit(name ? 0 : 1);
}

if (!/^[A-Za-z0-9._-]+$/.test(name)) {
    console.error('Project name may only contain letters, numbers, dot, underscore, and hyphen.');
    process.exit(1);
}

const dest = path.resolve(process.cwd(), name);
if (fs.existsSync(dest) && fs.readdirSync(dest).length) {
    console.error('Directory already exists and is not empty: ' + dest);
    process.exit(1);
}

const template = path.join(__dirname, '..', 'template');
fs.mkdirSync(dest, { recursive: true });
copyDir(template, dest);
replaceInFile(path.join(dest, 'package.json'), '__PROJECT_NAME__', name);
replaceInFile(path.join(dest, 'app', 'index.html'), '__PROJECT_NAME__', name);
replaceInFile(path.join(dest, 'README.md'), '__PROJECT_NAME__', name);

console.log('Created ' + dest);
console.log('Installing dependencies...');

const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';
const install = spawnSync(npm, ['install'], { cwd: dest, stdio: 'inherit' });
if (install.status !== 0) {
    console.error('npm install failed. cd ' + name + ' && npm install');
    process.exit(install.status || 1);
}

console.log('');
console.log('Next:');
console.log('  cd ' + name);
console.log('  npm start');
console.log('');

function copyDir(from, to){
    for (const entry of fs.readdirSync(from, { withFileTypes: true })) {
        if (entry.name === '.gitkeep') continue;
        const src = path.join(from, entry.name);
        const out = path.join(to, entry.name);
        if (entry.isDirectory()) {
            fs.mkdirSync(out, { recursive: true });
            copyDir(src, out);
        }
        else {
            fs.copyFileSync(src, out);
        }
    }
}

function replaceInFile(file, token, value){
    const text = fs.readFileSync(file, 'utf8');
    fs.writeFileSync(file, text.split(token).join(value));
}
