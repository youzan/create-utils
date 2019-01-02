import { jsWithTs as tsjPreset } from 'ts-jest/presets';
const jest = require('jest');


import base from '../config/base';
import jestConfig from '../config/jest.config';


export default function() {
  let argv = process.argv.slice(2);
  
  argv.push(
    '--config',
    JSON.stringify({ ...jestConfig, rootDir: base.distCwd, 
      ...tsjPreset
    })
  );
  console.log(argv);
  jest.run(argv);
}