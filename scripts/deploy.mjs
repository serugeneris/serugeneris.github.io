// scripts/deploy.mjs
import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs';
import path from 'path';

const execAsync = promisify(exec);

async function deploy() {
  try {
    // Build the Next.js app
    console.log('Building Next.js app...');
    await execAsync('npm run build');
    
    // Ensure .nojekyll file exists in the out directory
    console.log('Creating .nojekyll file...');
    fs.writeFileSync(path.join('out', '.nojekyll'), '');
    
    // Deploy to GitHub Pages
    console.log('Deploying to GitHub Pages...');
    await execAsync('npx gh-pages -d out -t true');
    
    console.log('Deployment complete! Your site should be available shortly at https://serugeneris.github.io');
  } catch (error) {
    console.error('Deployment failed:', error);
    process.exit(1);
  }
}

deploy();