import {
  blueprintPluginEventsParams as blueprint,
  blueprintPluginEventsTypes,
  blueprintTypes,
  FileMap,
  IFile,
} from "@amplication/code-gen-types";
import { CodeBlock } from "@amplication/csharp-ast";
import { snakeCase } from "lodash";
import { resolve } from "path";
import { REPLACEMENTS } from "./constants";
import { replacePlaceholders } from "./utils";

class BlueprintPluginblueprint-plugin-name-placeholder
  implements blueprintTypes.AmplicationPlugin
{
  register(): blueprintPluginEventsTypes.BlueprintEvents {
    return {
      createBlueprint: {
        after: this.afterLoadStaticFiles,
      },
    };
  }
  async afterLoadStaticFiles(
    context: blueprintTypes.DsgContext,
    eventParams: blueprint.CreateBlueprintParams,
    files: FileMap<CodeBlock>
  ): Promise<FileMap<CodeBlock>> {
    context.logger.info("Generating Static Files ...");

    // determine the name of the service which will be used as the name for the workflow
    // workflow names must be lower case letters and numbers. words may be separated with dashes (-):
    const pluginName = snakeCase(context.resourceInfo?.name);

    REPLACEMENTS.PLACEHOLDER_1 = pluginName;

    //@ts-ignore
    const params = eventParams as blueprint.CreateBlueprintParams;

    // set the path to the static files and fetch them for manipulation
    const staticPath = resolve(__dirname, "./static");
    const staticFiles = await context.utils.importStaticFiles(staticPath, "./");

    for (const item of staticFiles.getAll()) {
      item.code = replacePlaceholders(item.code, REPLACEMENTS);

      item.path = replacePlaceholders(item.path, REPLACEMENTS);

      const file: IFile<CodeBlock> = {
        path: item.path,
        code: new CodeBlock({
          code: item.code,
        }),
      };
      files.set(file);
    }
    return files;
  }
}

export default BlueprintPluginTemplatePlugin;
