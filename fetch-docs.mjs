#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import https from 'https';
import http from 'http';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const BASE_URL = 'https://fewangsit.gitbook.io';
const INDEX_URL = 'https://fewangsit.gitbook.io/vue/llms.txt';
const DOCS_DIR = path.join(__dirname, 'docs');

// Agentic editor inclusion configurations
const EDITOR_CONFIGS = {
  'kiro': {
    inclusion: 'always',
    output_dir: '.kiro/steering'
  },
  'windsurf': {
    trigger: 'always-on',
    output_dir: '.windsurf/rules'
  },
  'trae': {
    alwaysApply: true,
    output_dir: '.trae/rules'
  },
  'default': {
    inclusion: 'always',
    output_dir: 'docs'
  }
};

function getEditorConfig(editor = 'default') {
  return EDITOR_CONFIGS[editor] || EDITOR_CONFIGS.default;
}

// Fetch content from URL
function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    
    client.get(url, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(data);
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${res.statusMessage}`));
        }
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

// Extract markdown links from llms.txt content
function extractMarkdownLinks(content) {
  const lines = content.split('\n');
  const links = [];
  
  for (const line of lines) {
    // Match lines containing /style-guide/ or /testing-guide/
    const match = line.match(/\[([^\]]+)\]\(([^)]*\/(?:style-guide|testing-guide)\/[^)]+)\)/);
    if (match) {
      links.push({
        title: match[1],
        path: match[2]
      });
    }
  }
  
  return links;
}

// Convert path to local file structure
function pathToLocalFile(urlPath) {
  // Remove leading /vue/docs/ and convert to local path
  const cleanPath = urlPath.replace(/^\/vue\/docs\//, '');
  return cleanPath;
}

// Create directory structure if it doesn't exist
function ensureDirectoryExists(filePath) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// Add frontmatter to markdown content
function addFrontmatter(content, title, editor = 'default') {
  const config = getEditorConfig(editor);
  
  let frontmatter = `---\n`;
  
  // Add configuration properties, excluding output_dir
  for (const [key, value] of Object.entries(config)) {
    if (key !== 'output_dir') {
      frontmatter += `${key}: ${value}\n`;
    }
  }
  
  frontmatter += `---\n`;
  
  // Remove any existing frontmatter
  let cleanContent = content.replace(/^---[\s\S]*?---\n/, '');
  
  // Convert absolute links to relative paths
  cleanContent = cleanContent.replace(/\[([^\]]+)\]\(\/vue\/docs\/([^)]+)\)/g, (match, text, path) => {
    // Convert /vue/docs/style-guide/api-services/creating-api-services.md to ./api-services/creating-api-services.md
    const relativePath = path.replace(/^style-guide\//, './');
    return `[${text}](${relativePath})`;
  });
  
  // Convert full URLs to relative paths
  cleanContent = cleanContent.replace(/\[([^\]]+)\]\(https:\/\/fewangsit\.gitbook\.io\/vue\/docs\/([^)]+)\)/g, (match, text, path) => {
    // Convert https://fewangsit.gitbook.io/vue/docs/style-guide/code-consistency-guidelines/general-principles to ./code-consistency-guidelines/general-principles.md
    let relativePath = path;
    if (!relativePath.endsWith('.md')) {
      relativePath += '.md';
    }
    relativePath = relativePath.replace(/^style-guide\//, './');
    return `[${text}](${relativePath})`;
  });
  
  return frontmatter + cleanContent;
}

// Main function
async function fetchDocumentation(editor = 'default') {
  try {
    const config = getEditorConfig(editor);
    const outputDir = path.join(__dirname, config.output_dir);
    
    console.log('Fetching documentation index...');
    
    // Fetch the llms.txt file
    const indexContent = await fetchUrl(INDEX_URL);
    
    // Extract relevant links
    const links = extractMarkdownLinks(indexContent);
    console.log(`Found ${links.length} documentation pages to fetch`);
    console.log(`Output directory: ${config.output_dir}`);
    
    // Process each link
    for (const link of links) {
      try {
        console.log(`Fetching: ${link.title} from ${link.path}`);
        
        // Build full URL
        const fullUrl = `${BASE_URL}${link.path}`;
        
        // Fetch content
        const content = await fetchUrl(fullUrl);
        
        // Convert to local file path
        const localPath = pathToLocalFile(link.path);
        const fullPath = path.join(outputDir, localPath);
        
        // Ensure directory exists
        ensureDirectoryExists(fullPath);
        
        // Add frontmatter and save
        const contentWithFrontmatter = addFrontmatter(content, link.title, editor);
        fs.writeFileSync(fullPath, contentWithFrontmatter, 'utf8');
        
        console.log(`✓ Saved: ${config.output_dir}/${localPath}`);
        
      } catch (error) {
        console.error(`✗ Failed to fetch ${link.title}: ${error.message}`);
      }
    }
    
    console.log('\nDocumentation fetch completed!');
    
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

// CLI interface
function main() {
  const args = process.argv.slice(2);
  const editor = args.find(arg => arg.startsWith('--editor='))?.split('=')[1] || 'default';
  
  if (args.includes('--help') || args.includes('-h')) {
    console.log(`
Usage: node fetch-docs.mjs [options]

Options:
  --editor=<editor>    Set agentic editor for metadata configuration
  --help, -h          Show this help message

Available editors:
  kiro       - Kiro editor (inclusion: always, output: .kiro/steering/)
  windsurf   - Windsurf editor (trigger: always-on, output: .windsurf/rules/)
  trae       - Trae editor (alwaysApply: true, output: .trae/rules/)
  default    - Generic configuration (inclusion: always, output: docs/)

Examples:
  node fetch-docs.mjs
  node fetch-docs.mjs --editor=kiro
  node fetch-docs.mjs --editor=windsurf
  node fetch-docs.mjs --editor=trae
`);
    process.exit(0);
  }
  
  console.log(`Using agentic editor: ${editor}`);
  fetchDocumentation(editor);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { fetchDocumentation, extractMarkdownLinks, addFrontmatter };
