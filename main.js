#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const program = require("commander");

program
  .version("1.0.0")
  .option("-c, --component <name>", "Generate a component")
  .parse(process.argv);

if (program.component) {
  const componentContent = generateComponentContent(program.component);
  const componentFileName = `${componentName}`;

  const reactGeneratorDirectory = path.join(process.cwd(), "react-generator");
  if (!fs.existsSync(reactGeneratorDirectory)) {
    fs.mkdirSync(reactGeneratorDirectory);
  }

  const componentPath = path.join(reactGeneratorDirectory, componentFileName);

  fs.writeFileSync(componentPath, componentContent);

  console.log(`Generated component '${componentName}' in '${componentPath}'`);
}

function generateComponentContent(name) {
  return `
  import React from 'react';
  
  const ${name} = () => {
    return (
      <div>
        <h2>${name} Component</h2>
        {/* Add your component code here */}
      </div>
    );
  };
  
  export default ${name};
  `;
}
