import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import nodeResolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";
import fs from "fs";
import CloudFormation from "yaml-cfn";

const defaultConfig = {
  output: {
    format: "commonjs",
  },

  external: ["aws-sdk"],
};
const { Resources } = CloudFormation.yamlParse(fs.readFileSync("template.yaml"));
const functions = Object.values(Resources)
  .filter((resource) => resource.Type == "AWS::Serverless::Function")
  .filter((resource) => resource.Properties.Runtime.startsWith("nodejs"))
  .map((resource) => {
    const file = resource.Properties.Handler.split(".")[0];
    const prefix = resource.Properties.CodeUri.substr(8);
    return Object.assign({}, defaultConfig, {
      plugins: [
        typescript({
          compilerOptions: {
            outDir: `.rollup/${prefix}`,
            module: null,
            sourceMap: false,
          },
          exclude: [
            "node_modules",
            // Exclude test files
            /\.test.((js|jsx|ts|tsx))$/,
          ],
        }),
        commonjs(),
        nodeResolve(),
        json(),
        terser(),
      ],
      input: `src/${prefix}/${file}.ts`,
      output: {
        format: "cjs",
        dir: `.rollup/${prefix}`,
      },
    });
  });
export default functions;
